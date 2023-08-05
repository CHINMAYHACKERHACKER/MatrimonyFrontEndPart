import SearchIcon from "@mui/icons-material/Search";
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from './../../components/PageTitleWrapper';
import { Grid, Container, Box, Breadcrumbs, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormHelperText, IconButton, Stack, styled, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography, useTheme, FormControl, InputAdornment, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import Footer from 'src/components/Footer';
import React, { useState, ChangeEvent } from 'react';;
import { Link, useNavigate } from 'react-router-dom';
import APIservice from 'src/utils/APIservice';
import Loader1 from '../Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../smallScreen.css'

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
  name: ""
}

function Diet() {

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [row, setRow] = useState<number>(10);
  const [diets, setDiets] = React.useState<any>([]);;
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [diet, setDiet] = React.useState<any>(initialState);
  const [isNameError, setNameError] = useState(false);
  const [NameErrorMsg, setNameErrorMsg] = useState("");
  const [ischeck, setIsCheck] = useState(false);
  const [isUserError, setUserError] = useState(false);
  const [UserErrorMsg, setUserErrorMsg] = useState("");
  const [errorFlag, setErrorFlag] = useState(false)
  let [search, setSearch] = useState("");
  const navigate = useNavigate();

  // window.onpopstate = () => {
  //   navigate(-1);
  // }

  const reg = new RegExp(/^[a-zA-Z_ ]+$/);
  const validateName = (arr: any) => {
    const { value } = arr.target;
    if (value) {
      if ((reg.test(arr.target.value))) {
        setNameError(false);
        setNameErrorMsg("");
      } else {
        setNameError(true);
        setNameErrorMsg("Alphabet and space allowed");
      }
    } else {
      setNameError(true);
      setNameErrorMsg("Diet is required");
    }
  }

  const validateForm = (e: any) => {
    e.preventDefault();
    var flag = true;
    if (!diet.name) {
      setNameError(true);
      setNameErrorMsg("Diet is required");
      flag = false;
    } else {
      if ((reg.test(diet.name))) {
        setNameError(false);
        setNameErrorMsg("");
        flag = true;
      } else {
        setNameError(true);
        setNameErrorMsg("Alphabet and space allowed");
        flag = false;
      }
    }
    return flag;
  }

  const handleCloseDietDailog = () => {
    setIsOpen(false);
  };

  const handleClickisAdd = async () => {
    setDiet(initialState);
    setNameError(false);
    setNameErrorMsg("");
    setUserError(false)
    setUserErrorMsg('')
    setIsOpen(true);
  };

  const handleClickisEdit = (no: number, st: string) => {
    let obj = {
      id: no,
      name: st
    }
    setDiet(obj);
    setNameError(false);
    setNameErrorMsg("");
    setUserError(false)
    setUserErrorMsg('')
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsCheck(false);
  }

  const handleSwitch = async (id: number, status: number) => {
    let obj = {
      "id": id,
      "status": status,
    }
    setDiet(obj);
    setIsCheck(true);
  };

  const handleSwitchCheck = async () => {
    const token = localStorage.getItem('SessionToken');
    const refreshToken = localStorage.getItem('RefreshToken')
    let obj = {
      "id": diet.id,
    }
    const res = await APIservice.httpPost('/api/admin/diet/activeInactiveDiet', obj, token, refreshToken);
    setIsCheck(false);
    getData((page * limit), limit);
  };

  const DietDialog = (arr: any) => {
    const { name, value } = arr.target;
    setDiet({ ...diet, [name]: value });
    setIsOpen(true)
    if (errorFlag === true) {
      setUserError(false)
      setUserErrorMsg('')
    }
  }

  React.useEffect(() => {
    getData(page, limit);
    setIsOpen(false);
  }, [])

  const getData = async (startIndex: number, fetchRecord: number) => {
    try {
      if (search) {
        const token = localStorage.getItem('SessionToken');
        const refreshToken = localStorage.getItem('RefreshToken');
        let obj = {
          "startIndex": startIndex,
          "fetchRecord": fetchRecord,
          "name": search ? search : ""
        }
        const res = await APIservice.httpPost('/api/admin/diet/getDiet', obj, token, refreshToken);
        setDiets(res.recordList);
        setRow(res.totalRecords);
      } else {
        setIsLoading(true);
        const token = localStorage.getItem('SessionToken');
        const refreshToken = localStorage.getItem('RefreshToken');
        let obj = {
          "startIndex": startIndex,
          "fetchRecord": fetchRecord,
        }
        const res = await APIservice.httpPost('/api/admin/diet/getDiet', obj, token, refreshToken);
        setDiets(res.recordList);
        setRow(res.totalRecords);

        if (res && res.status == 200) {
          console.log("success");
          setIsOpen(false);
        }
        else if (res.status == 401) {
          localStorage.clear();
          navigate("/");
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

  const saveDiet = async (e: any) => {
    console.log(diet);
    var flag = validateForm(e);
    if (flag) {
      try {
        if (diet.id) {
          const token = localStorage.getItem('SessionToken');
          const refreshToken = localStorage.getItem('RefreshToken');
          let val = { "id": diet.id, "name": diet.name }
          const res = await APIservice.httpPost('/api/admin/diet/insertUpdateDiet', val, token, refreshToken);
          if (res && res.status == 200) {
            console.log("success");
            getData((page * limit), limit);
            // setPage(0);
            setIsOpen(false);
          }
          else if (res.status == 401) {
            localStorage.clear();
            navigate("/");
          }
          else if (res.status == 400) {
            flag = false;
            if (!(flag && errorFlag)) {
              setUserError(true)
              setUserErrorMsg('Diet already exists!')
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
          const token = localStorage.getItem('SessionToken');
          const refreshToken = localStorage.getItem('RefreshToken');
          const res = await APIservice.httpPost('/api/admin/diet/insertUpdateDiet', diet, token, refreshToken);
          if (res && res.status == 200) {
            console.log("success");
            setPage(0);
            setIsOpen(false);
            getData(0, limit);
          }
          else if (res.status == 401) {
            localStorage.clear();
            navigate("/");
          }
          else if (res.status == 400) {
            flag = false;
            if (!(flag && errorFlag)) {

              setUserError(true)
              setUserErrorMsg('Diet already exists!')
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
        setIsLoading(false)
      }
    };
  }

  const searchData = (e) => {
    setSearch(e.target.value)
    search = e.target.value
    getData(page, limit);
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
        <title>Diet</title>
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
                  <Typography variant="subtitle2" color="inherit" fontWeight="bold" >Diet</Typography>
                </Breadcrumbs>
              </Stack>
            </Grid>
            <Grid item>
              <Grid container spacing={1.5}>
                <Grid item>
                  <Button
                    className="buttonLarge"
                    sx={{ mt: { xs: 0, md: 0, display: "flex", alignItems: "center", padding: "8.3px", top: "3px" } }}
                    variant="contained"
                    onClick={handleClickisAdd}
                    size="small"
                  >
                    <AddTwoToneIcon fontSize="small" /> Create Diet
                  </Button>
                  <Button
                    className="button"
                    sx={{ mt: { xs: 0, md: 0, display: "flex", alignItems: "center", padding: "8.3px", top: "3px" } }}
                    variant="contained"
                    onClick={handleClickisAdd}
                    size="small"
                  >
                    <AddTwoToneIcon fontSize="small" />
                  </Button>
                </Grid>
                <Grid item>
                  <FormControl sx={{ mt: { xs: 0.3, md: 0.3, lg: 0.3, sm: 0.3 } }}>
                    <TextField
                      name="search"
                      value={search}
                      onChange={(e) => searchData(e)}
                      id="outlined-basic"
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
              <Card className="dietcard">
                <div>
                  {isLoading ? <Loader1 title="Loading..." /> :
                    <>
                      <Divider />
                      {
                        (diets && diets.length > 0) ?
                          <>
                            <TableContainer className="diettableContainer">
                              <Table stickyHeader>
                                <TableHead>
                                  <TableRow>
                                    <TableCell >
                                      <Typography noWrap style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "none" }}>
                                        ID
                                      </Typography>
                                    </TableCell>
                                    <TableCell align='center' >
                                      <Typography noWrap style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "none" }}>
                                        Food Name
                                      </Typography>
                                    </TableCell>
                                    <TableCell align='right' >
                                      <Typography noWrap style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "none" }}>
                                        Actions
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {
                                    diets
                                      .map((arr: any, index: number) => {
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
                                            </TableCell>
                                            <TableCell align='center' >
                                              <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                                sx={{ textTransform: "capitalize" }}
                                              >
                                                {arr.name}
                                              </Typography>
                                            </TableCell>
                                            <TableCell align='right' sx={{ display: "flex" }}>
                                              <Tooltip title={(arr.isActive === 0) ? "Inactive" : "Active"} arrow>
                                                <Switch
                                                  checked={arr.isActive === 0 ? false : true}
                                                  onClick={(e) => handleSwitch(arr.id, arr.isActive)}
                                                  inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                              </Tooltip>
                                              <Tooltip title="Edit " arrow>
                                                <IconButton
                                                  sx={{
                                                    '&:hover': { background: theme.colors.error.lighter },
                                                    color: theme.palette.primary.main
                                                  }}
                                                  color="inherit"
                                                  size="small"
                                                  onClick={(e) => handleClickisEdit(arr.id, arr.name)}
                                                >
                                                  <EditTwoToneIcon fontSize="small" />
                                                </IconButton>
                                              </Tooltip>
                                            </TableCell>
                                          </TableRow>
                                        );
                                      })
                                  }
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
                          }} className="dietcard">
                            <Typography variant="h5" paragraph>
                              Data not Found</Typography>
                          </Paper>
                      }
                    </>
                  }
                </div>
              </Card>

              <div>
                <Dialog open={ischeck} onClose={handleClose} fullWidth maxWidth="xs">
                  <DialogTitle sx={{ m: 0, p: 2, fontSize: "20px", fontWeight: "bolder" }}>{(diet.status === 0) ? 'Inactive' : 'Active'}</DialogTitle>
                  <DialogContent>
                    <DialogContentText style={{ fontSize: "1rem", letterSpacing: "0.00938em" }}>
                      {(diet.status === 0) ? 'Are you sure you want to Active?' : 'Are you sure you want to Inactive?'}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSwitchCheck}>Yes</Button>
                  </DialogActions>
                </Dialog>
              </div>

              <div>
                <BootstrapDialog open={isOpen} onClose={handleCloseDietDailog} PaperProps={{ sx: { height: "40%" } }} fullWidth maxWidth="xs">
                  <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseDietDailog}>
                    {diet.id ? "Edit Diet" : "Add Diet"}
                  </BootstrapDialogTitle>
                  <DialogContent dividers>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="FoodName"
                      type="text"
                      fullWidth
                      variant="outlined"
                      name="name"
                      value={diet.name}
                      onChange={(arr) => { DietDialog(arr); validateName(arr) }}
                      required={true}
                    />
                    <FormHelperText style={{ color: 'red', height: '22px' }}>{isNameError && NameErrorMsg}</FormHelperText>

                  </DialogContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", p: "8px" }}>
                    <FormHelperText style={{ color: 'red', height: '22px', margin: 'none', padding: "8px 0px" }}>{isUserError && UserErrorMsg}</FormHelperText>
                    <Button onClick={saveDiet}>Save</Button>
                  </Box>
                </BootstrapDialog>
              </div>

            </>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Diet;