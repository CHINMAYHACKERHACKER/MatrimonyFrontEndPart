import { Box, Breadcrumbs, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormHelperText, Grid, IconButton, Paper, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography, useTheme } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Helmet } from 'react-helmet-async'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import { Link, useNavigate } from 'react-router-dom';
import APIservice from 'src/utils/APIservice';
import Loader1 from '../Loader';
import '../smallScreen.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    id: 0,
    value: "",
}

const TimeDuration = () => {

    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(10);
    const [row, setRow] = useState<number>(10);
    const [isLoading, setIsLoading] = useState(false)
    const [ischeck, setIsCheck] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isDel, setIsDel] = useState(false)
    const [user, setUser] = useState([])
    const [timeDuration, setTimeDuration] = useState<any>(initialState)
    const [isUserError, setUserError] = useState(false);
    const [UserErrorMsg, setUserErrorMsg] = useState("");
    const [errorFlag, setErrorFlag] = useState(false)
    const [isNameError, setNameError] = useState(false);
    const [NameErrorMsg, setNameErrorMsg] = useState("");

    const navigate = useNavigate()

    const reg = new RegExp("^[0-9]*$");
    const validateName = (arr) => {
        const { name, value } = arr.target;
        if (value) {
            if ((reg.test(arr.target.value))) {
                setNameError(false);
                setNameErrorMsg("");
            } else {
                setNameError(true);
                setNameErrorMsg("Only number is allowed");
            }
        } else {
            setNameError(true);
            setNameErrorMsg("Time duration is required");
        }
    }

    const validateForm = (e: any) => {
        e.preventDefault();
        var flag = true;
        if (!timeDuration.value) {
            setNameError(true);
            setNameErrorMsg("Time duration is required");
            flag = false;
        } else {
            if ((reg.test(timeDuration.value))) {
                setNameError(false);
                setNameErrorMsg("");
                flag = true;
            } else {
                setNameError(true);
                setNameErrorMsg("Only number is allowed");
                flag = false;
            }
        }
        return flag;
    }

    useEffect(() => {
        getData(page, limit)
    }, [])

    const getData = async (startIndex: number, fetchRecord: number) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('SessionToken');
            const refreshToken = localStorage.getItem('RefreshToken');
            let obj = {
                "startIndex": startIndex,
                "fetchRecord": fetchRecord,
            }
            const res = await APIservice.httpPost('/api/admin/timeDuration/getTimeDuration', obj, token, refreshToken);
            setUser(res.recordList);
            setRow(res.totalRecords);

            if (res && res.status === 200) {
                console.log("success")
            }
            else if (res && res.status === 401) {
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
        } catch (error) {
            console.log(error)
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
        setIsLoading(false)
    }

    const handleSwitch = (id: number, status: number) => {
        let obj = {
            'id': id,
            'status': status
        }
        setTimeDuration(obj)
        setIsCheck(true)
    }

    const handleClose = () => {
        setIsCheck(false)
        setIsOpen(false)
        setIsDel(false)
    }

    const handleSwitchCheck = async () => {
        const token = localStorage.getItem('SessionToken');
        const refreshToken = localStorage.getItem('RefreshToken')
        let obj = {
            "id": timeDuration.id,
        }
        const res = await APIservice.httpPost('/api/admin/timeDuration/activeInactiveTimeDuration', obj, token, refreshToken);
        if (res && res.status === 200) {
            toast.error(res.recordList, {
                autoClose: 6000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
        }
        setIsCheck(false);
        getData((page * limit), limit);
    }

    const handleChange = (arr: any) => {
        const { name, value } = arr.target;
        setTimeDuration({ ...timeDuration, [name]: value });
        setIsOpen(true);
        if (errorFlag === true) {
            setUserError(false)
            setUserErrorMsg('')
        }
    }

    const handleClickisAdd = async () => {
        setTimeDuration(initialState);
        setIsOpen(true);
        setNameError(false);
        setNameErrorMsg("");
        setUserError(false)
        setUserErrorMsg('')
    };

    const handleClickisEdit = (no: number, st: number) => {
        let obj = {
            id: no,
            value: st
        }
        setTimeDuration(obj);
        setIsOpen(true);
        setNameError(false);
        setNameErrorMsg("");
        setUserError(false)
        setUserErrorMsg('')
    };

    const saveTimeDuration = async (arr: any) => {
        let flag = validateForm(arr)
        try {
            if (flag) {
                if (timeDuration.id) {
                    const token = localStorage.getItem('SessionToken');
                    const refreshToken = localStorage.getItem('RefreshToken');
                    console.log(token);
                    let val = {
                        "id": timeDuration.id,
                        "value": timeDuration.value
                    }
                    const res = await APIservice.httpPost('/api/admin/timeDuration/insertUpdateTimeDuration', val, token, refreshToken)
                    if (res && res.status === 200) {
                        console.log("success")
                        setIsOpen(false);
                        getData((page * limit), limit);
                    } else if (res && res.status === 401) {
                        navigate('/')
                        localStorage.clear();
                    } else if (res && res.status === 400) {
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
                } else {
                    const token = localStorage.getItem('SessionToken');
                    const refreshToken = localStorage.getItem('RefreshToken');
                    console.log(token);
                    const res = await APIservice.httpPost('/api/admin/timeDuration/insertUpdateTimeDuration', timeDuration, token, refreshToken)
                    if (res && res.status == 200) {
                        getData(0, limit)
                        console.log("success");
                        setPage(0);
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
            }
        } catch (error) {
            console.log(error)
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

    const handleClickisDelete = (id: number) => {
        let obj = {
            id: id
        }
        setTimeDuration(obj);
        setIsDel(true);
    }

    const handleDelete = async () => {
        const token = localStorage.getItem('SessionToken');
        const refreshToken = localStorage.getItem('RefreshToken')
        let obj = {
            "id": timeDuration.id,
        }
        const res = await APIservice.httpPost('/api/admin/timeDuration/deleteTimeDuration', obj, token, refreshToken);
        console.log(res);
        if (res && res.status === 200) {
            toast.error(res.recordList, {
                autoClose: 6000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
        }
        setIsDel(false);
        getData((page * limit), limit);
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
            <Helmet>
                <title>Time Duration</title>
            </Helmet>
            <PageTitleWrapper>
                <Box pt={1.1} pb={1.1} pl={1}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Stack alignItems="left" justifyContent="space-between">
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link
                                        to="/admin"
                                        style={{ display: 'flex', color: "black", }}
                                    >
                                        <HomeIcon />
                                    </Link>
                                    <Typography variant="subtitle2" color="inherit" fontWeight="bold" >Time Duration</Typography>
                                </Breadcrumbs>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <Button
                                className="buttonLarge"
                                sx={{ lineHeight: "2.04" }}
                                variant="contained"
                                onClick={handleClickisAdd}
                                size="small"
                            >
                                <AddTwoToneIcon fontSize="small" />Create Time Duration
                            </Button>
                            <Button
                                className="button"
                                sx={{ lineHeight: "2.04" }}
                                variant="contained"
                                onClick={handleClickisAdd}
                                size="small"
                            >
                                <AddTwoToneIcon fontSize="small" />
                            </Button>
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
                        <Card style={{ height: "calc(100vh - 228px)" }}>
                            <div>
                                {isLoading ? <Loader1 title="Loading..." /> :
                                    <>
                                        <Divider />
                                        {user && user.length > 0 ?
                                            <>
                                                <TableContainer style={{ height: 'calc(100vh - 305px)' }}>
                                                    <Table stickyHeader>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Id</TableCell>
                                                                <TableCell align='left'>Value</TableCell>
                                                                <TableCell align='right' >Actions</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {user.map((arr: any, index: any) => (
                                                                <TableRow
                                                                    hover
                                                                    key={arr.id}>
                                                                    <TableCell>
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
                                                                    <TableCell>
                                                                        <Typography
                                                                            variant="body1"
                                                                            fontWeight="bold"
                                                                            color="text.primary"
                                                                            gutterBottom
                                                                            noWrap
                                                                        >
                                                                            {arr.value} months
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell align="right" sx={{ display: "flex" }}>
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
                                                                        <Tooltip title="Delete" arrow>
                                                                            <IconButton
                                                                                sx={{
                                                                                    '&:hover': { background: theme.colors.error.lighter },
                                                                                    color: theme.palette.primary.main
                                                                                }}
                                                                                color="inherit"
                                                                                size="small"
                                                                                onClick={(e) => handleClickisDelete(arr.id)}
                                                                            >
                                                                                <DeleteIcon fontSize="small" />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
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
                                                height: 'calc(100vh - 305px)'
                                            }}
                                            >
                                                <Typography variant="h5" paragraph>
                                                    Data not Found</Typography>
                                            </Paper>
                                        }
                                    </>
                                }
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <div>
                <Dialog open={ischeck} onClose={handleClose} fullWidth maxWidth="xs">
                    <DialogTitle sx={{ m: 0, p: 2, fontSize: "20px", fontWeight: "bolder" }}>{(timeDuration.status === 0) ? 'Inactive' : 'Active'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ fontSize: "1rem", letterSpacing: "0.00938em" }}>
                            {(timeDuration.status === 0) ? 'Are you sure you want to Active?' : 'Are you sure you want to Inactive?'}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSwitchCheck}>Yes</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog open={isDel} onClose={handleClose} fullWidth maxWidth="xs">
                    <DialogTitle sx={{ m: 0, p: 2, fontSize: "20px", fontWeight: "bolder" }}>Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ fontSize: "1rem", letterSpacing: "0.00938em" }}>
                            Are you sure you want to Delete?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleDelete}>Yes</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog open={isOpen} onClose={handleClose} PaperProps={{ sx: { height: "40%" } }} fullWidth maxWidth="xs">
                    <DialogTitle sx={{ m: 0, p: 2, fontSize: "18px", fontWeight: "bold" }}>
                        {timeDuration.id ? "Edit Time Duration" : "Add Time Duration"}
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 13,
                                top: 13,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Time Duration"
                            type="text"
                            fullWidth
                            variant="outlined"
                            name="value"
                            value={timeDuration.value}
                            onChange={(arr) => { handleChange(arr); validateName(arr) }}
                            required={true}
                        />
                        <FormHelperText style={{ color: 'red', height: '22px' }}>{isNameError && NameErrorMsg}</FormHelperText>
                    </DialogContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", p: "8px" }}>
                        <FormHelperText style={{ color: 'red', height: '22px', margin: "none", padding: "8px" }}>{isUserError && UserErrorMsg}</FormHelperText>
                        <Button onClick={saveTimeDuration}>Save</Button>
                    </Box>
                </Dialog>
            </div>
        </>
    )
}

export default TimeDuration