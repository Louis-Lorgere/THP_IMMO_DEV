import { getSession } from "next-auth/react";
import { getCsrfToken } from "next-auth/react"
import { useRef, useState } from "react";
import models from "../../lib/models";
import axios from "axios";
import { deserialize, serialize } from "superjson";
import { Box, Button, FormGroup, TextField, Typography } from "@mui/material";

import type { User } from "@prisma/client";


export default function Profile({ session, rawUser, csrfToken }) {
  const user = deserialize<User>(rawUser);
  
  // const { data: session, status } = useSession({ required: true });
  const isUser = !!session?.user
  const formRef = useRef(null);
  const [disable, setDisable] = useState(false);


  const editProfile = async (e) => {
    e.preventDefault()
    setDisable(true)
    const {
      editName,
      editEmail,
      editImage,
    } = formRef.current;
    const name = editName.value;
    const email = editEmail.value;
    const image = editImage.value;

    await axios.put("/api/edit_user_profile", {
      id: user.id,
      name,
      email,
      image
    })
    
    setDisable(false);

  }
  if (!isUser) {
    return (
      <div>Loading...</div>
    )
  }

  return (
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <h1>Signed in as {session.user.email} </h1>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <form ref={formRef}>
          <FormGroup sx={{mt: 8, display:'flex', flexDirection: 'column'}}  >
            <TextField label="Email" type="editEmail" id="editEmail" name="editEmail" defaultValue={user?.email} sx={{mt:2}}/>
            <TextField label="Nom" type="editName" id="editName" name="editName" defaultValue={user?.name} sx={{mt:2}}/>
            <TextField label="Lien vers une image" type="editImage" id="editImage" name="editImage" defaultValue={user?.image} sx={{mt:2}}/>
            <Button sx={{mt: 2}} type="submit" onClick={(e) => editProfile(e)}>Enregistrer</Button>
          </FormGroup>
        </form>
      </Box>
  )
}

export async function getServerSideProps(context) {

  const { id } = context.params
  const session = await getSession(context)
  const csrfToken = await getCsrfToken(context)
  const rawUser = await models.user.findUnique({ where: { id: parseInt(id) } });

  if (!session || session && session.user.id !== parseInt(id) ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  if (session){
    return {
      props: {
        session: session,
        rawUser :serialize(rawUser),
        csrfToken
      },
    };
  }
}