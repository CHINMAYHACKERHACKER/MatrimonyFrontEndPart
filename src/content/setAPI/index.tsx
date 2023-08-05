import { ChangeEvent, useEffect, useState } from "react";
import { Box, Breadcrumbs, Button, Card, CardContent, Container, Grid, TableContainer, Typography, Stack, Tooltip, Switch, TextField, IconButton, InputAdornment } from "@mui/material";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import APIservice from "src/utils/APIservice";
import HomeIcon from '@mui/icons-material/Home';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Tab from '@mui/material/Tab';
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader1 from '../Loader';

const Setting = () => {
  const [list, setList] = useState<any[]>([]);
  const [groupflag, setGroupFlag] = useState([]);
  const [value, setValue] = useState('0');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  // window.onpopstate = () => {
  //   navigate(-1);
  // }

  useEffect
    (() => {
      getData();
    }, []);

  const getData = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('SessionToken');
    const refreshToken = localStorage.getItem('RefreshToken')
    let response = await APIservice.httpPost('/api/admin/systemflags/getAdminSystemFlag', {}, token, refreshToken);
    setList(response.recordList);
    let data = response.recordList[0].systemFlag[0].value
    localStorage.setItem("DateFormat",data)
    setIsLoading(false);
  }

  const handleflagChange = (e: ChangeEvent<HTMLInputElement>, flagGroup: any, childGroup: any) => {
    //let flagGroup = JSON.parse(JSON.stringify(list));
    let fGroups = JSON.parse(JSON.stringify(list));
    if (flagGroup && flagGroup.id) {
      let ind = fGroups.findIndex(c => c.id == flagGroup.id);
      if (ind >= 0) {
        if (childGroup && childGroup.id) {
          let cInd = fGroups[ind].group.findIndex(c => c.id == childGroup.id);
          if (cInd >= 0) {
            let sInd = fGroups[ind].group[cInd].systemFlag.findIndex(c => c.id == e.target.name);
            if (sInd >= 0) {
              if (fGroups[ind].group[cInd].systemFlag[sInd].valueTypeId === 7) {
                // let res = fGroups[ind].group[cInd].systemFlag[sInd].value
                // res === 0 ? 1 : 0 
                (fGroups[ind].group[cInd].systemFlag[sInd].value) = !parseInt(fGroups[ind].group[cInd].systemFlag[sInd].value)
                console.log(parseInt(fGroups[ind].group[cInd].systemFlag[sInd].value))
              } else {
                fGroups[ind].group[cInd].systemFlag[sInd].value = e.target.value;
              }
            }
          }
        } else {
          let sInd = fGroups[ind].systemFlag.findIndex(c => c.id == e.target.name);
          if (sInd >= 0) {
            fGroups[ind].systemFlag[sInd].value = e.target.value;
          }
        }
      }
    }
    setList(fGroups);
    
    // let values = JSON.parse(JSON.stringify(flags));
    // let index = values.findIndex(c => c.id == e.target.name);
    // if (index >= 0) {
    //   setFlags([]);
    //   values[index].value = e.target.value;
    //   setFlags(values);
    // }
  };

  // const handlegroupflagChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   let val = JSON.parse(JSON.stringify(groupflag));
  //   let index = val.findIndex(x => x.id == e.target.name);
  //   if (index >= 0) {
  //     setGroupFlag([]);
  //     val[index].value = e.target.value;
  //     setGroupFlag(val);
  //     console.log(val);
  //   }
  // };

  const handleClick = async (e: any) => {
    const token = localStorage.getItem('SessionToken');
    const refreshToken = localStorage.getItem('RefreshToken')
    let nameList = new Array<string>();
    let valueList = new Array<string>();
    // if (groupflag && groupflag.length) {
    //   for (const element of groupflag) {
    //     nameList.push(element.name);
    //     valueList.push(element.value);
    //   }
    // }
    for (let i = 0; i < list.length; i++) {
      if (list[i].systemFlag && list[i].systemFlag.length > 0) {
        for (let k = 0; k < list[i].systemFlag.length; k++) {
          nameList.push(list[i].systemFlag[k].name);
          valueList.push(list[i].systemFlag[k].value);
          localStorage.setItem("DateFormat", valueList[0])
        }
      }
      if (list[i].group && list[i].group.length > 0) {
        for (let j = 0; j < list[i].group.length; j++) {
          if (list[i].group[j].systemFlag && list[i].group[j].systemFlag.length > 0) {
            for (let k = 0; k < list[i].group[j].systemFlag.length; k++) {
              if (list[i].group[j].systemFlag[k].valueTypeId === 7) {
                nameList.push(list[i].group[j].systemFlag[k].name);
                // list[i].group[j].systemFlag[k].value = !list[i].group[j].systemFlag[k].value
                valueList.push(list[i].group[j].systemFlag[k].value);
              }
              else {
                nameList.push(list[i].group[j].systemFlag[k].name);
                valueList.push(list[i].group[j].systemFlag[k].value);
              }
            }
          }
        }
      }

    }
    let obj = {
      "nameList": nameList,
      "valueList": valueList
    }
    let response = await APIservice.httpPost('/api/admin/systemflags/updateSystemFlagByName', obj, token, refreshToken);
    getData();
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <PageTitleWrapper>
        <Box py={1.9} pl={1}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack alignItems="left" justifyContent="space-between" >
                <Breadcrumbs aria-label="breadcrumb">
                  <Link
                    to="/admin"
                    style={{ display: 'flex', color: "black" }}
                  >
                    <HomeIcon />
                  </Link>
                  <Typography variant="subtitle2" color="inherit" fontWeight="bold">Setting</Typography>
                </Breadcrumbs>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </PageTitleWrapper>
      <div>
        <div  >
          <Container maxWidth="lg">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} >
                <Card style={{ height: "calc(100vh - 228px)" }}>
                  <CardContent>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                      <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', padding: '16px', paddingLeft: "0px",overflowX:"auto"}}>
                          <TabList onChange={handleChange} aria-label="lab API tabs example">
                            {list.map((resp: any, index: number) => (
                              <Tab key={index} label={resp.flagGroupName} value={index + ""} />
                            ))}
                          </TabList>
                        </Box>
                        <div>
                          {isLoading ? <Loader1 title="Loading..." /> :
                            <>
                              <TableContainer style={{ height: "calc(100vh - 387.1px)" }}>
                                {list.map((resp: any, index: number) => (
                                  <TabPanel key={index} value={index + ""} className="p-0">
                                    <div className="mt-3">
                                      {resp.systemFlag.map((sysflag: any, sIndex: number) => (
                                        <div className="mb-3" key={sysflag.id}>
                                          <label className="form-label text-capitalize"
                                          >
                                            {sysflag.displayName}
                                          </label>
                                          {sysflag.valueTypeId == 1 &&
                                            <input
                                              type="text"
                                              className="form-control"
                                              required
                                              name={sysflag.id}
                                              onChange={(e) => handleflagChange(e, resp, null)}
                                              value={sysflag.value}
                                            />
                                          }
                                          {sysflag.valueTypeId == 2 &&
                                            <input
                                              type="number"
                                              className="form-control"
                                              required
                                              name={sysflag.id}
                                              onChange={(e) => handleflagChange(e, resp, null)}
                                              value={sysflag.value}
                                            />
                                          }
                                          {sysflag.valueTypeId == 3 &&
                                            <Form.Select name={sysflag.id} value={sysflag.value} onChange={(e: any) => handleflagChange(e, resp, null)}>
                                              {sysflag.valueList.split(';').map((arr: any) => (
                                                <option key={arr} value={arr}>{arr}</option>
                                              ))}
                                            </Form.Select>
                                          }
                                          {sysflag.valueTypeId == 4 &&
                                            <input
                                              type="text"
                                              className="form-control"
                                              required
                                              name={sysflag.id}
                                              onChange={(e) => handleflagChange(e, resp, null)}
                                              value={sysflag.value}
                                            />
                                          }
                                          {sysflag.valueTypeId == 5 &&
                                            <input
                                              type="text"
                                              className="form-control"
                                              required
                                              name={sysflag.id}
                                              onChange={(e) => handleflagChange(e, resp, null)}
                                              disabled={true}
                                              value={sysflag.value}
                                            />
                                          }
                                          {sysflag.valueTypeId == 6 &&
                                            <input
                                              type="email"
                                              className="form-control"
                                              required
                                              name={sysflag.id}
                                              onChange={(e) => handleflagChange(e, resp, null)}
                                              value={sysflag.value}
                                            />
                                          }
                                          {sysflag.valueTypeId == 7 &&
                                            <>
                                              {sysflag.value === '1' ?
                                                <Tooltip title={(sysflag.value === '0') ? "Inactive" : "Active"} arrow>
                                                  <Switch
                                                    name={sysflag.id}
                                                    value={sysflag.value}
                                                    checked={sysflag.value === '1'}
                                                    onChange={(e: any) => handleflagChange(e, resp, null)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                  />
                                                </Tooltip>
                                                :
                                                <Tooltip title={(sysflag.value === '0') ? "Inactive" : "Active"} arrow>
                                                  <Switch
                                                    name={sysflag.id}
                                                    value={sysflag.value}
                                                    // checked={sysflag.isActive}
                                                    onChange={(e: any) => handleflagChange(e, resp, null)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                  />
                                                </Tooltip>
                                              }
                                            </>
                                          }
                                          {sysflag.valueTypeId == 8 &&
                                            <InputGroup>
                                              <Form.Control
                                                type={showPassword === true ? 'text' : 'password'}
                                                className="form-control"
                                                required
                                                name={sysflag.id}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleflagChange(e, resp, null)}
                                                value={sysflag.value}
                                              />
                                              <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword === true ?
                                                  <VisibilityIcon /> :
                                                  <VisibilityOffIcon />
                                                }
                                              </InputGroup.Text>
                                            </InputGroup>
                                          }
                                        </div>
                                      ))}
                                    </div>
                                    {(resp.group && resp.group.length > 0) && (
                                      resp.group.map((group: any, gIndex: number) => (
                                        group.systemFlag.length > 0 &&
                                        <div key={group.id}>
                                          <div className="mt-3">
                                            <label className="form-label text-capitalize" >
                                              <b>{group.flagGroupName}</b>
                                            </label>
                                          </div>
                                          <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
                                            {group.systemFlag.map((sysflag: any, sIndex: number) => (
                                              <div className="mb-3" key={sysflag.id}>
                                                <label className="form-label text-capitalize"
                                                >
                                                  {sysflag.displayName}
                                                </label>
                                                {sysflag.valueTypeId == 1 &&
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    required
                                                    name={sysflag.id}
                                                    onChange={(e) => handleflagChange(e, resp, group)}
                                                    value={sysflag.value}
                                                  />
                                                }
                                                {sysflag.valueTypeId == 2 &&
                                                  <input
                                                    type="number"
                                                    className="form-control"
                                                    required
                                                    name={sysflag.id}
                                                    onChange={(e) => handleflagChange(e, resp, group)}
                                                    value={sysflag.value}
                                                  />
                                                }
                                                {sysflag.valueTypeId == 3 &&
                                                  <Form.Select name={sysflag.id} value={sysflag.value} onChange={(e: any) => handleflagChange(e, resp, group)}>
                                                    {sysflag.valueList.split(';').map((arr: any) => (
                                                      <option key={arr} value={arr}>{arr}</option>
                                                    ))}
                                                  </Form.Select>
                                                }
                                                {sysflag.valueTypeId == 4 &&
                                                  <input
                                                    type="number"
                                                    className="form-control"
                                                    required
                                                    name={sysflag.id}
                                                    onChange={(e) => handleflagChange(e, resp, group)}
                                                    value={sysflag.value}
                                                  />
                                                }
                                                {sysflag.valueTypeId == 5 &&
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    required
                                                    name={sysflag.id}
                                                    onChange={(e) => handleflagChange(e, resp, group)}
                                                    value={sysflag.value}
                                                    disabled
                                                  />
                                                }
                                                {sysflag.valueTypeId == 6 &&
                                                  <input
                                                    type="email"
                                                    className="form-control"
                                                    required
                                                    name={sysflag.id}
                                                    onChange={(e) => handleflagChange(e, resp, group)}
                                                    value={sysflag.value}
                                                  />
                                                }
                                                {sysflag.valueTypeId == 7 &&
                                                  <>
                                                    {sysflag.value === '1' ?
                                                      <Tooltip title={(sysflag.value === '0') ? "Inactive" : "Active"} arrow>
                                                        <Switch
                                                          name={sysflag.id}
                                                          value={sysflag.value}
                                                          checked={sysflag.value === '1'}
                                                          onChange={(e: any) => handleflagChange(e, resp, group)}
                                                          inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                      </Tooltip>
                                                      :
                                                      <Tooltip title={(sysflag.value === '0') ? "Inactive" : "Active"} arrow>
                                                        <Switch
                                                          name={sysflag.id}
                                                          value={sysflag.value}
                                                          // checked={sysflag.value}
                                                          onChange={(e: any) => handleflagChange(e, resp, group)}
                                                          inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                      </Tooltip>
                                                    }
                                                  </>
                                                }
                                                {sysflag.valueTypeId == 8 &&
                                                  <>
                                                    <InputGroup>
                                                      <Form.Control
                                                        type={showPassword === true ? 'text' : 'password'}
                                                        className="form-control"
                                                        required
                                                        name={sysflag.id}
                                                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleflagChange(e, resp, group)}
                                                        value={sysflag.value}
                                                      />
                                                      <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword === true ?
                                                          <VisibilityIcon /> :
                                                          <VisibilityOffIcon />
                                                        }
                                                      </InputGroup.Text>
                                                    </InputGroup>
                                                  </>
                                                }
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )))}
                                  </TabPanel>
                                ))}
                              </TableContainer>
                            </>
                          }
                        </div>
                      </TabContext>
                    </Box>
                    <Button
                      className="mt-3"
                      sx={{ mt: { xs: 2, md: 0 } }}
                      variant="contained"
                      onClick={handleClick}
                    >
                      Save
                    </Button>
                  </CardContent>

                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Setting
