import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Box, Breadcrumbs, Stack, Typography, Avatar, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormHelperText, IconButton, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, useTheme, styled, FormGroup, FormControlLabel, FormControl, TextField, FormLabel, RadioGroup, Radio, InputAdornment, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import validator from 'validator';
import Footer from 'src/components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import Loader1 from 'src/content/Loader';
import { Form, Row, Col } from 'react-bootstrap';
import APIservice from 'src/utils/APIservice';
import React, { ChangeEvent, useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../smallScreen.css'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, fontSize: "18px", fontWeight: "bold" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 13,
            top: 13,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const initialState = {
  id: 0,
  // image: '',
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
  contactNo: '',
  gender: '',
}

function UserList() {
  const [page, setPage] = React.useState<number>(0);
  const [limit, setLimit] = React.useState<number>(10);
  const [row, setRow] = useState<number>(10);
  const [isDel, setIsDel] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [user, setUser] = React.useState<any>([]);
  const [userValue, setUserValue] = React.useState<any>(initialState);
  const [image, setImage] = React.useState("");
  const [isloading, setIsLoading] = React.useState(false);
  const [ischeck, setIsCheck] = useState(false);
  const [isGenderError, setGenderError] = useState(false);
  const [GenderErrorMsg, setGenderErrorMsg] = useState("");
  const [isUserError, setUserError] = useState(false);
  const [UserErrorMsg, setUserErrorMsg] = useState("");
  const [isblock, setIsBlock] = useState(false)
  const [errorFlag, setErrorFlag] = useState(false)
  let [searchString, setSearchString] = useState("");
  const navigate = useNavigate();

  // window.onpopstate = () => {
  //   navigate(-1);
  // }

  const [isFirstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMsg, setFirstNameErrorMsg] = useState("");
  const validateFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value) {

      if (validator.isAlpha(value)) {
        setFirstNameError(false);
        setFirstNameErrorMsg("");
      } else {
        setFirstNameError(true);
        setFirstNameErrorMsg("Only alphabet");
      }
    } else {
      setFirstNameError(true);
      setFirstNameErrorMsg("Firstname is required");
    }
  }

  const [isMiddleNameError, setMiddleNameError] = useState(false);
  const [middleNameErrorMsg, setMiddleNameErrorMsg] = useState("");
  const validateMiddleName = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value) {
      if (validator.isAlpha(value)) {
        setMiddleNameError(false);
        setMiddleNameErrorMsg("");
      } else {
        setMiddleNameError(true);
        setMiddleNameErrorMsg("Only alphabet");
      }
    } else {
      setMiddleNameError(true);
      setMiddleNameErrorMsg("Middlename is required");
    }
  }

  const [isLastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMsg, setLastNameErrorMsg] = useState("");
  const validateLastName = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value) {
      if (validator.isAlpha(value)) {
        setLastNameError(false);
        setLastNameErrorMsg("");
      } else {
        setLastNameError(true);
        setLastNameErrorMsg(" Only alphabet");
      }
    } else {
      setLastNameError(true);
      setLastNameErrorMsg("Lastname is required");
    }
  }

  const [isEmailValidateError, setIsEmailValidateError] = useState(false);
  const [emailValidateErrorMsg, setEmailValidateErrorMsg] = useState("");
  const validateEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value) {
      if (validator.isEmail(value)) {
        setIsEmailValidateError(false);
        setEmailValidateErrorMsg("");
      } else {
        setIsEmailValidateError(true);
        setEmailValidateErrorMsg("Invalid email");
      }
    } else {
      setIsEmailValidateError(true);
      setEmailValidateErrorMsg("Email is required");
    }
  }

  const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
  const [isPasswordValidateError, setIsPasswordValidateError] = useState(false);
  const [passwordValidateErrorMsg, setPasswordValidateErrorMsg] = useState("");
  const ValidatePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value) {
      if (!(mediumRegex.test(event.target.value))) {
        setIsPasswordValidateError(true);
        setPasswordValidateErrorMsg("Password is required");
      } else {
        setIsPasswordValidateError(false);
        setPasswordValidateErrorMsg("");
      }
    } else {
      setIsPasswordValidateError(true);
      setPasswordValidateErrorMsg("Password is required");
    }
  }

  const [isEmailError, setIsEmailError] = useState(false);
  const [confirmEmailValidateErrorMsg, setConfirmEmailValidateErrorMsg] = useState("");
  const confirmEmailValidation = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value) {
      if (!(userValue.email === value)) {
        setIsEmailError(true);
        setConfirmEmailValidateErrorMsg("Email and confirm email must matched");
      } else {
        setIsEmailError(false);
        setConfirmEmailValidateErrorMsg("");
      }
    } else {
      setIsEmailError(true);
      setConfirmEmailValidateErrorMsg("Confirm email is required");
    }
  }

  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const confirmPasswordValidation = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value) {
      if (!(userValue.password === value)) {
        setIsConfirmPasswordError(true);
        setConfirmPasswordError("Password and confirm password must matched")
      } else {
        setIsConfirmPasswordError(false);
        setConfirmPasswordError("");
      }
    } else {
      setIsConfirmPasswordError(true);
      setConfirmPasswordError("Confirm password is required");
    }
  }

  const phoneRegex = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$");
  const [isPhoneValidateError, setIsPhoneValidateError] = useState(false);
  const [phoneValidateErrorMsg, setPhoneValidateErrorMsg] = useState("");
  const ValidatePhone = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value) {
      if (!(phoneRegex.test(event.target.value))) {
        setIsPhoneValidateError(true);
        setPhoneValidateErrorMsg("Contact No must be 10 digit");
      } else {
        setIsPhoneValidateError(false);
        setPhoneValidateErrorMsg("");
      }
    } else {
      setIsPhoneValidateError(true);
      setPhoneValidateErrorMsg("Contact No is required");
    }
  }

  const validateGender = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value) {
      setGenderError(false);
      setGenderErrorMsg("");
    } else {
      setGenderError(true);
      setGenderErrorMsg("Gender is required");
    }
  }

  const validateForm = (e: any) => {
    e.preventDefault();
    var flag = true;
    if (!userValue.firstName) {
      setFirstNameError(true);
      setFirstNameErrorMsg("Firstname is required");
      flag = false;
    } else {
      if (validator.isAlpha(userValue.firstName)) {
        setFirstNameError(false);
        setFirstNameErrorMsg("");
      } else {
        setFirstNameError(true);
        setFirstNameErrorMsg("Only alphabet");
        flag = false;
      }
    }
    if (!userValue.middleName) {
      setMiddleNameError(true);
      setMiddleNameErrorMsg("Middlename is required");
      flag = false;
    } else {
      if (validator.isAlpha(userValue.middleName)) {
        setMiddleNameError(false);
        setMiddleNameErrorMsg("");
      } else {
        setMiddleNameError(true);
        setMiddleNameErrorMsg("Only alphabet");
        flag = false;
      }
    }
    if (!userValue.lastName) {
      setLastNameError(true);
      setLastNameErrorMsg("Lastname is required");
      flag = false;
    } else {
      if (validator.isAlpha(userValue.lastName)) {
        setLastNameError(false);
        setLastNameErrorMsg("");
      } else {
        setLastNameError(true);
        setLastNameErrorMsg(" Only alphabet");
        flag = false;
      }
    }
    if (!userValue.email) {
      setIsEmailValidateError(true);
      setEmailValidateErrorMsg("Email is required");
      flag = false;
    } else {
      if (validator.isEmail(userValue.email)) {
        setIsEmailValidateError(false);
        setEmailValidateErrorMsg("");
      } else {
        setIsEmailValidateError(true);
        setEmailValidateErrorMsg("Invalid email");
        flag = false;
      }
    }
    if (!userValue.id) {
      if (!userValue.confirmEmail) {
        setIsEmailError(true);
        setConfirmEmailValidateErrorMsg("Confirm Email is required");
        flag = false;
      } else {
        if (!(userValue.email === userValue.confirmEmail)) {
          setIsEmailError(true);
          setConfirmEmailValidateErrorMsg("Email and confirm email must matched");
          flag = false;
        } else {
          setIsEmailError(false);
          setConfirmEmailValidateErrorMsg("");
        }
      }
      if (!userValue.password) {
        setIsPasswordValidateError(true);
        setPasswordValidateErrorMsg("Password is required");
        flag = false;
      } else {
        if (!(mediumRegex.test(userValue.password))) {
          setIsPasswordValidateError(true);
          setPasswordValidateErrorMsg("Password is required");
          flag = false;
        } else {
          setIsPasswordValidateError(false);
          setPasswordValidateErrorMsg("");
        }
      }
      if (!userValue.confirmPassword) {
        setIsConfirmPasswordError(true);
        setConfirmPasswordError("Confirm password is required");
        flag = false;
      } else {
        if (!(userValue.password === userValue.confirmPassword)) {
          setIsConfirmPasswordError(true);
          setConfirmPasswordError("Password and confirm password must matched")
          flag = false;
        } else {
          setIsConfirmPasswordError(false);
          setConfirmPasswordError("");
        }
      }
    }
    if (!userValue.contactNo) {
      setIsPhoneValidateError(true);
      setPhoneValidateErrorMsg("Contact No is required");
      flag = false;
    } else {
      if (!(phoneRegex.test(userValue.contactNo))) {
        setIsPhoneValidateError(true);
        setPhoneValidateErrorMsg("Contact No must be 10 digit");
        flag = false;
      } else {
        setIsPhoneValidateError(false);
        setPhoneValidateErrorMsg("");
      }
    }
    if (!userValue.gender) {
      setGenderError(true);
      setGenderErrorMsg("Gender is required ");
      flag = false;
    } else {
      setGenderError(false);
      setGenderErrorMsg("");
    }
    return flag;
  }

  //delete
  // const handleClickisDel = (id:number) => {
  //   let obj = {
  //     "id": id,
  //   }
  //   setUserValue(obj);
  //   setIsDel(true);
  // };

  // const handleClose = () => {
  //   setIsDel(false);
  // };

  // const handleDeleteUser = async () => {
  //   const token = localStorage.getItem('SessionToken');
  //   const refreshToken = localStorage.getItem('RefreshToken')
  //   let obj = {
  //     "id": userValue.id,
  //   }
  //   const res = await APIservice.httpPost('/api/admin/users/deleteUser', obj, token, refreshToken);
  //   console.log(res);
  //   setIsDel(false);
  //   getdata(0, limit);
  // }

  const handleClickisAdd = () => {
    setUserValue(initialState);
    setIsOpen(true);
    setGenderError(false);
    setGenderErrorMsg("");
    setIsPhoneValidateError(false);
    setPhoneValidateErrorMsg("");
    setIsConfirmPasswordError(false);
    setConfirmPasswordError("");
    setIsEmailError(false);
    setConfirmEmailValidateErrorMsg("");
    setIsPasswordValidateError(false);
    setPasswordValidateErrorMsg("");
    setIsEmailValidateError(false);
    setEmailValidateErrorMsg("");
    setLastNameError(false);
    setLastNameErrorMsg("");
    setMiddleNameError(false);
    setMiddleNameErrorMsg("");
    setFirstNameError(false);
    setFirstNameErrorMsg("");
    setUserError(false);
    setUserErrorMsg("")
    setImage("")
  }

  const handleClickisEdit = (no: number, img: string, st: string, st1: string, st2: string, em: string, em1: string, con: string, gen: string) => {
    let obj = {
      id: no,
      image: img,
      firstName: st,
      middleName: st1,
      lastName: st2,
      email: em,
      confirmEmail: em1,
      contactNo: con,
      gender: gen
    }
    if (img)
      setImage(process.env.REACT_APP_IMAGE_URL + img);
    else
      setImage("")
    setUserValue(obj);
    setIsOpen(true);
    setGenderError(false);
    setGenderErrorMsg("");
    setIsPhoneValidateError(false);
    setPhoneValidateErrorMsg("");
    setIsConfirmPasswordError(false);
    setConfirmPasswordError("");
    setIsEmailError(false);
    setConfirmEmailValidateErrorMsg("");
    setIsPasswordValidateError(false);
    setPasswordValidateErrorMsg("");
    setIsEmailValidateError(false);
    setEmailValidateErrorMsg("");
    setLastNameError(false);
    setLastNameErrorMsg("");
    setMiddleNameError(false);
    setMiddleNameErrorMsg("");
    setFirstNameError(false);
    setFirstNameErrorMsg("");
    setUserError(false);
    setUserErrorMsg("")
  };

  const editCommunityDialog = (e: any) => {
    setUserValue(e);
    setIsOpen(true)
  }

  const handleCloseUsersDialog = () => {
    setIsOpen(false);
  };

  const handleCloseSwitch = () => {
    setIsCheck(false);
  }

  const handleSwitch = async (id: number) => {
    let obj = {
      "id": id,
    }
    setUserValue(obj);
    setIsCheck(true);
  };

  const handleCheckSwitch = async () => {
    const token = localStorage.getItem('SessionToken');
    const refreshToken = localStorage.getItem('RefreshToken')
    let obj = {
      "id": userValue.id,
    }
    const res = await APIservice.httpPost('/api/admin/users/activeInactiveUsers', obj, token, refreshToken);
    setIsCheck(false);
    getdata(0, limit);
  };

  const handlechange = (e: any) => {
    const { name, value } = e.target;
    setUserValue({
      ...userValue,
      [name]: value,
    });
    setIsOpen(true)
    if (errorFlag === true) {
      setUserError(false)
      setUserErrorMsg('')
    }
  }

  React.useEffect(() => {
    getdata(page, limit);
    setIsOpen(false);
  }, [])

  const getdata = async (startIndex: number, fetchRecord: number) => {
    try {
      if (searchString) {
        const token = localStorage.getItem('SessionToken');
        const refreshToken = localStorage.getItem('RefreshToken');
        let obj = {
          "startIndex": startIndex,
          "fetchRecord": fetchRecord,
          "searchString": searchString ? searchString : "",
        }
        const res = await APIservice.httpPost('/api/admin/users/getAllUsers', obj, token, refreshToken);
        setUser(res.recordList);
        setRow(res.totalRecords);
      } else {
        setIsLoading(true);
        const token = localStorage.getItem('SessionToken');
        const refreshToken = localStorage.getItem('RefreshToken');
        let obj = {
          "startIndex": startIndex,
          "fetchRecord": fetchRecord,
        }
        const res = await APIservice.httpPost('/api/admin/users/getAllUsers', obj, token, refreshToken);
        setUser(res.recordList);
        setRow(res.totalRecords);
        if (res && res.status == 200) {
          console.log("success");
          setIsOpen(false);
        }
        else if (res.status == 401) {
          navigate("/");
          localStorage.clear();
        }
        else if (res.status == 500) {
          setIsOpen(false);
          toast.error(res.message, {
            autoClose: 6000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (res.status == 400) {
          setIsOpen(false);
          toast.error(res.message, {
            autoClose: 6000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (res.status == 300) {
          setIsOpen(false);
          toast.error(res.message, {
            autoClose: 6000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (res.status == 404) {
          setIsOpen(false);
          toast.error(res.message, {
            autoClose: 6000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        setIsLoading(false);
      }
    } catch (error) {
      setIsOpen(false);
      toast.error(error, {
        autoClose: 6000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false)
    }
  }

  const saveUsers = async (e: any) => {
    var flag = validateForm(e);
    if (flag) {
      try {
        if (userValue.id) {
          //Update
          const token = localStorage.getItem('SessionToken');
          const refreshToken = localStorage.getItem('RefreshToken');
          let val = {
            "id": userValue.id,
            "image": image ? image : null,
            "firstName": userValue.firstName,
            "middleName": userValue.middleName,
            "lastName": userValue.lastName,
            "email": userValue.email,
            "contactNo": userValue.contactNo,
            "gender": userValue.gender
          }
          const res = await APIservice.httpPost('/api/admin/users/updateUser', val, token, refreshToken);
          if (res && res.status == 200) {
            console.log("success");
            setPage(0);
            getdata((page * limit), limit);
            setIsOpen(false);
          }
          else if (res.status == 401) {
            navigate("/");
            localStorage.clear();
          }
          else if (res.status == 400) {
            flag = false;
            if (!(flag && errorFlag)) {
              setUserError(true)
              setUserErrorMsg(res.message)
              setErrorFlag(true)
            }
          } else if (res.status == 500) {
            setIsOpen(false);
            toast.error(res.message, {
              autoClose: 6000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              position: toast.POSITION.TOP_RIGHT,
            });
          } else if (res.status == 300) {
            setIsOpen(false);
            toast.error(res.message, {
              autoClose: 6000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              position: toast.POSITION.TOP_RIGHT,
            });
          } else if (res.status == 404) {
            setIsOpen(false);
            toast.error(res.message, {
              autoClose: 6000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
        else {
          //insert
          const token = localStorage.getItem('SessionToken');
          const refreshToken = localStorage.getItem('RefreshToken');
          if (image) {
            userValue.image = image;
          } else {
            console.log(userValue)
          }
          const res = await APIservice.httpPost('/api/admin/users/insertUser', userValue, token, refreshToken);

          if (res && res.status == 200) {
            getdata(0, limit);
            console.log("success");
            setPage(0);
            setIsOpen(false)
          }
          else if (res.status == 401) {
            navigate("/");
            localStorage.clear();
          }
          else if (res.status == 400) {
            flag = false;
            if (!(flag && errorFlag)) {
              setUserError(true)
              setUserErrorMsg(res.message)
              setErrorFlag(true)
            }
          } else if (res.status == 500) {
            setIsOpen(false);
            toast.error(res.message, {
              autoClose: 6000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              position: toast.POSITION.TOP_RIGHT,
            });
          } else if (res.status == 300) {
            setIsOpen(false);
            toast.error(res.message, {
              autoClose: 6000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              position: toast.POSITION.TOP_RIGHT,
            });
          } else if (res.status == 404) {
            setIsOpen(false);
            toast.error(res.message, {
              autoClose: 6000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        };
      } catch (error: any) {
        setIsOpen(false);
        toast.error(error, {
          autoClose: 6000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  }

  const onFileChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result.toString());
      console.log(reader.result.toString());
    };
    reader.readAsDataURL(file);
  }

  const onImageChange = (e: any) => {
    const { name, value } = e.target;
    setUserValue({
      ...userValue,
      [name]: value,
    });
  }

  const searchData = (e) => {
    setSearchString(e.target.value)
    searchString = e.target.value
    getdata(page, limit);
  }

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
    getdata((newPage * limit), limit);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
    setPage(0);
    getdata(0, parseInt(event.target.value))
  };

  const theme = useTheme();

  return (
    <>
      <ToastContainer
        style={{ top: "10%", left: "80%" }}
        autoClose={6000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Helmet>
        <title>User List</title>
      </Helmet>
      <PageTitleWrapper>
        <Box p={1}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack alignItems="left" justifyContent="space-between">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link
                    to="/admin"
                    style={{ display: 'flex', color: "black" }}
                  >
                    <HomeIcon />
                  </Link>
                  <Typography variant="subtitle2" color="inherit" style={{ fontWeight: "bold" }}>Users</Typography>
                </Breadcrumbs>
              </Stack>
            </Grid>
            <Grid item>
              <Grid container spacing={1.5}>
                <Grid item>
                  <Button
                    className="buttonLarge"
                    sx={{ mt: { xs: 0, md: 0, padding: "8.3px", top: "3px" }, display: "flex", alignItems: "center" }}
                    variant="contained"
                    onClick={handleClickisAdd}
                    size="small"
                  >
                    <AddTwoToneIcon fontSize="small" /> Create Users
                  </Button>
                  <Button
                    className="button"
                    sx={{ mt: { xs: 0, md: 0, padding: "8.3px", top: "3px" }, display: "flex", alignItems: "center" }}
                    variant="contained"
                    onClick={handleClickisAdd}
                    size="small"
                  >
                    <AddTwoToneIcon fontSize="small" />
                  </Button>
                </Grid>
                <Grid item>
                  <FormControl sx={{ mt: { xs: 0.3, md: 0.3, lg: 0.3, sm: 0.3 }, }}>
                    <TextField
                      size="small"
                      name="search"
                      value={searchString}
                      onChange={(e) => searchData(e)}
                      id="outlined-basic"
                      label="Search"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        )
                      }} />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <>
              <Card className="Usercard">
                <div>
                  {isloading ? <Loader1 title="Loading..." /> :
                    <>
                      <Divider />
                      {
                        (user && user.length > 0) ?
                          <>
                            <TableContainer className="UsertableContainer">
                              <Table stickyHeader>
                                <TableHead>
                                  <TableRow>
                                    <TableCell >
                                      <Typography noWrap style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "none" }}>
                                        ID
                                      </Typography>
                                    </TableCell>
                                    <TableCell >
                                      <Typography noWrap style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "none" }}>
                                        Name
                                      </Typography>
                                    </TableCell>
                                    <TableCell >
                                      <Typography noWrap style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "none" }}>
                                        Contact No
                                      </Typography>
                                    </TableCell>
                                    <TableCell >
                                      <Typography noWrap style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "none" }}>
                                        Email
                                      </Typography>
                                    </TableCell>
                                    <TableCell >
                                      <Typography noWrap style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "none" }}>
                                        Gender
                                      </Typography>
                                    </TableCell>
                                    <TableCell align='right' >
                                      <Typography noWrap style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "none" }}>
                                        Action
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {
                                    user
                                      .map((arr: any, index: number) => {
                                        return (
                                          <TableRow
                                            hover
                                            key={index}
                                          >
                                            <TableCell >
                                              <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                              >
                                                {(page * limit) + index + 1}
                                              </Typography>
                                            </TableCell>
                                            <TableCell >
                                              <Stack direction="row" alignItems="center" spacing={2}>
                                                {arr.image ? <Avatar src={process.env.REACT_APP_IMAGE_URL + arr.image}></Avatar> : <Avatar>{arr.firstName ? arr.firstName[0] : null}</Avatar>}
                                                <Typography
                                                  variant="body1"
                                                  fontWeight="bold"
                                                  color="text.primary"
                                                  gutterBottom
                                                  noWrap
                                                >
                                                  {arr.firstName} {arr.middleName} {arr.lastName}
                                                </Typography>
                                              </Stack>
                                            </TableCell>
                                            <TableCell>
                                              <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                              >
                                                {arr.contactNo}
                                              </Typography>
                                            </TableCell>
                                            <TableCell >
                                              <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                              >
                                                {arr.email}
                                              </Typography>
                                            </TableCell>
                                            <TableCell >
                                              <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                              >
                                                {arr.gender}
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="right" sx={{ display: "flex" }}>
                                              <Tooltip title={(arr.isActive === 0) ? "Inactive" : "Active"} arrow>
                                                <Switch
                                                  checked={arr.isActive === 0 ? false : true}
                                                  onClick={(e) => handleSwitch(arr.id)}
                                                  inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                              </Tooltip>
                                              <Tooltip title="Edit" arrow>
                                                <IconButton
                                                  sx={{
                                                    '&:hover': {
                                                      background: theme.colors.primary.lighter
                                                    },
                                                    color: theme.palette.primary.main
                                                  }}
                                                  color="inherit"
                                                  size="small"
                                                  onClick={(e) => handleClickisEdit(arr.id, arr.image, arr.firstName, arr.middleName, arr.lastName, arr.email, arr.email, arr.contactNo, arr.gender)}
                                                >
                                                  <EditTwoToneIcon fontSize="small" />
                                                </IconButton>
                                              </Tooltip>
                                            </TableCell>
                                          </TableRow>
                                        );
                                      })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                            <Box p={2}>
                              <TablePagination
                                component="div"
                                count={row}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleLimitChange}
                                page={page}
                                rowsPerPage={limit}
                                rowsPerPageOptions={[10, 20, 30, 40]}
                              />
                            </Box>
                          </>
                          :
                          <Paper sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            verticalAlign: "middle",
                            boxShadow: 'none',
                          }} className="Usercard">
                            <Typography variant="h5" paragraph>
                              Data not Found</Typography>
                          </Paper>
                      }
                      <div>
                        <Dialog open={ischeck} onClose={handleCloseSwitch} fullWidth maxWidth="xs" >
                          <DialogTitle sx={{ m: 0, p: 2, fontSize: "20px", fontWeight: "bolder" }}>{(userValue.status === 0) ? 'Inactive' : 'Active'}</DialogTitle>
                          <DialogContent>
                            <DialogContentText style={{ fontSize: "1rem", letterSpacing: "0.00938em" }}>
                              {(userValue.status === 0) ? 'Are you sure you want to Active?' : 'Are you sure you want to Inactive?'}
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseSwitch}>Cancel</Button>
                            <Button onClick={handleCheckSwitch}>Yes</Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                      <div>
                        <BootstrapDialog open={isOpen} onClose={handleCloseUsersDialog} maxWidth="md">
                          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseUsersDialog}>
                            {userValue.id ? "Edit Users" : "Add Users"}
                          </BootstrapDialogTitle >
                          <DialogContent dividers>
                            {/* <Container> */}
                            <Form>
                              <FormGroup style={{ alignItems: "center", marginBottom: "10px" }}>
                                <input
                                  style={{
                                    display: "none"
                                  }}
                                  id="icon-button-file"
                                  type="file"
                                  accept="image/*"
                                  name="image"
                                  // value = {userValue.image}
                                  onChange={(e) => { onFileChange(e); onImageChange(e) }}
                                  className="upload-button" />
                                <label htmlFor="icon-button-file">
                                  {image ? (
                                    <img src={image}
                                      alt="userProfile"
                                      style={{
                                        height: "100px",
                                        width: "100px",
                                        // borderRadius: '50%',
                                      }} />
                                  ) : (
                                    <img src="/userLogo.png"
                                      alt="userProfile"
                                      style={{
                                        height: "100px",
                                        width: "100px",
                                        // borderRadius: '50%',
                                      }} />
                                  )}
                                </label>
                              </FormGroup>
                              <Row>
                                <Col sm>
                                  <TextField fullWidth margin="dense" label="Firstname" type="text" variant="outlined" name="firstName" value={userValue.firstName} onChange={(e: any) => { validateFirstName(e); handlechange(e) }} required={true} />
                                  <FormHelperText style={{ color: 'red', height: '22px' }}>{isFirstNameError && firstNameErrorMsg}</FormHelperText>
                                </Col>
                                <Col sm>
                                  <TextField fullWidth margin="dense" label="Middlename" type="text" variant="outlined" name="middleName" value={userValue.middleName} onChange={(e: any) => { validateMiddleName(e); handlechange(e) }} required={true} />
                                  <FormHelperText style={{ color: 'red', height: '22px' }}>{isMiddleNameError && middleNameErrorMsg}</FormHelperText>
                                </Col>
                                <Col sm>
                                  <TextField fullWidth margin="dense" label="Lastname" type="text" variant="outlined" name="lastName" value={userValue.lastName} onChange={(e: any) => { validateLastName(e); handlechange(e) }} required={true} />
                                  <FormHelperText style={{ color: 'red', height: '22px' }}>{isLastNameError && lastNameErrorMsg}</FormHelperText>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={12} md={6}>
                                  <TextField fullWidth margin="dense" label="Email" type="text" variant="outlined" name="email" value={userValue.email} onChange={(e: any) => { validateEmail(e); handlechange(e) }} required={true} />
                                  <FormHelperText style={{ color: 'red', height: '22px' }}>{isEmailValidateError && emailValidateErrorMsg}</FormHelperText>
                                </Col>
                                <Col xs={12} md={6}>
                                  <TextField fullWidth margin="dense" label="Confirm Email" type="text" variant="outlined" name="confirmEmail" value={userValue.confirmEmail} onChange={(e: any) => { confirmEmailValidation(e); handlechange(e) }} required={true} />
                                  <FormHelperText style={{ color: 'red', height: '22px' }}>{isEmailError && confirmEmailValidateErrorMsg}</FormHelperText>
                                </Col>
                              </Row>
                              {!userValue.id &&
                                <>
                                  <Row>
                                    <Col xs={12} md={6}>
                                      <TextField fullWidth margin="dense"
                                        label="Password"
                                        type={showPassword === true ? 'text' : 'password'}
                                        variant="outlined"
                                        name="password"
                                        value={userValue.password}
                                        onChange={(e: any) => { ValidatePassword(e); handlechange(e) }}
                                        required={true}
                                        InputProps={{
                                          endAdornment: (<InputAdornment position="start"
                                            onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword === true ?
                                              <VisibilityIcon /> :
                                              <VisibilityOffIcon />
                                            }
                                          </InputAdornment>)
                                        }} />
                                      <FormHelperText style={{ color: 'red', height: '22px' }}>{isPasswordValidateError && passwordValidateErrorMsg}</FormHelperText>
                                    </Col>
                                    <Col xs={12} md={6}>
                                      <TextField fullWidth margin="dense"
                                        label="Confirm Password"
                                        type={showPassword1 === true ? 'text' : 'password'}
                                        variant="outlined" name="confirmPassword"
                                        value={userValue.confirmPassword}
                                        onChange={(e: any) => { confirmPasswordValidation(e); handlechange(e) }}
                                        required={true}
                                        InputProps={{
                                          endAdornment: (
                                            <InputAdornment
                                              position="start"
                                              onClick={() => setShowPassword1(!showPassword1)}
                                            >
                                              {showPassword1 === true ?
                                                <VisibilityIcon /> :
                                                <VisibilityOffIcon />
                                              }
                                            </InputAdornment>)
                                        }} />
                                      <FormHelperText style={{ color: 'red', height: '22px' }}>{isConfirmPasswordError && confirmPasswordError}</FormHelperText>
                                    </Col>
                                  </Row>
                                </>
                              }
                              <Row>
                                <Col xs={12} md={6}>
                                  <TextField fullWidth margin="dense" id="name" label="Contact No" type="text" variant="outlined" name="contactNo" value={userValue.contactNo} onChange={(e: any) => { ValidatePhone(e); handlechange(e) }} required={true} />
                                  <FormHelperText style={{ color: 'red', height: '22px' }}>{isPhoneValidateError && phoneValidateErrorMsg}</FormHelperText>
                                </Col>
                                <Col xs={12} md={6}>
                                  <FormControl style={{ verticalAlign: "sub" }}>
                                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                      row
                                      aria-labelledby="demo-radio-buttons-group-label"
                                      name="radio-buttons-group"
                                    >
                                      <FormControlLabel name="gender" value="Female" checked={userValue.gender === 'Female'} onChange={(e: any) => { validateGender(e); handlechange(e) }} control={<Radio />} label="Female" />
                                      <FormControlLabel name="gender" value="Male" checked={userValue.gender === 'Male'} onChange={(e: any) => { validateGender(e); handlechange(e) }} control={<Radio />} label="Male" />
                                    </RadioGroup>
                                    <FormHelperText style={{ color: 'red', height: '22px' }}>{isGenderError && GenderErrorMsg}</FormHelperText>
                                  </FormControl>
                                </Col>
                              </Row>
                            </Form>
                          </DialogContent>
                          <Box sx={{ display: "flex", justifyContent: "space-between", p: "8px" }}>
                            <FormHelperText style={{ color: 'red', height: '22px', margin: "none", padding: "8px" }}>{isUserError && UserErrorMsg}</FormHelperText>
                            <Button onClick={saveUsers}>Save</Button>
                          </Box>
                        </BootstrapDialog>
                      </div>
                    </>
                  }
                </div>
              </Card>
            </>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default UserList;
