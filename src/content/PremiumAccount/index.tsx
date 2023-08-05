import { Box, Breadcrumbs, Typography, Grid, Stack, Container, Card, CardContent, FormControl, Select, InputLabel, Button, TextField, FormHelperText, MenuItem, useTheme, Chip, Divider, InputAdornment, TableContainer, Tooltip, IconButton, Switch, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tab, CardHeader, Paper, Tabs, } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import HomeIcon from '@mui/icons-material/Home';
import PercentIcon from '@mui/icons-material/Percent';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import Text from 'src/components/Text';
import Loader1 from '../Loader';
import APIservice from 'src/utils/APIservice';
import { Col, Row, } from 'react-bootstrap';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../smallScreen.css'
import { TrainRounded } from '@mui/icons-material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const initialState = {
    id: 0,
    name: "",
    baseAmount: "",
    facility: "",
    premiumFacilityId: "",
    duration: "",
    discount: "",

}

const PremiumAccount = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = useState('0');
    const [ischeck, setIsCheck] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isDel, setIsDel] = useState(false)
    const [premiumAccount, setPremiumAccount] = useState<any>(initialState)
    const [user, setUser] = useState<any>([]);
    const [premiumFacility, setPremiumFacility] = useState<any>([]);
    const [duration, setDuration] = useState<any>([]);
    const [timeDuration, setTimeDuration] = useState<any>([]);
    const [isValueError, setIsValueError] = useState(false)
    const [isValueErrorMsg, setIsValueErrorMsg] = useState("")
    const [isNameError, setIsNameError] = useState(false)
    const [isNameErrorMsg, setIsNameErrorMsg] = useState("")
    const [isNumError, setIsNumError] = useState(false)
    const [isNumErrorMsg, setIsNumErrorMsg] = useState("")
    const [isFacilityError, setIsFacilityError] = useState(false)
    const [isFacilityErrorMsg, setIsFacilityErrorMsg] = useState("")
    const [isDurationError, setIsDurationError] = useState(false)
    const [isDurationErrorMsg, setIsDurationErrorMsg] = useState("")
    const [isUserError, setUserError] = useState(false);
    const [UserErrorMsg, setUserErrorMsg] = useState("");
    const [premium, setPremium] = useState<any>([]);

    const navigate = useNavigate();

    const reg = new RegExp(/^\d+\.?\d*$/);
    const validateDecimalNumber = (arr: any) => {
        const { name, value } = arr.target;
        if (value) {
            if ((reg.test(arr.target.value))) {
                setIsValueError(false);
                setIsValueErrorMsg("");
            } else {
                setIsValueError(true);
                setIsValueErrorMsg("Only Number with one decimal point");
            }
        } else {
            setIsValueError(true);
            setIsValueErrorMsg("Discount is required");
        }
    }

    const reg2 = new RegExp(/^[a-zA-Z_ ]+$/);
    const ValidateName = (arr) => {
        const { name, value } = arr.target;
        if (value) {
            if ((reg2.test(arr.target.value))) {
                setIsNameError(false);
                setIsNameErrorMsg("");
            } else {
                setIsNameError(true);
                setIsNameErrorMsg("Alphabet and space allowed");
            }
        } else {
            setIsNameError(true);
            setIsNameErrorMsg("Name is required");
        }
    }

    const reg1 = new RegExp("^[0-9]*$")
    const validateNumber = (arr: any) => {
        const { name, value } = arr.target;
        if (value) {
            if ((reg1.test(arr.target.value))) {
                setIsNumError(false);
                setIsNumErrorMsg("")
            } else {
                setIsNumError(true);
                setIsNumErrorMsg("Only number is allowed")
            }
        } else {
            setIsNumError(true);
            setIsNumErrorMsg("Base amount is required")
        }
    }

    const validateDuration = (arr: any) => {
        const { name, value } = arr.target;
        if (value) {
            setIsDurationError(false);
            setIsDurationErrorMsg("")
        } else {
            setIsDurationError(true)
            setIsDurationErrorMsg("Time duration is required")
        }
    }

    const validateFacility = (arr: any) => {
        const { name, value } = arr.target;
        if (value) {
            setIsFacilityError(false);
            setIsFacilityErrorMsg("")
        } else {
            setIsFacilityError(true)
            setIsFacilityErrorMsg("Premium facility is required")
        }
    }

    const validateForm = (e: any) => {
        e.preventDefault();
        var flag = true;
        if (!premiumAccount.discount) {
            setIsValueError(true);
            setIsValueErrorMsg("Discount is required");
            flag = false;
        } else {
            if ((reg.test(premiumAccount.discount))) {
                setIsValueError(false);
                setIsValueErrorMsg("");
            } else {
                setIsValueError(true);
                setIsValueErrorMsg("Only number with one decimal point ");
                flag = false;
            }
        }
        if (premiumAccount.name) {
            setIsNameError(false);
            setIsNameErrorMsg("");
        } else {
            setIsNameError(true);
            setIsNameErrorMsg("Name is required");
            flag = false;
        }
        if (!premiumAccount.baseAmount) {
            setIsNumError(true);
            setIsNumErrorMsg("Base amount is required")
            flag = false;
        } else {
            if (reg1.test(premiumAccount.baseAmount)) {
                setIsNumError(false);
                setIsNumErrorMsg("")
            } else {
                setIsNumError(true);
                setIsNumErrorMsg("Only number is allowed")
                flag = false;
            }
        }
        if (!premiumAccount.facility) {
            setIsFacilityError(true)
            setIsFacilityErrorMsg("Premium facility is required")
            flag = false
        } else {
            setIsFacilityError(false);
            setIsFacilityErrorMsg("")
        }
        if (!premiumAccount.duration) {
            setIsDurationError(true)
            setIsDurationErrorMsg("Time duration is required")
            flag = false
        } else {
            setIsDurationError(false)
            setIsDurationErrorMsg("")
        }
        return flag
    }

    const handleChange1 = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleClose = () => {
        setIsCheck(false)
        setIsOpen(false)
        setIsDel(false)
    }

    const handleSwitch = (id: number, status: number) => {
        let obj = {
            'id': id,
            'status': status
        }
        setPremiumAccount(obj)
        setIsCheck(true)
    }

    const handleSwitchCheck = async () => {
        const token = localStorage.getItem('SessionToken');
        const refreshToken = localStorage.getItem('RefreshToken')
        let obj = {
            "id": premiumAccount.id,
        }
        const res = await APIservice.httpPost('/api/admin/package/activeInactivePackage', obj, token, refreshToken);
        setIsCheck(false);
        await getData();
    }

    const handleOpenDeleteDialog = (arr: any, arr1: any) => {
        let obj = {
            id: arr,
            packageDurationId: arr1
        }
        setPremiumAccount(obj)
        setIsDel(true);
    }

    const handleIsDeleteDialog = async () => {
        const token = localStorage.getItem('SessionToken');
        const refreshToken = localStorage.getItem('RefreshToken')
        let obj = {
            "id": premiumAccount.id,
            "packageDurationId": premiumAccount.packageDurationId
        }
        const res = await APIservice.httpPost('/api/admin/package/deletePackage', obj, token, refreshToken);
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
        getData();
    }

    const handleAddToOpenDialog = () => {
        setIsNameError(false);
        setIsNameErrorMsg("");
        setIsNumError(false);
        setIsNumErrorMsg("")
        setIsValueError(false);
        setIsValueErrorMsg("");
        setUserError(false)
        setUserErrorMsg('')
        setIsFacilityError(false);
        setIsFacilityErrorMsg("")
        setIsDurationError(false);
        setIsDurationErrorMsg("")
        setPremiumAccount(initialState)
        setIsOpen(true)
        setPremiumFacility([])
        setDuration([])
    }

    const handleEditToOenDialog = (id: number, str: string, no: number, str1: any, no1: any, str2: any) => {
        //for facility to add in edit dialog
        let facility = [];
        if (str2 && str2.length) {
            for (let index = 0; index < str2.length; index++) {
                let data = {
                    'premiumFacilityId': str2[index],
                    "name": premium.find(c => c.id == str2[index]).name
                }
                facility.push(data);
            }
            setPremiumFacility(facility)
        } else {
            setPremiumFacility([])

        }
        // if(str1 && no1.length){
        //     setDuration(duration)
        // } else {
        //     setDuration([])
        // }
        let obj = {
            id: id,
            name: str,
            baseAmount: no,
            duration: str1,
            discount: no1,
            facility: str2,
        }
        setPremiumAccount(obj);
        setIsOpen(true);
        setIsNameError(false);
        setIsNameErrorMsg("");
        setIsValueError(false);
        setIsValueErrorMsg("");
        setUserError(false)
        setUserErrorMsg('')
        setIsFacilityError(false);
        setIsFacilityErrorMsg("")
        setIsDurationError(false);
        setIsDurationErrorMsg("")
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setPremiumAccount({
            ...premiumAccount,
            [name]: value,
        });
    }

    useEffect(() => {
        getData();
        getTimeDuration();
        getPremiumFacility();
    }, [])

    const getData = async () => {
        try {
            setIsLoading(true)
            const token = localStorage.getItem('SessionToken');
            const refreshToken = localStorage.getItem('RefreshToken');
            const res = await APIservice.httpPost('/api/admin/package/getpackage', {}, token, refreshToken)
            setUser(res.recordList)
            if (res.status === 200) {
                console.log("success")
            }
            else if (res && res.status === 401) {
                navigate("/")
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
            setIsLoading(false)
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
        setIsLoading(false)
    }

    const getPremiumFacility = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('SessionToken');
            const refreshToken = localStorage.getItem('RefreshToken');
            const res = await APIservice.httpPost('/api/admin/premiumFacility/getPremiumFacility', {}, token, refreshToken);
            setPremium(res.recordList)
            if (res && res.status === 200) {
                console.log("success")
            }
            else if (res && res.status === 401) {
                localStorage.clear();
                navigate("/");
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
        setIsLoading(false)
    }

    const handleAddFacility = async () => {
        let facility = [];
        if (premiumAccount.facility && premiumAccount.facility.length > 0) {
            for (let index = 0; index < premiumAccount.facility.length; index++) {
                let data = {
                    'premiumFacilityId': premiumAccount.facility[index],
                    "name": premium.find(c => c.id == premiumAccount.facility[index]).name
                }
                facility.push(data);
            }
            setPremiumFacility(facility)
            console.log(premiumFacility)
        }
    }

    const handleDeleteFaciliity = (e: any) => {
        const data = premiumFacility.filter((d: any) => d.premiumFacilityId !== e.premiumFacilityId)
        setPremiumFacility(data);
        console.log(premiumAccount.facility)
        let data1 = premiumAccount.facility.filter((d: any) => d !== e.premiumFacilityId);
        let obj = {
            "facility": data1
        }
        setPremiumAccount(obj)
        console.log(premiumAccount)
        handleEditToOenDialog(premiumAccount.id, premiumAccount.name, premiumAccount.baseAmount, premiumAccount.duration, premiumAccount.discount, data1)
    }

    const getTimeDuration = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('SessionToken');
            const refreshToken = localStorage.getItem('RefreshToken');
            const res = await APIservice.httpPost('/api/admin/timeDuration/getTimeDuration', {}, token, refreshToken);
            setTimeDuration(res.recordList);
            if (res && res.status === 200) {
                console.log("success")
            }
            else if (res && res.status === 401) {
                localStorage.clear();
                navigate("/");
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
        setIsLoading(false)
    }

    const handleAddDuration = () => {
        let dataDuration = [];
        if (premiumAccount.duration && premiumAccount.discount) {
            let data = {
                'timeDurationId': premiumAccount.duration,
                "value": timeDuration.find(c => c.id == premiumAccount.duration).value,
                "discount": premiumAccount.discount
            }
            dataDuration.push(data);
            let ind = duration.findIndex((c: any) => c.timeDurationId === premiumAccount.duration)
            if (ind > -1) {
                setUserError(true)
                setUserErrorMsg("Enter month already exists");
            } else {
                let data1 = [...duration, ...dataDuration]
                setDuration(data1)
                setUserError(true)
                setUserErrorMsg("");
            }
        } else {
            setUserError(true)
            setUserErrorMsg("Select both time duration and discount");
        }
    }

    const handleDeleteDuration = (e: any) => {
        const data = duration.filter((d: any) => d.timeDurationId !== e.timeDurationId)
        setDuration(data)
        if (e.timeDurationId === premiumAccount.duration) {
            premiumAccount.duration = ""
            // setPremiumAccount(premiumAccount.duration)
            console.log(premiumAccount)
        }
        if (e.discount === premiumAccount.discount) {
            premiumAccount.discount = ""
            // setPremiumAccount(premiumAccount.discount)
            console.log(premiumAccount)
        }
    }

    const savePremiumAccount = async (e: any) => {
        let flag = validateForm(e)
        if (flag && premiumFacility.length && premiumAccount.discount.length || duration.length) {
            try {
                if (premiumAccount.id) {
                    const token = localStorage.getItem('SessionToken')
                    const refreshToken = localStorage.getItem('RefreshToken');
                    let obj = {
                        "id": premiumAccount.id,
                        "name": premiumAccount.name,
                        "baseAmount": premiumAccount.baseAmount,
                        "facility": premiumFacility,
                        "timeDurationId": premiumAccount.duration,
                        "discount": premiumAccount.discount
                    }
                    const res = await APIservice.httpPost('/api/admin/package/updatePackage', obj, token, refreshToken)
                    if (res && res.status === 200) {
                        console.log("success")
                        setIsOpen(false)
                        getData();
                    } else if (res && res.status === 401) {
                        navigate('/')
                        localStorage.clear();
                    } else if (res && res.status === 500) {
                        setUserError(true)
                        setUserErrorMsg(res.message)
                    } else if (res && res.status === 400) {
                        setUserError(true)
                        setUserErrorMsg(res.message)
                    } else if (res && res.status === 300) {
                        setUserError(true)
                        setUserErrorMsg(res.message)
                    }
                } else {
                    let val = {
                        id: premiumAccount.id,
                        name: premiumAccount.name,
                        baseAmount: premiumAccount.baseAmount,
                        facility: premiumFacility,
                        duration: duration
                    }
                    const token = localStorage.getItem('SessionToken')
                    const refreshToken = localStorage.getItem('RefreshToken');

                    const res = await APIservice.httpPost('/api/admin/package/insertPackage', val, token, refreshToken)
                    if (res && res.status == 200) {
                        console.log("success");
                        setIsOpen(false)
                        getData();
                    }
                    else if (res.status == 401) {
                        navigate("/");
                        localStorage.clear();
                    } else if (res && res.status === 500) {
                        setUserError(true)
                        setUserErrorMsg(res.message)
                    } else if (res && res.status === 400) {
                        setUserError(true)
                        setUserErrorMsg(res.message)
                    } else if (res && res.status === 300) {
                        setUserError(true)
                        setUserErrorMsg(res.message)
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
        } else {
            setUserError(true)
            setUserErrorMsg("Please click on add button to insert premium facility and time duration")
        }
    }

    const theme = useTheme();

    return (
        <div>
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
                <title>Premium Account</title>
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
                                    <Typography variant="subtitle2" color="inherit" fontWeight="bold" >Premium Account</Typography>
                                </Breadcrumbs>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <Button
                                className="buttonLarge"
                                sx={{ lineHeight: "2.04" }}
                                variant="contained"
                                onClick={handleAddToOpenDialog}
                                size="small"
                            >
                                <AddTwoToneIcon fontSize="small" />Create Premium Account
                            </Button>
                            <Button
                                className="button"
                                sx={{ lineHeight: "2.04" }}
                                variant="contained"
                                onClick={handleAddToOpenDialog}
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
                            <Box sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', padding: '16px', paddingLeft: "16px", overflowX: "auto" }}>
                                        <TabList
                                            onChange={handleChange1}
                                            variant="scrollable"
                                            // scrollButtons
                                            // allowScrollButtonsMobile
                                            aria-label="scrollable force tabs example"
                                        >
                                            {user.map((arr: any, index: number) => (
                                                <Tab label={arr.value + " months"} value={index + ""} key={arr.id} />
                                            ))}
                                        </TabList>
                                    </Box>
                                    <TableContainer style={{ height: "calc(100vh - 305px)" }} >
                                        {user.map((arr: any, index: number) => (
                                            <TabPanel value={index + ""} key={arr.id}>
                                                <div>
                                                    {isLoading ? <Loader1 title="Loading..." /> :
                                                        <>
                                                            {arr.package && arr.package.length > 0 ?
                                                                <Grid container>
                                                                    {arr.package.map((data: any, dIndex: number) => (
                                                                        <Grid item xs={12} sm={6} md={3} lg={4} key={data.id}>
                                                                            <Card sx={{ m: 2, height: "400px" }} >
                                                                                <CardContent sx={{ height: "350px" }}>
                                                                                    <Typography variant="body1" gutterBottom style={{ padding: "16px", fontSize: "17px", fontWeight: "bold" }}>{data.name}</Typography>
                                                                                    {data.discount ?
                                                                                        <>
                                                                                            <Box
                                                                                                sx={{
                                                                                                    display: 'flex',
                                                                                                    alignItems: 'center',
                                                                                                    justifyContent: 'center',
                                                                                                    pt: 1
                                                                                                }}
                                                                                            >
                                                                                                <Typography
                                                                                                    variant="h3"
                                                                                                    sx={{
                                                                                                        pr: 1,
                                                                                                    }}
                                                                                                >₹{(data.baseAmount * data.value) - (data.baseAmount * data.value * (data.discount / 100))}
                                                                                                </Typography>
                                                                                                <Text color="success">
                                                                                                    <b>-{data.discount}%</b>
                                                                                                </Text>
                                                                                            </Box>
                                                                                            <Typography sx={{ color: "red", textDecoration: "line-through", fontWeight: "bold", textAlign: "center", ml: "-68px" }}>₹{data.baseAmount * data.value}</Typography>
                                                                                        </>
                                                                                        :
                                                                                        <Box
                                                                                            sx={{
                                                                                                display: 'flex',
                                                                                                alignItems: 'center',
                                                                                                justifyContent: 'center',
                                                                                                py: 1
                                                                                            }}
                                                                                        >
                                                                                            <Typography
                                                                                                variant="h3"
                                                                                                sx={{
                                                                                                    pr: 4,
                                                                                                    mb: 1,
                                                                                                    // textDecoration:"line-through"
                                                                                                }}
                                                                                            >{(data.baseAmount * data.value)} ₹</Typography>
                                                                                        </Box>

                                                                                    }
                                                                                    <Typography sx={{ pt: 3, fontWeight: "bold" }}>Our packages includes all the below given facilities so you can start making bonds.</Typography>

                                                                                    {data.facility.map((facilities: any) => (
                                                                                        <>
                                                                                            <Typography key={facilities.id} style={{ marginTop: "10px" }}>
                                                                                                <TripOriginIcon style={{ fontSize: "12px" }} /> {facilities.name}
                                                                                            </Typography>
                                                                                        </>
                                                                                    ))}
                                                                                </CardContent>
                                                                                <DialogActions>
                                                                                    <Tooltip
                                                                                        title={(data.isActive === 0) ? "Inactive" : "Active"}
                                                                                        arrow>
                                                                                        <Switch
                                                                                            checked={data.isActive === 0 ? false : true}
                                                                                            onClick={(e) => handleSwitch(data.id, data.isActive)}
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
                                                                                            onClick={(e) => handleEditToOenDialog(data.id, data.name, data.baseAmount, data.timeDurationId, data.discount, data.facility.map((val: any) => val.premiumFacilityId))}
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
                                                                                            onClick={(e) => handleOpenDeleteDialog(data.id, data.packageDurationId)}
                                                                                        >
                                                                                            <DeleteIcon fontSize="small" />
                                                                                        </IconButton>
                                                                                    </Tooltip>
                                                                                </DialogActions>
                                                                            </Card>
                                                                        </Grid>
                                                                    ))}
                                                                </Grid>
                                                                :
                                                                <Paper sx={{
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    textAlign: "center",
                                                                    verticalAlign: "middle",
                                                                    boxShadow: 'none',
                                                                }}
                                                                    style={{ height: "calc(100vh - 359px)" }}
                                                                >
                                                                    <Typography variant="h5" paragraph>
                                                                        Data not Found</Typography>
                                                                </Paper>
                                                            }
                                                        </>
                                                    }
                                                </div>
                                            </TabPanel>
                                        ))}
                                    </TableContainer>
                                </TabContext>
                            </Box>
                            {/* </CardContent> */}
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <div>
                <Dialog open={ischeck} onClose={handleClose} fullWidth maxWidth="xs">
                    <DialogTitle sx={{ m: 0, p: 2, fontSize: "20px", fontWeight: "bolder" }}>{(premiumAccount.status === 0) ? 'Inactive' : 'Active'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ fontSize: "1rem", letterSpacing: "0.00938em" }}>
                            {(premiumAccount.status === 0) ? 'Are you sure you want to Active?' : 'Are you sure you want to Inactive?'}
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
                        <Button onClick={handleIsDeleteDialog}>Yes</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
                    <DialogTitle sx={{ m: 0, p: 2, fontSize: "18px", fontWeight: "bold" }}>
                        {premiumAccount.id ? "Edit Premium Account" : "Add Premium Account"}
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
                        <Row>
                            <Col sm>
                                <TextField fullWidth margin="dense"
                                    label="Name" type="text"
                                    variant="outlined" required={true}
                                    name="name"
                                    value={premiumAccount.name} onChange={(e: any) => { handleChange(e); ValidateName(e) }}
                                />
                                <FormHelperText style={{ color: 'red', height: '22px' }}>{isNameError && isNameErrorMsg}</FormHelperText>
                            </Col>
                            <Col sm>
                                <TextField fullWidth margin="dense"
                                    label="Base Amount" type="text"
                                    variant="outlined" required={true}
                                    name="baseAmount"
                                    value={premiumAccount.baseAmount}
                                    onChange={(e) => { validateNumber(e); handleChange(e) }} />
                                <FormHelperText style={{ color: 'red', height: '22px' }}>{isNumError && isNumErrorMsg}</FormHelperText>
                            </Col>
                        </Row>
                        <Card sx={{ my: 1 }}>
                            <CardHeader
                                title="Premium Facility" />
                            <Row style={{ paddingLeft: "2%", paddingRight: "2%" }}>
                                <Col sm>
                                    <FormControl sx={{ width: { lg: 265, md: 265, sm: 265, xs: 200 } }} >
                                        <InputLabel id="demo-multiple-name-label">Premium Facility</InputLabel>
                                        <Select
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            multiple={true}
                                            name="facility"
                                            value={premiumAccount.facility || []}
                                            onChange={(e) => { handleChange(e); validateFacility(e) }}
                                            label="Premium Facility"
                                            MenuProps={MenuProps}
                                            required={true}
                                        >
                                            {premium.map((arr: any) => (
                                                <MenuItem key={arr.id} value={arr.id}>{arr.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormHelperText style={{ color: 'red', height: '22px' }}>{isFacilityError && isFacilityErrorMsg}</FormHelperText>
                                </Col>
                                <Col sm >
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Button
                                            sx={{ mt: 0.5 }}
                                            variant="outlined"
                                            onClick={handleAddFacility}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: "9px" }}>
                                {premiumFacility.map((arr: any) => (
                                    <Col lg={3} md={4} sm={6} xs={12} key={arr.premiumFacilityId} style={{ paddingLeft: "4%", paddingTop: "1.4%", paddingBottom: "1.4%" }}>
                                        <Chip label={arr.name} onDelete={(e) => { handleDeleteFaciliity(arr) }} >{arr.name}</Chip>
                                    </Col>
                                ))}
                            </Row>
                            {/* <Divider /> */}
                        </Card>
                        <Card sx={{ my: 4 }}>
                            <CardHeader
                                title="Time Duration & Discount" />
                            <Row style={{ paddingLeft: "2%", paddingRight: "2%" }}>
                                <Col lg={4} md={4} sm={4} xs={12}>
                                    {premiumAccount.id ?
                                        <FormControl fullWidth style={{ marginTop: "8px", marginBottom: "4px" }}>
                                            <InputLabel id="demo-multiple-checkbox-label">Time Duration</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="duration"
                                                value={premiumAccount.duration}
                                                onChange={handleChange}
                                                label="Time Duration"
                                                required={true}
                                                disabled={true}
                                            >
                                                {timeDuration.map((option: any) => (
                                                    <MenuItem value={option.id} key={option.id}>{option.value} months</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        :
                                        <>
                                            <FormControl fullWidth style={{ marginTop: "8px", marginBottom: "4px" }}>
                                                <InputLabel id="demo-multiple-checkbox-label">Time Duration</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name="duration"
                                                    value={premiumAccount.duration}
                                                    onChange={(e) => { handleChange(e); validateDuration(e) }}
                                                    label="Time Duration"
                                                    required={true}
                                                >
                                                    {timeDuration.map((option: any) => (
                                                        <MenuItem value={option.id} key={option.id}>{option.value} months</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormHelperText style={{ color: 'red', height: '22px' }}>{isDurationError && isDurationErrorMsg}</FormHelperText>
                                        </>
                                    }
                                </Col>
                                <Col lg={4} md={4} sm={4} xs={12}>
                                    <FormControl >
                                        <TextField
                                            fullWidth
                                            margin="dense"
                                            id="name"
                                            label="Discount"
                                            type="text"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <PercentIcon />
                                                    </InputAdornment>
                                                )
                                            }}
                                            required={true}
                                            name="discount"
                                            value={premiumAccount.discount ? premiumAccount.discount : ""}
                                            onChange={(e) => { validateDecimalNumber(e); handleChange(e) }} />
                                        <FormHelperText style={{ color: 'red', height: '22px' }}>{isValueError && isValueErrorMsg}</FormHelperText>
                                    </FormControl>
                                </Col>
                                {!premiumAccount.id &&
                                    <Col lg={4} md={4} sm={4} xs={12} >
                                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <Button
                                                // size="small"
                                                sx={{ mt: 1.5 }}
                                                variant="outlined"
                                                onClick={handleAddDuration}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    </Col>
                                }
                            </Row>
                            <Row style={{ marginBottom: "9px" }}>
                                {duration.map((arr: any) => (
                                    <Col lg={4} md={4} sm={6} xs={12} key={arr.timeDurationId} style={{ paddingLeft: "4%", paddingTop: "1.4%", paddingBottom: "1.4%" }}>
                                        <Chip label={arr.value + " months" + "," + arr.discount + "%"} onDelete={(e) => { handleDeleteDuration(arr) }} style={{ width: "136px", maxWidth: "none" }} />
                                        {/* {arr.discount ? <Chip label={arr.discount + "%"} onDelete={(e) => { handleDeleteDuration(arr.timeDurationId) }}>{arr.discount}</Chip> : " "} */}
                                    </Col>
                                ))}
                            </Row>
                        </Card>
                    </DialogContent>
                    <DialogContent sx={{ display: "flex", justifyContent: "space-between", p: "8px" }}>
                        <FormHelperText style={{ color: 'red', height: '22px', margin: "none", padding: "8px" }}>{isUserError && UserErrorMsg}</FormHelperText>
                        <Button onClick={savePremiumAccount}>
                            Save
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default PremiumAccount;