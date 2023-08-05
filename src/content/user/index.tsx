import { Helmet } from 'react-helmet-async';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from "@mui/icons-material/Search";
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PageTitleWrapper from './../../components/PageTitleWrapper';
import { Grid, Container, Avatar, Box, Breadcrumbs, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography, useTheme, FormControl, InputAdornment, TextField, Paper } from '@mui/material';
import Footer from 'src/components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, ChangeEvent } from 'react';
import APIservice from 'src/utils/APIservice';
import Loader1 from '../Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../smallScreen.css'

function ApplicationsUser() {

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [row, setRow] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = React.useState<any>([]);
  const [ischeckUnBlock, setIsCheckUnBlock] = useState(false);
  const [unblock, setUnblock] = useState<any>([]);
  let [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleClickVisible = (element: any) => {
    let id = element?.id
    navigate(`/admin/appuser/view/${id}`);
  }

  React.useEffect(() => {
    getData(page, limit);
  }, [])

  const dateData = localStorage.getItem('DateFormat')

  const getData = async (startIndex: number, fetchRecord: number) => {
    try {
      if (search) {
        const token = localStorage.getItem('SessionToken');
        const refreshToken = localStorage.getItem('RefreshToken')
        let obj = {
          "startIndex": startIndex,
          "fetchRecord": fetchRecord,
          "searchString": search ? search : "",
        }
        const res = await APIservice.httpPost('/api/admin/appUsers/getAppUsers', obj, token, refreshToken);
        setUsers(res.recordList);
        setRow(res.totalRecords);
      } else {
        setIsLoading(true);
        const token = localStorage.getItem('SessionToken');
        const refreshToken = localStorage.getItem('RefreshToken')
        let obj = {
          "startIndex": startIndex,
          "fetchRecord": fetchRecord
        }
        const res = await APIservice.httpPost('/api/admin/appUsers/getAppUsers', obj, token, refreshToken);
        setUsers(res.recordList);
        setRow(res.totalRecords);
        if (res && res.status == 200) {
          console.log("success");
        }
        else if (res.status == 401) {
          localStorage.clear();
          navigate("/");
        } else if (res.status == 500) {
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
      }
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

  const searchData = (e) => {
    setSearch(e.target.value)
    search = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
    getData(page, limit);
  }

  const handleClose = () => {
    setIsCheckUnBlock(false);
  }

  const handleClickUnBlock = async (id: number) => {
    let obj = {
      "id": id,
    }
    setUnblock(obj);
    setIsCheckUnBlock(true);
  };

  const handleCheckUnBlock = async () => {
    try {
      const token = localStorage.getItem('SessionToken');
      const refreshToken = localStorage.getItem('RefreshToken')
      let obj = {
        "id": unblock.id,
        "status": 0
      }
      const res = await APIservice.httpPost('/api/admin/appUsers/unblockUserRequest', obj, token, refreshToken);
      console.log(res);
      if (res && res.status === 200) {
        setIsCheckUnBlock(false);
        getData(page * limit, limit);
      } else if (res.status == 401) {
        navigate("/");
        localStorage.clear();
      } else if (res.status == 500) {
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
      } else if (res.status == 300) {
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
    } catch (error) {
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

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
    getData((newPage * limit), limit);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
    setPage(0);
    getData(0, parseInt(event.target.value));
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
        <title>App Users</title>
      </Helmet>
      <PageTitleWrapper>
        <Box pt={1.2} pb={1.1} pl={1}>
          <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
            <Grid item>
              {/* <Typography variant="h3" component="h3" gutterBottom>
                App Users
              </Typography> */}
              <Stack alignItems="left" justifyContent="space-between">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link
                    to="/admin"
                    style={{ display: 'flex', color: "black" }}
                  >
                    <HomeIcon />
                  </Link>
                  <Typography variant="subtitle2" color="inherit" style={{ fontWeight: "bold" }}> App Users</Typography>
                </Breadcrumbs>
              </Stack>
            </Grid>
            <Grid item>
              <FormControl sx={{ mt: { xs: 0, md: 0 } }}>
                <TextField
                  id="outlined-basic"
                  name="search"
                  value={search}
                  onChange={(e) => searchData(e)}
                  label="Search"
                  variant="outlined"
                  size="small"
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
              <Card className="appcard">
                <div>
                  {isLoading ? <Loader1 title="Loading..." /> :
                    <>
                      <Divider />
                      {
                        (users && users.length > 0) ?
                          <>
                            <TableContainer className="apptableContainer">
                              <Table stickyHeader>
                                <TableHead>
                                  <TableRow>
                                    <TableCell >
                                      <Typography noWrap style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "none" }}>
                                        ID
                                      </Typography>
                                    </TableCell>
                                    <TableCell align="left" >
                                      <Typography noWrap style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "none" }}>
                                        Name
                                      </Typography>
                                    </TableCell>
                                    <TableCell align="center" ><Typography
                                      style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "none" }}
                                    >Email</Typography></TableCell>
                                    <TableCell align="center" ><Typography
                                      style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "none" }}
                                      noWrap
                                    >Contact No</Typography></TableCell>
                                    <TableCell align="center" ><Typography
                                      noWrap
                                      style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "none" }}
                                    >Gender</Typography></TableCell>
                                    {/* <TableCell align="center">Created Date</TableCell> */}
                                    <TableCell align="right" ><Typography
                                      noWrap
                                      style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "none" }}
                                    >Actions</Typography></TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {
                                    users.map((arr: any, index: number) => {
                                      return (
                                        <TableRow
                                          hover
                                          key={arr.id}
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
                                          </TableCell >
                                          <TableCell align="center" >
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                              {arr.imageUrl ? <Avatar src={process.env.REACT_APP_IMAGE_URL + arr.imageUrl}></Avatar> : <Avatar>{arr.firstName ? arr.firstName[0] : null}</Avatar>}
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
                                          <TableCell align="center" >
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
                                          <TableCell align="center" >
                                            <Typography
                                              variant="body1"
                                              fontWeight="bold"
                                              color="text.primary"
                                              gutterBottom
                                              noWrap
                                            >
                                              {arr.contactNo ? arr.contactNo : "--"}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="center" >
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
                                          <TableCell align='right' sx={{ diaplay: "flex" }}>
                                            <Tooltip title="View" arrow>
                                              <IconButton
                                                sx={{
                                                  '&:hover': { background: theme.colors.error.lighter },
                                                  color: theme.palette.primary.main
                                                }}
                                                color="inherit"
                                                size="small"
                                                onClick={(e) => { handleClickVisible(arr) }}
                                              >
                                                <VisibilityIcon />
                                              </IconButton>
                                            </Tooltip>
                                            {(arr.isDisable === 1)
                                              &&
                                              <Tooltip title="Block" arrow>
                                                <IconButton
                                                  sx={{
                                                    '&:hover': { background: theme.colors.error.lighter },
                                                    color: theme.palette.primary.main
                                                  }}
                                                  color="inherit"
                                                  size="small"
                                                  onClick={(e) => handleClickUnBlock(arr.id)}
                                                >
                                                  <LockIcon />
                                                </IconButton>
                                              </Tooltip>
                                            }
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
                                count={row}//totalrecord
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
                          }} className="appcard">
                            <Typography variant="h5" paragraph>
                              Data not Found</Typography>
                          </Paper>
                      }
                    </>
                  }
                </div>
              </Card>

              <div>
                <Dialog open={ischeckUnBlock} onClose={handleClose} fullWidth maxWidth="xs">
                  <DialogTitle sx={{ m: 0, p: 2, fontSize: "20px", fontWeight: "bolder" }}>UnBlock</DialogTitle>
                  <DialogContent>
                    <DialogContentText style={{ fontSize: "1rem", letterSpacing: "0.00938em" }}>
                      Are you sure you want to UnBlock?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCheckUnBlock}>Yes</Button>
                  </DialogActions>
                </Dialog>
              </div>
            </>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsUser;
