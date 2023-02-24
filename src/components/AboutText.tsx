import { Box, Typography } from "@mui/material";

const AboutText: React.FC = () => {
  return (
    <Box>
      <Typography
        variant='h2'
        textTransform='uppercase'
        fontWeight='700'
        letterSpacing={3}
      >
        EYRO.
      </Typography>
      <Typography variant='subtitle1'>
        Eyro is social media platform for sharing your thoughts and ideas.
      </Typography>
      <Typography variant='subtitle1'>
        Get in touch with people who share your interests and passions.
      </Typography>
    </Box>
  );
};

export default AboutText;
