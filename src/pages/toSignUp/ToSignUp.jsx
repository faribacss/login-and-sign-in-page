import "../../index.css";
import { Box, Button, Checkbox, Chip, FormControlLabel, FormGroup, Grid, Stack, TextField, Typography } from "@mui/material";
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../services/authentication";
import showSuccessAlert from "../utilities/showSuccessAlert";
import showErrorAlert from "../utilities/showErrorAlert";
import styles from "../../styles/ToSignUp.module.css";
import ShowPassword from "../../component/ShowPassword";
import SocialLoginButtons from "../../component/SocialLoginButtons";


function ToSignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checkPolicy, setCheckPolicy] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const user = await register({
        username: userName,
        email: email,
        password: password,
      });
      showSuccessAlert("signUp");
      navigate("/");
      return user;
    } catch (error) {
      showErrorAlert("signUp");
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
      <Grid item xs={12} md={6} className={styles.container}>
        <Box component="section">
          <Typography 
            component="h4" 
            variant="h4" 
            gutterBottom
            className={`auth-title ${styles.title}`}
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
                className="auth-text-field"
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
                className="auth-text-field"
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
                type={showPassword ? "text" : "password"}
                className="auth-text-field"
                variant="outlined"
                color="success"
              />
              <ShowPassword 
                showPassword={showPassword} 
                onToggle={() => setShowPassword(!showPassword)} 
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
                className={`auth-button-base ${checkPolicy ? 'auth-primary-button' : 'auth-disabled-button'}`}
              >
                Sign up
              </Button>
            </Grid>
            
            <Grid item>
              <Typography variant="body2" className="auth-or-text">
                Or
              </Typography>
            </Grid>
            
            <Grid item>
              <SocialLoginButtons/>
            </Grid>
          </Grid>
          <Typography className="auth-bottom-text">
            Have an account?  <Link to="/" className="auth-link">Sign In</Link>
          </Typography>
        </Box>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          className="auth-image-box"
          alt="Login Illustration"
          src="img/1.jpg"
        />
      </Grid>
    </Grid>
  );
}

export default ToSignUp;