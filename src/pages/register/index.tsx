import RegisterForm from "@/components/Forms/RegisterForm";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function Register() {
  return (
    <Container maxWidth='lg'>
      <Grid container columnSpacing={3} sx={{ mt: 5 }}>
        <Grid item xs={12} container justifyContent='center'>
          <RegisterForm />
        </Grid>
      </Grid>
    </Container>
  );
}
