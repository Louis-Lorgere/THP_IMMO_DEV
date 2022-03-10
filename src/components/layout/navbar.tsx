import * as React from 'react';
import Link from "next/link"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'
import { signOut, useSession } from "next-auth/react";


const navLinks = [
  { title: `Accueil`, path: `/` },
  { title: `Contact`, path: `/contact` }
]

const NavBar: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const {data: session, status} = useSession();

  let right = null;

  if (status === 'loading') {
    right = (<p>Validating session ...</p>)
  }

  if (!session) {
    right = (
      router.asPath === "/auth/email-signin"       ?
          <Link href="/auth/email-signin"><Button variant='contained' sx={{margin: 2}}>Se connecter</Button></Link>
        : <Link href="/auth/email-signin"><Button variant='text' sx={{margin: 2}}>Se connecter</Button></Link>
    )
  }

  if (session) {
    // console.log(session)
    right = (
      <div>
        <button onClick={() => signOut({callbackUrl:"/"})}>
          <a>Log out</a>
      </button>
      <Link href={"/profile/" + session.user.id}><Button variant='contained' sx={{margin: 2}}>Profile</Button></Link>
      </div>
      
    )
  }

  return (
    <Box sx={{ width: '100%', marginTop: '4px', padding: 2, backgroundColor: 'background.primary', display: 'flex', justifyContent: 'center' }} className="AppBar">
      {navLinks.map((link,i)=> 
        router.asPath === link.path        ?
          <Link key={i} href={link.path}><Button variant='contained' sx={{margin: 2}}>{link.title}</Button></Link>
        : <Link key={i} href={link.path}><Button variant='text' sx={{margin: 2}}>{link.title}</Button></Link>
        
      )}
      {right}
    </Box>
  );
}

export default NavBar