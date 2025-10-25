import { Box, Button, Checkbox, Chip, FormControlLabel, FormGroup, Grid, Stack, TextField, Typography,Link } from "@mui/material";
import "./ToSignUp.css";
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { registerUser } from "../../services/authentication";

function ToSignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPolicy, setCheckPolicy] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const user = await registerUser({
        username: userName,
        email: email,
        password: password,
      });
      Swal.fire({
        customClass: {
          popup: 'custom-swal'
        },
        position: "center",
        icon: "success",
        title: "You have successfully signed up!",
        showConfirmButton: false,
        timer: 1800,
      });
      navigate("/");
      return user;
    } catch (error) {
      Swal.fire({
        customClass: {
          popup: 'custom-swal'
        },
        position: "center",
        icon: "error",
        text: "Sign up failed! Please check your information.",
      });
      console.error("Registration error:", error);
    }
  }
  const handlePolicyChange = (e) => {
    if(e.target.checked){
      setCheckPolicy(true);
    } else {
      setCheckPolicy(false);
      console.log("error")
    }
  }
  return (
    <Grid container spacing={2} alignItems="center" justifyContent={{ xs: 'center', md: 'center' }}>
      <Grid item xs={12} md={6} margin='0 auto'>
        <Box component="section">
          <Typography 
            component="h4" 
            variant="h4" 
            gutterBottom
            sx={{
              fontFamily: "Poppins",
              fontWeight: 800,
              fontSize: "30px",
              letterSpacing: "0.01em",
              gap: "10px",
              margin: '35px 0',
            }}
          >
            Get Started Now
          </Typography>
          
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                required 
                fullWidth
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                label="UserName" 
                type="text"
                sx={{width: "404px", height: "58px",}} 
                variant="outlined"
                color="success"
              />
            </Grid>
            <Grid item>
              <TextField
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                label="Email" 
                sx={{width: "404px", height: "58px"}} 
                variant="outlined" 
                color="success"
              />
            </Grid>
            <Grid item>
              <TextField
                required
                fullWidth 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password" 
                type="password"
                sx={{width: "404px", height: "58px"}}
                variant="outlined"
                color="success"
              />
            </Grid>
            
            <Grid item>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={checkPolicy} onChange={handlePolicyChange} />}
                  label="I agree to the terms & policy"
                />
              </FormGroup>
            </Grid>
            
            <Grid item>
              <Button
                onClick={handleRegister}
                variant="contained"
                disabled={!checkPolicy}
                sx={{
                  width: "404px",
                  height: "48px",
                  padding: "10px",
                  borderRadius: "10px",
                  color: "#FFFFFF",
                  backgroundColor: checkPolicy ? "#3A5B22" : "#cccccc",
                  border: `1px solid ${checkPolicy ? "#3A5B22" : "#cccccc"}`,
                  '&:hover': {
                    backgroundColor: checkPolicy ? "#2d4619" : "#cccccc"
                  },
                  '&:disabled': {
                    color: "#666666",
                    backgroundColor: "#cccccc"
                  }
                }}
              >
                Sign up
              </Button>
            </Grid>
            
            <Grid item>
              <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                Or
              </Typography>
            </Grid>
            
            <Grid item>
              <Stack 
                direction="row" 
                spacing={2} 
                sx={{
                  width: "100%", 
                  mt: 2, 
                  justifyContent: "center"
                }}
              >
                <Chip 
                  className="connections" 
                  icon={<GoogleIcon color="primary" />} 
                  label="Sign in with Google" 
                />
                <Chip 
                  className="connections" 
                  icon={<AppleIcon sx={{ color: "#000000" }} />} 
                  label="Sign in with Apple" 
                />
              </Stack>
            </Grid>
          </Grid>
          <Typography sx={{ mt: 3, textAlign: "center",}}>
            Have an account?  <Link to="/" style={{ textDecoration: 'none' }}>Sign In</Link>
          </Typography>
        </Box>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          sx={{
            width: "781.5px",
            height: "auto",
            borderTopLeftRadius: "45px",
            borderBottomLeftRadius: "45px",
            maxWidth: { xs: '100%', md: 'auto' }
          }}
          alt="Login Illustration"
          src="img/1.jpg"
        />
      </Grid>
    </Grid>
  );
}

export default ToSignUp;