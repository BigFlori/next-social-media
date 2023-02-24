import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { UserContext } from "@/store/user-context";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const userCtx = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        userCtx.setUser(user);
        console.log(user);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <Paper
      elevation={5}
      sx={{
        marginTop: { xs: 5, md: 0 },
        width: "400px",
        p: 3,
        borderRadius: 3,
      }}
    >
      <Box
        component='form'
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <TextField
          label='Email'
          type='email'
          variant='outlined'
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label='Password'
          type='password'
          variant='outlined'
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label='Keep me logged in'
        />
        <Button variant='contained' type='submit' fullWidth size='large'>
          Sign In
        </Button>
        <Typography variant='subtitle2' align='center'>
          Forgot your password?
        </Typography>
        <Divider />
        <Button
          variant='contained'
          color='secondary'
          fullWidth
          size='large'
          onClick={handleRegister}
        >
          Create an account
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginForm;
