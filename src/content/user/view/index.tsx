import {
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Grid, Tab } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import * as React from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import HomeIcon from '@mui/icons-material/Home';
import PageTitleWrapper from './../../../components/PageTitleWrapper';
import APIservice from './../../../utils/APIservice';
import { useState } from 'react';
import Loader1 from './../../appuserViewLoader';
import { format } from 'date-fns';
import Footer from 'src/components/Footer';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ManagementUserProfile() {

  const [users, setUsers] = React.useState<any>([]);
  const [userFav, setUserFav] = React.useState<any>([]);
  const [reqSend, setReqSend] = React.useState<any>([]);
  const [reqGet, setReqGet] = React.useState<any>([]);
  const [blockUser, setBlockUser] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = useState<number>(0);
  const [limitSend, setLimitSend] = useState<number>(10);
  const [limitGot, setLimitGot] = useState<number>(10);
  const [limitFav, setLimitFav] = useState<number>(10);
  const [limitblock, setLimitBlock] = useState<number>(10);
  const [rowSend, setRowSend] = useState<number>(10);
  const [rowGot, setRowGot] = useState<number>(10);
  const [rowFav, setRowFav] = useState<number>(10);
  const [rowBlock, setRowBlock] = useState<number>(10);
  const [firstName, setFirstName] = useState<any>([])
  const [middleName, setMiddleName] = useState<any>([])
  const [lastName, setLastName] = useState<any>([])
  const navigate = useNavigate();

  const vId = useParams();

  // window.onpopstate = () => {
  //   navigate(-1);
  // }

  React.useEffect(() => {
    getData();
  }, [])

  const dateData = localStorage.getItem('DateFormat')

  const getData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('SessionToken');
      const refreshToken = localStorage.getItem('RefreshToken')
      let obj = {
        "userId": vId.id
      }
      const res = await APIservice.httpPost('/api/admin/appUsers/viewAppUserPerDetail', obj, token, refreshToken);
      setUsers(res.recordList);
      sessionStorage.setItem("FirstName", res.recordList[0].firstName ? res.recordList[0].firstName : "");
      sessionStorage.setItem("MiddleName", res.recordList[0].middleName ? res.recordList[0].middleName : "");
      sessionStorage.setItem("LastName", res.recordList[0].lastName ? res.recordList[0].lastName : "");

      if (res && res.status == 200) {
        console.log("success");
      }
      else if (res.status == 401) {
        localStorage.clear();
        navigate("/");
      }      else if (res.status == 500) {
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
      else if (res.status == 300) {
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
      getName();
    } catch (error) {
      setIsLoading(false);
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

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (newValue === '2') {
      sendRequest(page, limitSend);
    }
    else if (newValue === '3') {
      gotRequest(page, limitGot);
    }
    else if (newValue === '4') {
      fav(page, limitFav);
    }
    else if (newValue === '5') {
      getBlockUser(page, limitblock);
    }
  };

  const handleViewClick = (id: number) => {
    navigate(`/admin/appuser/view/${id}`);
    window.location.reload();
  }

  const getName = () => {
    let fName = sessionStorage.getItem("FirstName")
    let mName = sessionStorage.getItem("MiddleName")
    let lName = sessionStorage.getItem("LastName")
    if ((fName && lName) || mName) {
      setFirstName(fName);
      setMiddleName(mName)
      setLastName(lName)
    }
  }

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
    sendRequest((newPage * limitSend), limitSend);
    gotRequest((newPage * limitGot), limitGot);
    fav((newPage * limitFav), limitFav);
    getBlockUser((newPage * limitblock), limitblock);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLimitSend(parseInt(event.target.value));
    setLimitGot(parseInt(event.target.value));
    setLimitFav(parseInt(event.target.value));
    setLimitBlock(parseInt(event.target.value));
    setPage(0);
    sendRequest(0, parseInt(event.target.value));
    gotRequest(0, parseInt(event.target.value));
    fav(0, parseInt(event.target.value));
    getBlockUser(0, parseInt(event.target.value));
  };

  const sendRequest = async (startIndex: number, fetchRecord: number) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('SessionToken');
      const refreshToken = localStorage.getItem('RefreshToken')
      let obj = {
        "startIndex": startIndex,
        "fetchRecord": fetchRecord,
        "userId": vId.id
      }
      const res = await APIservice.httpPost('/api/admin/appUsers/viewAppUserSendRequest', obj, token, refreshToken);
      setReqSend(res.recordList);
      setRowSend(res.totalRecords);
      if (res && res.status == 200) {
        console.log("success");
      }
      else if (res.status == 401) {
        localStorage.clear();
        navigate("/");
      }      else if (res.status == 500) {
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
      else if (res.status == 300) {
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
    } catch (error) {
      setIsLoading(false);
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

  const gotRequest = async (startIndex: number, fetchRecord: number) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('SessionToken');
      const refreshToken = localStorage.getItem('RefreshToken')
      let obj = {
        "startIndex": startIndex,
        "fetchRecord": fetchRecord,
        "userId": vId.id
      }
      const res = await APIservice.httpPost('/api/admin/appUsers/viewAppUserGotRequest', obj, token, refreshToken);
      setReqGet(res.recordList);
      setRowGot(res.totalRecords);
      if (res && res.status == 200) {
        console.log("success");
      }
      else if (res.status == 401) {
        localStorage.clear();
        navigate("/");
      }      else if (res.status == 500) {
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
      else if (res.status == 300) {
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
    } catch (error) {
      setIsLoading(false);
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

  const fav = async (startIndex: number, fetchRecord: number) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('SessionToken');
      const refreshToken = localStorage.getItem('RefreshToken')
      let obj = {
        "startIndex": startIndex,
        "fetchRecord": fetchRecord,
        "userId": vId.id
      }
      const res = await APIservice.httpPost('/api/admin/appUsers/viewAppUserFavourites', obj, token, refreshToken);
      setUserFav(res.recordList);
      setRowFav(res.totalRecords);
      if (res && res.status == 200) {
        console.log("success");
      }
      else if (res.status == 401) {
        localStorage.clear();
        navigate("/");
      }      else if (res.status == 500) {
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
      else if (res.status == 300) {
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
    } catch (error) {
      setIsLoading(false);
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

  const getBlockUser = async (startIndex: number, fetchRecord: number) => {
    debugger
    try {
      setIsLoading(true);
      const token = localStorage.getItem('SessionToken');
      const refreshToken = localStorage.getItem('RefreshToken')
      let obj = {
        "startIndex": startIndex,
        "fetchRecord": fetchRecord,
        "userId": vId.id
      }
      const res = await APIservice.httpPost('/api/admin/appUsers/viewBlockUser', obj, token, refreshToken);
      setBlockUser(res.recordList);
      setRowBlock(res.totalRecords);
      if (res && res.status == 200) {
        console.log("success");
      }
      else if (res.status == 401) {
        localStorage.clear();
        navigate("/");
      }
      else if (res.status == 500) {
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
      else if (res.status == 300) {
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
    } catch (error) {
      setIsLoading(false);
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

  return (
    <>
      <ToastContainer
        style={{ top: "8.5%", right: "0%" }}
        // position="top-right"
        autoClose={6000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <PageTitleWrapper>
        <Box py={1.9} pl={1}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item >
              <Stack alignItems="left" justifyContent="space-between">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link
                    to="/admin"
                    style={{ display: 'flex', color: "black" }}
                  >
                    <HomeIcon />
                  </Link>
                  <Link
                    to="/admin/appuser"
                    style={{ display: 'flex', color: "black", textDecoration: "none" }}
                  >
                    App Users
                  </Link>
                  {/* <Typography color="inherit" >View</Typography> */}
                  <Typography variant="subtitle2" color="inherit" fontWeight="bold">{firstName} {lastName}</Typography>
                </Breadcrumbs>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          // alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card style={{ height: "calc(100vh - 228px)" }}>
              <TabContext value={value}>
                <Box sx={{
                  borderBottom: 1, borderColor: 'divider',
                  padding: '16px', paddingLeft: "16px", overflowX: "auto"
                }}>
                  <TabList onChange={handleChange}
                    aria-label="scrollable force tabs example"
                    variant="scrollable"
                  //  scrollButtons
                  // allowScrollButtonsMobile
                  >
                    <Tab label="Profile" value="1" />
                    <Tab label="Send Request" value="2" />
                    <Tab label="Got Request" value="3" />
                    <Tab label="Favourites" value="4" />
                    <Tab label="Block User" value="5" />
                  </TabList>
                </Box>
                <TabPanel value="1" >
                  {isLoading ? <Loader1 title="Loading..." /> :
                    <>
                      <TableContainer style={{ height: "calc(100vh - 353px)" }}>
                        {
                          users.map((user: any, index: any) => (
                            <Grid container key={index}>
                              <Grid item xs={12} sm={6} md={6}>
                                <Box style={{ padding: "16px" }}>
                                  <Typography gutterBottom >
                                    {user.imageUrl ? <Avatar src={process.env.REACT_APP_IMAGE_URL + user.imageUrl} sx={{ height: '70px', width: '70px', marginBottom: "1%" }}></Avatar> : <Avatar sx={{ height: '70px', width: '70px' }}>{user.firstName ? user.firstName[0] : null}</Avatar>}
                                  </Typography>
                                  {user.firstName ?
                                    <Typography gutterBottom variant="h6">
                                      <Box display="flex" alignItems="flex-start" ><b>Name</b> <Box sx={{ pl: 9.1 }}>{user.firstName} {user.middleName} {user.lastName}  </Box></Box>
                                    </Typography>
                                    :
                                    <Typography gutterBottom variant="h6">
                                      <Box display="flex" alignItems="flex-start" ><b>Name</b> <Box sx={{ pl: 9.1 }}> -- </Box></Box>
                                    </Typography>
                                  }
                                  <Typography gutterBottom variant="h6">
                                    <Box display="flex" alignItems="flex-start" ><b>Email </b> <Box sx={{ pl: 9.8 }}>{(user.email) ? user.email : "--"}</Box></Box>
                                  </Typography>
                                  <Typography gutterBottom variant="h6">
                                    <Box display="flex" alignItems="flex-start" > <b>Gender</b>  <Box sx={{ pl: 8.2 }}> {(user.gender) ? user.gender : "--"}</Box></Box>
                                  </Typography>
                                  <Typography gutterBottom variant="h6">
                                    <Box display="flex" alignItems="flex-start" ><b>Birthdate  </b><Box sx={{ pl: 6.5 }}> {format(new Date(user.birthDate), dateData) ? format(new Date(user.birthDate), dateData) : "--"}</Box></Box>
                                  </Typography>
                                  <Typography gutterBottom variant="h6">
                                    <Box display="flex" alignItems="flex-start" ><b>Contact No</b><Box sx={{ pl: 5 }}>{(user.contactNo) ? user.contactNo : "--"}</Box></Box>
                                  </Typography>
                                  {user.addressLine1 ?
                                    <Typography gutterBottom variant="h6">
                                      <Box display="flex" alignItems="flex-start" ><b>Address</b><Box sx={{ pl: 7.5 }}>{user.addressLine1},{user.addressLine2},{user.cityName}</Box></Box>
                                    </Typography>
                                    :
                                    <Typography gutterBottom variant="h6">
                                      <Box display="flex" alignItems="flex-start" ><b>Address</b><Box sx={{ pl: 7.5 }}> -- </Box></Box>
                                    </Typography>
                                  }
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6}>
                                <Box style={{ padding: "16px" }}>
                                  <Typography gutterBottom variant="h6" >
                                    <Box display="flex" alignItems="flex-start" ><b>Annual Income </b><Box sx={{ pl: 2.2 }}>{user.annualIncome ? user.annualIncome : "--"}</Box></Box>
                                  </Typography>
                                  <Typography gutterBottom variant="h6">
                                    <Box display="flex" alignItems="flex-start"><b>Education</b> <Box sx={{ pl: 5.8 }}>{user.education ? user.education : "--"}</Box></Box>
                                  </Typography>
                                  <Typography gutterBottom variant="h6">
                                    <Box display="flex" alignItems="flex-start"><b>Community</b> <Box sx={{ pl: 4.5 }}>{user.community ? user.community : "--"}</Box></Box>
                                  </Typography>
                                  <Typography gutterBottom variant="h6">
                                    <Box display="flex" alignItems="flex-start"><b>Marital Status</b> <Box sx={{ pl: 3 }}>{user.maritalStatus ? user.maritalStatus : "--"}</Box></Box>
                                  </Typography>
                                  <Typography gutterBottom variant="h6">
                                    <Box display="flex" alignItems="flex-start"><b>Languages </b><Box sx={{ pl: 5 }}> {user.languages ? user.languages : "--"}</Box></Box>
                                  </Typography>
                                  <Typography gutterBottom variant="h6">
                                    <Box display="flex" alignItems="flex-start"><b> Height</b> <Box sx={{ pl: 8.7 }}>{user.height ? user.height : "--"}</Box></Box>
                                  </Typography>
                                  <Typography gutterBottom >
                                    <Box display="flex" alignItems="flex-start"> <b>Diet</b> <Box sx={{ pl: 10.9 }}> {user.diet ? user.diet : "--"}</Box></Box>
                                  </Typography>
                                  <Typography gutterBottom >
                                    <Box display="flex" alignItems="flex-start"><b> Eye Color </b><Box sx={{ pl: 6.7 }}>{user.eyeColor ? user.eyeColor : "--"}</Box></Box>
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          ))}
                      </TableContainer>
                    </>
                  }
                </TabPanel>
                <TabPanel value="2">
                  <Card style={{ height: "calc(100vh - 377px)", margin: "1%" }}>
                    <div>
                      {isLoading ? <Loader1 title="Loading..." /> :
                        <>
                          {reqSend && reqSend.length ?
                            <>
                              <TableContainer style={{ height: "calc(100vh - 453px)", overflow: "auto" }}>
                                <Table stickyHeader>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Id </TableCell>
                                      <TableCell> Name </TableCell>
                                      <TableCell>Contact No </TableCell>
                                      <TableCell>Email </TableCell>
                                      <TableCell>Date </TableCell>
                                      <TableCell align="right">Action </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {reqSend.map((user: any, index: any) => (
                                      <TableRow key={user.id}>
                                        <TableCell  >
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            {(page * limitSend) + index + 1}
                                          </Typography>
                                        </TableCell>
                                        <TableCell>
                                          <Stack direction="row" alignItems="center" spacing={2}>
                                            {user.imageUrl ? <Avatar src={process.env.REACT_APP_IMAGE_URL + user.imageUrl}></Avatar> : <Avatar>{user.firstName ? user.firstName[0] : null}</Avatar>}
                                            <Typography
                                              variant="body1"
                                              fontWeight="bold"
                                              color="text.primary"
                                              gutterBottom
                                              noWrap
                                            >
                                              {user.firstName ? user.firstName : null} {user.lastName}
                                            </Typography>
                                          </Stack>
                                        </TableCell>
                                        <TableCell align="left">
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            {user.contactNo ? user.contactNo : "--"}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            {user.email}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            {format(new Date(user.createdDate), dateData)}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            <Button
                                              style={{ textAlign: "right" }}
                                              variant="outlined"
                                              size="small"
                                              onClick={(e) => { handleViewClick(user.proposalUserId) }}
                                            >
                                              View Profile
                                            </Button>
                                          </Typography>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              <Box p={2}>
                                <TablePagination
                                  component="div"
                                  count={rowSend}//totalrecords
                                  onPageChange={handlePageChange}
                                  onRowsPerPageChange={handleLimitChange}
                                  page={page}
                                  rowsPerPage={limitSend}
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
                              height: "calc(100vh - 453px)"
                            }}
                            // className="communitytableContainer"
                            >
                              <Typography variant="h5" paragraph>
                                Data not Found</Typography>
                            </Paper>
                          }
                        </>
                      }
                    </div>
                  </Card>
                </TabPanel>
                <TabPanel value="3">
                  <Card style={{ height: "calc(100vh - 377px)", margin: "1%" }}>
                    <div>
                      {isLoading ? <Loader1 title="Loading..." /> :
                        <>
                          {reqGet && reqGet.length ?
                            <>
                              <TableContainer style={{ height: "calc(100vh - 453px)", overflow: "auto" }}>
                                <Table stickyHeader>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Id </TableCell>
                                      <TableCell> Name </TableCell>
                                      <TableCell>Contact No </TableCell>
                                      <TableCell>Email </TableCell>
                                      <TableCell>Date </TableCell>
                                      <TableCell align="right">Action </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {reqGet.map((user: any, index: any) => (
                                      <TableRow key={user.id}>
                                        <TableCell  >
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            {(page * limitGot) + index + 1}
                                          </Typography>
                                        </TableCell>
                                        <TableCell>
                                          <Stack direction="row" alignItems="center" spacing={2}>
                                            {user.imageUll ? <Avatar src={process.env.REACT_APP_IMAGE_URL + user.imageUrl}></Avatar> : <Avatar>{user.firstName ? user.firstName[0] : null}</Avatar>}
                                            <Typography
                                              variant="body1"
                                              fontWeight="bold"
                                              color="text.primary"
                                              gutterBottom
                                              noWrap
                                            >
                                              {user.firstName} {user.lastName}
                                            </Typography>
                                          </Stack>
                                        </TableCell>
                                        <TableCell align="left">
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            {user.contactNo ? user.contactNo : "--"}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            {user.email}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            {format(new Date(user.createdDate), dateData)}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            <Button
                                              style={{ textAlign: "right" }}
                                              variant="outlined"
                                              size="small"
                                              onClick={(e) => { handleViewClick(user.userId) }}
                                            >
                                              View Profile
                                            </Button>
                                          </Typography>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              <Box p={2} >
                                <TablePagination
                                  component="div"
                                  count={rowGot}//totalrecords
                                  onPageChange={handlePageChange}
                                  onRowsPerPageChange={handleLimitChange}
                                  page={page}
                                  rowsPerPage={limitGot}
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
                              height: "calc(100vh - 453px)"
                            }}
                            // className="communitytableContainer"
                            >
                              <Typography variant="h5" paragraph>
                                Data not Found</Typography>
                            </Paper>
                          }
                        </>
                      }
                    </div>
                  </Card>
                </TabPanel>
                <TabPanel value="4">
                  <Card style={{ height: "calc(100vh - 377px)", margin: "1%" }}>
                    <div>
                      {isLoading ? <Loader1 title="Loading..." /> :
                        <>
                          {userFav && userFav.length ?
                            <>
                              <TableContainer style={{ height: "calc(100vh - 453px)", overflow: "auto" }}>
                                <Table stickyHeader>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Id </TableCell>
                                      <TableCell> Name </TableCell>
                                      <TableCell>Contact No </TableCell>
                                      <TableCell>Email </TableCell>
                                      <TableCell>Date </TableCell>
                                      <TableCell align="right">Action </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {userFav.map((user: any, index: any) => (
                                      <TableRow key={user.id}>
                                        <TableCell  >
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            {(page * limitFav) + index + 1}
                                          </Typography>
                                        </TableCell>
                                        <TableCell >
                                          <Stack direction="row" alignItems="center" spacing={2}>
                                            {user.imageUrl ? <Avatar src={process.env.REACT_APP_IMAGE_URL + user.imageUrl}></Avatar> : <Avatar>{user.firstName ? user.firstName[0] : null}</Avatar>}
                                            <Typography
                                              variant="body1"
                                              fontWeight="bold"
                                              color="text.primary"
                                              gutterBottom
                                              noWrap
                                            >
                                              {user.firstName ? user.firstName : null} {user.lastName}
                                            </Typography>
                                          </Stack>
                                        </TableCell>
                                        {/* <TableCell>
                                              <Typography variant="h4" gutterBottom >
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                              <Typography variant="h4" gutterBottom >
                                              </Typography>
                                            </TableCell> */}
                                        <TableCell align="left">
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            {user.contactNo ? user.contactNo : "--"}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            {user.email}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            {format(new Date(user.createdDate), dateData)}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            <Button
                                              style={{ textAlign: "right" }}
                                              variant="outlined"
                                              size="small"
                                              onClick={(e) => { handleViewClick(user.favUserId) }}
                                            >
                                              View Profile
                                            </Button>
                                          </Typography>
                                        </TableCell>

                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              <Box p={2}>
                                <TablePagination
                                  component="div"
                                  count={rowFav}//totalrecords
                                  onPageChange={handlePageChange}
                                  onRowsPerPageChange={handleLimitChange}
                                  page={page}
                                  rowsPerPage={limitFav}
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
                              height: "calc(100vh - 453px)"
                            }}
                            // className="communitytableContainer"
                            >
                              <Typography variant="h5" paragraph>
                                Data not Found</Typography>
                            </Paper>
                          }
                        </>
                      }
                    </div>
                  </Card >
                </TabPanel >
                <TabPanel value="5">
                  <Card style={{ height: "calc(100vh - 377px)", margin: "1%" }}>
                    <div>
                      {isLoading ? <Loader1 title="Loading..." /> :
                        <>
                          {blockUser && blockUser.length ?
                            <>
                              <TableContainer style={{ height: "calc(100vh - 453px)", overflow: "auto" }}>
                                <Table stickyHeader>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Id </TableCell>
                                      <TableCell> Name </TableCell>
                                      <TableCell>Contact No </TableCell>
                                      <TableCell>Email </TableCell>
                                      <TableCell>Date </TableCell>
                                      <TableCell align="right">Action </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {blockUser.map((user: any, index: any) => (
                                      <TableRow key={user.id}>
                                        <TableCell  >
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            {(page * limitblock) + index + 1}
                                          </Typography>
                                        </TableCell>
                                        {user.firstName ?
                                          <TableCell >
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                              {user.imageUrl ? <Avatar src={process.env.REACT_APP_IMAGE_URL + user.imageUrl}></Avatar> : <Avatar>{user.firstName ? user.firstName[0] : null}</Avatar>}
                                              <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                              >
                                                {user.firstName} {user.lastName}
                                              </Typography>
                                            </Stack>
                                          </TableCell>
                                          :
                                          <TableCell >
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                              {user.imageUrl ? <Avatar src={process.env.REACT_APP_IMAGE_URL + user.imageUrl}></Avatar> : <Avatar>{user.firstName ? user.firstName[0] : null}</Avatar>}
                                              <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                              >
                                                --
                                              </Typography>
                                            </Stack>
                                          </TableCell>
                                        }
                                        <TableCell align="left">
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            {user.contactNo ? user.contactNo : "--"}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            {user.email}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            {format(new Date(user.createdDate), dateData)}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                          <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                          >
                                            <Button
                                              style={{ textAlign: "right" }}
                                              variant="outlined"
                                              size="small"
                                              onClick={(e) => { handleViewClick(user.userBlockId) }}
                                            >
                                              View Profile
                                            </Button>
                                          </Typography>
                                        </TableCell>

                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              <Box p={2}>
                                <TablePagination
                                  component="div"
                                  count={rowBlock}//totalrecords
                                  onPageChange={handlePageChange}
                                  onRowsPerPageChange={handleLimitChange}
                                  page={page}
                                  rowsPerPage={limitblock}
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
                              height: "calc(100vh - 453px)"
                            }}
                            // className="communitytableContainer"
                            >
                              <Typography variant="h5" paragraph>
                                Data not Found</Typography>
                            </Paper>
                          }
                        </>
                      }
                    </div>
                  </Card >
                </TabPanel >
              </TabContext >
            </Card >
          </Grid >
        </Grid >
      </Container >
      <Footer />
    </>
  );
}

export default ManagementUserProfile