import { Box, Breadcrumbs, Card, CardContent, Container, Grid, Paper, Stack, Table, TableContainer, TablePagination, Typography } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Helmet } from 'react-helmet-async'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import { Link, useNavigate } from 'react-router-dom';
import APIservice from 'src/utils/APIservice';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../smallScreen.css'
import Loader1 from '../Loader';

const Feedback = () => {
    const [feedback, setFeedback] = useState([]);
    const [isloading, setIsLoading] = React.useState(false);
    const [row, setRow] = useState<number>(10);
    const [page, setPage] = React.useState<number>(0);
    const [limit, setLimit] = React.useState<number>(10);
    const navigate = useNavigate();

    useEffect(() => {
        getdata(page, limit);
    }, [])

    const dateData = localStorage.getItem('DateFormat')

    const getdata = async (startIndex: number, fetchRecord: number) => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('SessionToken');
            const refreshToken = localStorage.getItem('RefreshToken')
            let obj = {
                "startIndex": startIndex,
                "fetchRecord": fetchRecord,
            }
            const res = await APIservice.httpPost('/api/admin/feedback/getFeedback', obj, token, refreshToken);
            setFeedback(res.recordList);
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
            setIsLoading(false)
        }
    }

    const handlePageChange = (event: any, newPage: number): void => {
        setPage(newPage);
        getdata((newPage * limit), limit)
    };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value));
        setPage(0);
        getdata(0, parseInt(event.target.value))
    };

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
                <title>Feedback</title>
            </Helmet>
            <PageTitleWrapper>
                <Box py={1.9} pl={1}>
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
                                    <Typography variant="subtitle2" color="inherit" fontWeight="bold" >Feedback</Typography>
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
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <Card style={{ height: "calc(100vh - 228px)" }}>
                            <div>
                                {isloading ? <Loader1 title="Loading..." /> :
                                    <>
                                        {feedback && feedback.length > 0 ?
                                            <>
                                                <TableContainer style={{ height: "calc(100vh - 305px)" }}>
                                                    <Grid container>
                                                        {
                                                            feedback
                                                                .map((arr: any, index) => {
                                                                    return (
                                                                        <Grid item lg={12} md={12} sm={12} xs={12} key={arr.id} mx={3} mt={3}>
                                                                            <Card style={{ backgroundColor: "#f2f5f9" }}>
                                                                                <CardContent >
                                                                                    <Typography textAlign="start" fontWeight='bold' textTransform="capitalize">{arr.title}</Typography>
                                                                                    <Typography variant='body2' textAlign="justify" sx={{ m: 0.5 }}>
                                                                                        {arr.description.charAt(0).toUpperCase() + arr.description.slice(1)}
                                                                                    </Typography>
                                                                                    <Typography textAlign="end" fontWeight='bold'>~ {arr.userName}</Typography>
                                                                                    <Typography variant="subtitle2" color="rgb(117 120 125 / 70%)" textAlign="end" fontSize="12px">{format(new Date(arr.createdDate), dateData)}</Typography>
                                                                                </CardContent>
                                                                            </Card>
                                                                        </Grid>
                                                                    )
                                                                })}
                                                    </Grid>
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
                                                height: "calc(100vh - 305px)"
                                            }}
                                                className='userProposalcard'
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
        </>
    )
}

export default Feedback