import { Box, Button, Divider, Paper, Radio, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Moment from "moment";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";

const RegisterForm: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const [gender, setGender] = useState("female");
  const [selectedDate, setSelectedDate] = useState<Moment.Moment | null>(null);

  const handleDateChange = (date: Moment.Moment | null) => {
    setSelectedDate(date);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(
    //   email,
    //   password,
    //   firstNameRef.current?.value,
    //   lastNameRef.current?.value,
    //   gender,
    //   selectedDate?.format("YYYY-MM-DD")
    // );

      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          //Signed up
          const user = userCredential.user;
          await updateProfile(user, {
            displayName: `${firstNameRef.current?.value} ${lastNameRef.current?.value}`,
          });

          await updateDoc(doc(db, "users", user.uid), {
            firstName: firstNameRef.current?.value,
            lastName: lastNameRef.current?.value,
            gender: gender,
            dateOfBirth: selectedDate?.format("DD-MM-YYYY"),
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <Paper
      elevation={5}
      sx={{
        width: "400px",
        p: 3,
        marginTop: { xs: 5, md: 0 },
        borderRadius: 3,
      }}
    >
      <Box
        component='form'
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        onSubmit={handleSubmit}
        noValidate
        autoComplete='off'
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label='First name'
            type='text'
            variant='outlined'
            fullWidth
            required
            inputRef={firstNameRef}
          />
          <TextField
            label='Last name'
            type='text'
            variant='outlined'
            fullWidth
            required
            inputRef={lastNameRef}
          />
        </Box>
        <TextField
          label='Email'
          type='email'
          variant='outlined'
          fullWidth
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label='Password'
          type='password'
          variant='outlined'
          fullWidth
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <DatePicker
          label='Date of birth'
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} required />}
        />
        <FormControl component='fieldset' required>
          <FormLabel id='gender-group-label'>Gender</FormLabel>
          <RadioGroup
            name='gender-radio-group'
            sx={{ flexDirection: "row" }}
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          >
            <FormControlLabel
              value='female'
              control={<Radio />}
              label='Female'
            />
            <FormControlLabel value='male' control={<Radio />} label='Male' />
            <FormControlLabel
              value='custom'
              control={<Radio />}
              label='Custom'
            />
          </RadioGroup>
        </FormControl>
        <Button variant='contained' type='submit' fullWidth size='large'>
          Sign Up
        </Button>
        <Divider />
        <Button
          variant='contained'
          color='secondary'
          fullWidth
          size='large'
          onClick={handleBack}
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  );
};

export default RegisterForm;
