import AboutText from "@/components/AboutText";
import LoginForm from "@/components/Forms/LoginForm";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Login: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <Grid container columnSpacing={3} sx={{ mt: { xs: 2, md: 13 } }}>
        <Grid item xs={12} md={6} container justifyContent='center'>
          <AboutText />
        </Grid>
        <Grid item xs={12} md={6} container justifyContent='center'>
          <LoginForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
