import { Button, Card, Stack, Typography, FormHelperText, CardContent, IconButton, InputAdornment, TextField, Box, styled } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link as RouterLink, useNavigate, } from 'react-router-dom';
import { Form, Container, Col, Row, InputGroup } from 'react-bootstrap';
import { ChangeEvent, useEffect, useState } from 'react';
import APIservice from './../../../utils/APIservice';
import validator from 'validator';
import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../dashboards/Crypto/dashboard.css';
import Logo from 'src/components/LogoSign';
import { Helmet } from 'react-helmet-async';
import LoaderLogin from './LoaderLogin';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

const initialState = {
  email: "",
  password: "",
}

function Login() {

  const [login, setLogin] = React.useState<any>(initialState)
  const [isEmailValidateError, setIsEmailValidateError] = useState(false);
  const [emailValidateErrorMsg, setEmailValidateErrorMsg] = useState("");
  const [isPasswordValidateError, setIsPasswordValidateError] = useState(false);
  const [passwordValidateErrorMsg, setPasswordValidateErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  // window.onpopstate = () => {
  //   navigate(1);
  // }

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log("User Login")
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  };

  // const emailRegex = new RegExp(" /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/");
  const validateEmail = (e: any) => {
    const { name, value } = e.target;
    if (value) {
      if ((validator.isEmail(e.target.value))) {
        setIsEmailValidateError(false);
        setEmailValidateErrorMsg("");
      } else {
        setIsEmailValidateError(true);
        setEmailValidateErrorMsg("Invalid Email");
      }
    } else {
      setIsEmailValidateError(true);
      setEmailValidateErrorMsg("Email is Required");
    }
  }

  const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
  const ValidatePassword = (e: any) => {
    const { name, value } = e.target;
    if (value) {
      if ((mediumRegex.test(e.target.value))) {
        setIsPasswordValidateError(false);
        setPasswordValidateErrorMsg("");
      } else {
        setIsPasswordValidateError(true);
        setPasswordValidateErrorMsg("Password is Required");;
      }
    } else {
      setIsPasswordValidateError(true);
      setPasswordValidateErrorMsg("Password is Required");
    }
  }

  const validateForm = (event: any) => {
    event.preventDefault();
    var flag = true;
    if (!login.email) {
      setIsEmailValidateError(true);
      setEmailValidateErrorMsg("Email is Required");
      flag = false;
    }
    else {
      if ((validator.isEmail(login.email))) {
        setIsEmailValidateError(false);
        setEmailValidateErrorMsg("");
        flag = true;
      } else {
        setIsEmailValidateError(true);
        setEmailValidateErrorMsg("Invalid Email");
        flag = false;
      }
    }
    if (!login.password) {
      setIsPasswordValidateError(true);
      setPasswordValidateErrorMsg("Password is Required");
      flag = false;
    }
    else {
      if ((mediumRegex.test(login.password))) {
        setIsPasswordValidateError(false);
        setPasswordValidateErrorMsg("");
        flag = true;
      } else {
        setIsPasswordValidateError(true);
        setPasswordValidateErrorMsg("Password is Required");
        flag = false;
      }
    }
    return flag;
  }

  useEffect(() => {
    if (localStorage.getItem("Crendientials")) {
    }
    //  getData();
  }, []);

  // const getData = async () => {
  //   setIsLoading(true);
  //   const token = localStorage.getItem('SessionToken');
  //   const refreshToken = localStorage.getItem('RefreshToken')
  //   let response = await APIservice.httpPost('/api/admin/systemflags/getAdminSystemFlag', {}, token, refreshToken);
  //   console.log(response.recordList[0].systemFlag[0].value)
  //   let data = response.recordList[0].systemFlag[0].value
  //   localStorage.setItem("DateFormat",data)
  //   setIsLoading(false);
  // }

  const handlesubmit = async (event: any) => {
    event.preventDefault();
    var flag = validateForm(event);
    if (flag) {
      try {
        const res = await APIservice.httpPost('/api/admin/users/login', login);
        if (res && res.status == 200) {

          localStorage.setItem("RefreshToken", res.recordList[0].refreshToken);
          localStorage.setItem("SessionToken", res.recordList[0].token);
          localStorage.setItem("UserId", res.recordList[0].id);
          let detail: any
          detail = localStorage.setItem("Crendientials", JSON.stringify(res.recordList[0]));
          console.log("success");
          navigate('/admin/dashboard');

          const token = localStorage.getItem('SessionToken');
          const refreshToken = localStorage.getItem('RefreshToken')
          let response = await APIservice.httpPost('/api/admin/systemflags/getAdminSystemFlag', {}, token, refreshToken);
          let data = response.recordList[0].systemFlag[0].value
          localStorage.setItem("DateFormat", data)
        }
        else if (res && res.status == 500) {
          toast.error('User does not exists!', {
            autoClose: 6000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          })
        }
        else if (res.message === 'Password Mismatch') {
          toast.error('Invalid Credentials!', {
            autoClose: 6000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          })
        }
        // else {
        //   { notify() }
        // }
      } catch (error: any) {
        console.error(error);
      }
    };
    history.go(1);
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <OverviewWrapper>
        <Helmet>
          <title>Matrimony</title>
        </Helmet>
        <Container >
          <Row className="d-flex justify-content-center align-items-center" style={{ position: 'fixed', left: 0, top: 0, width: '100%', height: '100%' }}>
            <Col md={8} lg={6} xs={12} style={{ maxWidth: '500px' }}>
              <div style={{ height: '72px' }}>
                <Logo />
              </div>
              <Card style={{ borderRadius: "10px" }}>
                <CardContent style={{ padding: "24px" }}>
                  <Form onSubmit={onFormSubmit}>
                    <Typography className="mb-3" align="center" fontSize="25px" fontWeight="bolder">Login</Typography>
                    <TextField
                      required
                      type="email"
                      sx={{ width: "100%", mt: 3 }}
                      name="email"
                      label="Email"
                      autoFocus
                      value={login.email}
                      onChange={(e: any) => { validateEmail(e); handleInputChange(e); }}
                    />
                    <FormHelperText style={{ color: 'red', height: '22px' }}>{isEmailValidateError && emailValidateErrorMsg}</FormHelperText>
                    <TextField
                      required
                      sx={{ width: "100%", mt: "1%" }}
                      name="password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                              {showPassword === true ?
                                <VisibilityIcon /> :
                                <VisibilityOffIcon />
                              }
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      value={login.password}
                      onChange={(e: any) => { ValidatePassword(e); handleInputChange(e) }}
                    />
                    <FormHelperText style={{ color: 'red', height: '22px' }}>{isPasswordValidateError && passwordValidateErrorMsg}</FormHelperText>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      onClick={handlesubmit}
                      style={{ fontWeight: "bolder", marginTop: "1%" }}
                    >
                      <div>{isLoading ? <LoaderLogin title="Loading..." /> : 'LOGIN'}</div>
                    </Button>
                    <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 1 }}>
                      <RouterLink to="/forgotpassword" style={{ color: "#5569ff", textDecoration: "none", justifyContent: "flex-end", fontSize: "15px" }}>Forgot password?</RouterLink>
                    </Stack>
                  </Form>
                </CardContent>
              </Card>
            </Col>
          </Row>
        </Container>
      </OverviewWrapper>
    </div>
  );
}

export default Login;