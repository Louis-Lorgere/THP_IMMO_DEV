import React from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { PostProps } from "../../components/Post";
import prisma from '../../lib/prisma'
import { useSession } from "next-auth/react";
import { Container, Avatar, Card, Box, Grid } from "@mui/material";
import { deepOrange } from "@mui/material/colors";


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function publishPost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/")
}

async function deletePost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/post/${id}`, {
    method: "DELETE",
  });
  await Router.push("/")
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (

    <Container sx={{}}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <img width={500} src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="house" />
        </Grid>
        <Card sx={{ ml: 20, p: 2, height: 150, m: 10 }}>
          <Box sx={{ display: 'flex' }} >
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{props?.author?.name[0] || "X"}</Avatar>
            <p>{props?.author?.name || "Unknown author"}</p>
          </Box>
          <p>Email : <a href="`mailto:${{props?.author?.email || 'Unknown email'}}`">{props?.author?.email || "Unknown email"}</a></p>
        </Card>
        <Grid item xs={12}>
          <h2>{title}</h2>
          <p>{props.content}</p>
          <p><b>Ville: </b>{props.city}</p>
        </Grid>
        {!props.published && userHasValidSession && postBelongsToUser && (
          <button onClick={() => publishPost(props.id)}>Publish</button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <button onClick={() => deletePost(props.id)}>Delete</button>
        )}
      </Grid>
    </Container>

  );
};

export default Post;
