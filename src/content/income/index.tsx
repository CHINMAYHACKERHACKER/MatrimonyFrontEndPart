import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Box, Breadcrumbs, Stack, Typography, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormHelperText, IconButton, styled, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, useTheme, FormControl, InputAdornment, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Footer from 'src/components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, ChangeEvent } from 'react';
import APIservice from 'src/utils/APIservice';
import Loader1 from '../Loader';
import SearchIcon from "@mui/icons-material/Search";
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
  value: ""
}

function Income() {

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [row, setRow] = useState<number>(10);
  const [incomes, setIncomes] = React.useState<any>([]);;
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [income, setIncome] = React.useState<any>(initialState);
  const [isValueError, setValueError] = useState(false);
  const [ValueErrorMsg, setValueErrorMsg] = useState("");
  const [ischeck, setIsCheck] = useState(false);
  const [isUserError, setUserError] = useState(false);
  const [UserErrorMsg, setUserErrorMsg] = useState("");
  const [errorFlag, setErrorFlag] = useState(false)
  let [search, setSearch] = useState("");

  const navigate = useNavigate();

  // window.onpopstate = () => {
  //   navigate(-1);
  // }

  const reg = new RegExp(/^\d+\s\w+\s-\s\d+\s\w+$/);
  const validateName = (arr: any) => {
    debugger
    const { name, value } = arr.target;
    if (value) {
      if ((reg.test(arr.target.value))) {
        setValueError(false);
        setValueErrorMsg("");
      } else {
        setValueError(true);
        setValueErrorMsg("Alphabet,number & dash is allowed");
      }
    }
    else {
      setValueError(true);
      setValueErrorMsg("Annual income is required");
    }
  }

  const validateForm = (e: any) => {
    e.preventDefault();
    var flag = true;
    if (!income.value) {
      setValueError(true);
      setValueErrorMsg("Annual income is required");
      flag = false;
    } else {
      if ((reg.test(income.value))) {
        setValueError(false);
        setValueErrorMsg("");
        flag = true;
      } else {
        setValueError(true);
        setValueErrorMsg("Alphabet,number & dash is allowed");
        flag = false;
      }
    }
    return flag;
  }

  const handleCloseIncomeDailog = () => {
    setIsOpen(false);
  };

  const handleClickisAdd = async () => {
    setIncome(initialState);
    setValueError(false);
    setValueErrorMsg("");
    setUserError(false)
    setUserErrorMsg('')
    setIsOpen(true);
  };

  const handleClickisEdit = (no: number, st: string) => {
    let obj = {
      id: no,
      value: st
    }
    setIncome(obj);
    setValueError(false);
    setValueErrorMsg("");
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
    setIncome(obj);
    setIsCheck(true);
  };

  const handleSwitchCheck = async () => {
    const token = localStorage.getItem('SessionToken');
    const refreshToken = localStorage.getItem('RefreshToken')
    let obj = {
      "id": income.id,
    }
    const res = await APIservice.httpPost('/api/admin/annualIncome/activeInactiveAnnualIncome', obj, token, refreshToken);
    setIsCheck(false);
    getData((page * limit), limit);
  }

  const IncomeDialog = (arr: any) => {
    const { name, value } = arr.target;
    setIncome({ ...income, [name]: value });
    setIsOpen(true)
    if (errorFlag === true) {
      setUserError(false)
      setErrorFlag(false)
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
          "value": search ? search : ""
        }
        const res = await APIservice.httpPost('/api/admin/annualIncome/getAnnualIncome', obj, token, refreshToken);
        setIncomes(res.recordList);
        setRow(res.totalRecords);
      } else {
        setIsLoading(true);
        const token = localStorage.getItem('SessionToken');
        const refreshToken = localStorage.getItem('RefreshToken');
        let obj = {
          "startIndex": startIndex,
          "fetchRecord": fetchRecord,
        }
        const res = await APIservice.httpPost('/api/admin/annualIncome/getAnnualIncome', obj, token, refreshToken);
        setIncomes(res.recordList);
        setRow(res.totalRecords);
        if (res && res.status == 200) {
          console.log("success");
          setIsOpen(false);
        }
        else if (res.status == 401) {
          localStorage.clear();
          navigate("/");
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

  const saveIncome = async (e: any) => {
    console.log(income);
    var flag = validateForm(e);
    if (flag) {
      try {
        if (income.id) {
          const token = localStorage.getItem('SessionToken');
          const refreshToken = localStorage.getItem('RefreshToken');
          let val = { "id": income.id, "value": income.value }
          const res = await APIservice.httpPost('/api/admin/annualIncome/insertUpdateAnnualIncome', val, token, refreshToken);
          if (res && res.status == 200) {
            console.log("success");
            setIsOpen(false);
            getData((page * limit), limit);
          }
          else if (res.status == 401) {
            localStorage.clear();
            navigate("/");
          }
          else if (res.status == 400) {
            flag = false;
            if (!(flag && errorFlag)) {
              setUserError(true)
              setUserErrorMsg('Annual Income already exists!')
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
        } else {
          const token = localStorage.getItem('SessionToken');
          const refreshToken = localStorage.getItem('RefreshToken');
          const res = await APIservice.httpPost('/api/admin/annualIncome/insertUpdateAnnualIncome', income, token, refreshToken);
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
              setUserErrorMsg('Annual Income  already exists!')
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
        <title>Annual Income</title>
      </Helmet>
      <PageTitleWrapper>
        <Box p={1}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {/* <Typography variant="h3" component="h3" gutterBottom>
                Annual Income
              </Typography> */}
              <Stack alignItems="left" justifyContent="space-between" >
                <Breadcrumbs aria-label="breadcrumb">
                  <Link
                    to="/admin"
                    style={{ display: 'flex', color: "black" }}
                  >
                    <HomeIcon />
                  </Link>
                  <Typography variant="subtitle2" color="inherit" fontWeight="bold" >Annual Income</Typography>
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
                    <AddTwoToneIcon fontSize="small" /> Create Annual Income
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
                      // size="small"
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
              <Card className="incomecard">
                <div>
                  {isLoading ? <Loader1 title="Loading..." /> :
                    <>
                      <Divider />
                      {
                        (incomes && incomes.length > 0) ?
                          <>
                            <TableContainer className="incometableContainer">
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
                                        Annual Income
                                      </Typography>
                                    </TableCell>
                                    <TableCell align='right'  >
                                      <Typography noWrap style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "none" }}>
                                        Actions
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {
                                    incomes
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
                                                {arr.value}
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
                                                  onClick={(e) => handleClickisEdit(arr.id, arr.value)}
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
                          }} className="incomecard">
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
                  <DialogTitle sx={{ m: 0, p: 2, fontSize: "20px", fontWeight: "bolder" }}>{(income.status === 0) ? 'Inactive' : 'Active'}</DialogTitle>
                  <DialogContent>
                    <DialogContentText style={{ fontSize: "1rem", letterSpacing: "0.00938em" }}>
                      {(income.status === 0) ? 'Are you sure you want to Active?' : 'Are you sure you want to Inactive?'}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSwitchCheck}>Yes</Button>
                  </DialogActions>
                </Dialog>
              </div>

              <div>
                <BootstrapDialog open={isOpen} onClose={handleCloseIncomeDailog} PaperProps={{ sx: { height: "40%" } }} fullWidth maxWidth="xs">
                  <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseIncomeDailog}>
                    {income.id ? "Edit Annual Income" : "Add Annual Income"}
                  </BootstrapDialogTitle>
                  <DialogContent dividers>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Annual Income"
                      placeholder="Ex:10 Lakh - 20 Lakh"
                      type="text"
                      fullWidth
                      variant="outlined"
                      name="value"
                      value={income.value}
                      onChange={(arr) => { IncomeDialog(arr); validateName(arr) }}
                      required={true}
                    />
                    <FormHelperText style={{ color: 'red', height: '22px' }}>{isValueError && ValueErrorMsg}</FormHelperText>
                  </DialogContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", p: "8px" }}>
                    <FormHelperText style={{ color: 'red', height: '22px', margin: 'none', padding: "8px 0px" }}>{isUserError && UserErrorMsg}</FormHelperText>
                    <Button onClick={saveIncome}>Save</Button>
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

export default Income;