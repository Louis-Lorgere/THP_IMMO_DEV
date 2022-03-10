import {
  Typography,
  Container,
  Grid,
  Box,
  Divider,
  Button,
} from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { flexbox } from "@mui/system";

export default function Header(): JSX.Element {
  const router = useRouter();
  const {data: session, status} = useSession();

  const navLinks = [
    { title: `THP immo`, path: `/` },
    { title: `Contact`, path: `/contact` }
  ]

  let right = null;

  if (status === 'loading') {
    right = (<p>Validating session ...</p>)
  }

  if (!session) {
    right = (
      <Link href="/auth/email-signin"  passHref>
        <Button
          sx={{ mr: 2 }}
          color={router.pathname === "/auth/email-signin" ? "primary" : "secondary"}
        >
          Sign up
        </Button>
      </Link>
      )
  }

  if (session) {
    right = (
        <Box sx={{display: 'flex', flexDirection:'column', alignContent: 'center'}}>
          <b>{session.user.name ? session.user.name : session.user.email }</b>
          <Link href={"/profile/" + session.user.id}  passHref>
            <Button
              sx={{ mr: 2 }}
              color={router.pathname === "/profile/" + session.user.id ? "primary" : "secondary"}
            >
              Profile
            </Button>
          </Link>
          <Button
            sx={{ mr: 2 }}
            color={router.pathname === "/auth/email-signin" ? "primary" : "secondary"}
            onClick={() => signOut({callbackUrl:"/"})}
          >
            Log out
          </Button>
        </Box>
      )
  }
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Container maxWidth="md" sx={{ py: 1 }}>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <Typography variant="body1" align="center" sx={{ fontWeight: 600 }}>
              THP immo
            </Typography>
          </Grid>
          <Grid container item xs={10} justifyContent="flex-end">
            {navLinks.map((link,i) => 
              <Link key={i} href={link.path} passHref>
                <Button
                  sx={{ mr: 2 }}
                  color={router.pathname === link.path ? "primary" : "secondary"}
                >
                  {link.title}
                </Button>
              </Link>
              )}
            {right}
          </Grid>
        </Grid>
      </Container>
      <Divider />
    </Box>
  );
}
