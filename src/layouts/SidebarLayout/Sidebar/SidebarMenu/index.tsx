import { useContext, useRef, useState } from 'react';

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem,
  Backdrop,
  CircularProgress,
  MenuItem,
  TextField,
  ListItemText,
  Popover,
  Menu,
  ListItemButton,
  Collapse,
  ListItemIcon
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { NavLink, NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';
import School from '@mui/icons-material/School';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DiningIcon from '@mui/icons-material/Dining';
import HeightIcon from '@mui/icons-material/Height';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import LockIcon from '@mui/icons-material/Lock';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import SynagogueIcon from '@mui/icons-material/Synagogue';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import SummarizeIcon from '@mui/icons-material/Summarize';
import TempleHinduSharpIcon from '@mui/icons-material/TempleHinduSharp';
import PeopleIcon from '@mui/icons-material/People';
import { AssignmentInd } from '@mui/icons-material';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItemButton-root {
        display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiListItemButton{
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
      }

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }

        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }

          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }


        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
    'transform',
    'opacity'
  ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);

  const ref = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
    setIsOpen(false);
  };

  const handleIsClick = () => {
    setIsOpen(!isOpen);
    setOpen(false);
  };

  const handleSend = () => {
    navigate('/admin/requestSendReport');
  };
  const handleAccept = () => {
    navigate('/admin/requestAcceptReport');
  };
  const handleReject = () => {
    navigate('/admin/requestRejectReport');
  };
  const handleReceiveUser = () => {
    navigate('/admin/requestReceiveUser');
  };
  const handleRejectUser = () => {
    navigate('/admin/requestRejectUser');
  };
  const handleSendUser = () => {
    navigate('/admin/requestSendUser');
  };

  const handleRequestSend = () => {
    navigate('/admin/requestsend');
  };
  const handleRequestReceive = () => {
    navigate('/admin/requestreceive');
  };
  const handleApplicationUser = () => {
    navigate('/admin/applicationuser');
  };

  const handlePremiumAppUser = () => {
    navigate('/admin/premiumAppUser');
  };

  const handleSystemBlockedUsers = () => {
    navigate('/admin/systemBlockedUser');
  };

  const handleIncome = () => {
    navigate("/admin/income")
  }

  const handleReligion = () => {
    navigate("/admin/religion")
  }

  const handleCommunity = () => {
    navigate("/admin/community")
  }

  const handleSubCommunity = () => {
    navigate("/admin/subcommunity")
  }

  const handleMaritalStatus = () => {
    navigate("/admin/maritalstatus")
  }

  const handleEmployment = () => {
    navigate("/admin/employment")
  }

  const handleOccupation = () => {
    navigate("/admin/occupation")
  }

  const handleEducation = () => {
    navigate("/admin/education")
  }

  const handleDiet = () => {
    navigate("/admin/diet")
  }

  const handleHeight = () => {
    navigate("/admin/height")
  }

  return (
    <>
      <MenuWrapper>
        <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/admin"
                  startIcon={<DashboardIcon />}
                >
                  Dashboard
                </Button>
              </ListItem>

              <List
                component="div"
                subheader={
                  <ListSubheader component="div" disableSticky>
                    Users
                  </ListSubheader>
                }
                sx={{ mt: 1.5 }}
              >
                <SubMenuWrapper>
                  <List component="div">
                    <ListItem component="div">
                      <Button
                        disableRipple
                        component={RouterLink}
                        onClick={closeSidebar}
                        to="/admin/appuser"
                        startIcon={<AccountCircleTwoToneIcon />}
                      >
                        App Users
                      </Button>
                    </ListItem>
                    <ListItem component="div">
                      <Button
                        disableRipple
                        component={RouterLink}
                        onClick={closeSidebar}
                        to="/admin/blockuser"
                        startIcon={<LockIcon />}
                      >
                        Block Users
                      </Button>
                    </ListItem>
                    <ListItem component="div">
                      <Button
                        disableRipple
                        component={RouterLink}
                        onClick={closeSidebar}
                        to="/admin/users"
                        startIcon={<GroupAddIcon />}
                      >
                        Admin Users
                      </Button>
                    </ListItem>
                  </List>
                </SubMenuWrapper>
              </List>
              <List
                component="div"
                subheader={
                  <ListSubheader component="div" disableSticky>
                    Packages
                  </ListSubheader>
                }
              >
                <SubMenuWrapper>
                  <List component="div">
                    <ListItem component="div">
                      <Button
                        disableRipple
                        component={RouterLink}
                        onClick={closeSidebar}
                        to="/admin/premiumaccount"
                        startIcon={<ImportantDevicesIcon />}
                      >
                        Premium Account
                      </Button>
                    </ListItem>
                    <ListItem component="div">
                      <Button
                        disableRipple
                        component={RouterLink}
                        onClick={closeSidebar}
                        to="/admin/premiumfacility"
                        startIcon={<LocalActivityIcon />}
                      >
                        Premium Facility
                      </Button>
                    </ListItem>
                    <ListItem component="div">
                      <Button
                        disableRipple
                        component={RouterLink}
                        onClick={closeSidebar}
                        to="/admin/timeduration"
                        startIcon={<AccessTimeIcon />}
                      >
                        Time Duration
                      </Button>
                    </ListItem>
                  </List>
                </SubMenuWrapper>
              </List>
              <List>
                <SubMenuWrapper>
                  <List component="div">
                    <ListItemButton onClick={handleIsClick} >
                      {<MenuBookIcon sx={{ ml: "-14px", fontSize: "1.25rem" }} />}
                      <ListItemText primary="Master Entry" sx={{ ml: 1, transition: "color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms" }} />
                      {isOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={isOpen} timeout="auto" >
                      <List component="div" disablePadding >
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleReligion(); closeSidebar(); }}>
                          <ListItemText primary="Religion" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleCommunity(); closeSidebar(); }}>
                          <ListItemText primary="Community" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleSubCommunity(); closeSidebar(); }}>
                          <ListItemText primary="Sub Community" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleMaritalStatus(); closeSidebar(); }}>
                          <ListItemText primary="Marital Status" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleEmployment(); closeSidebar(); }}>
                          <ListItemText primary="Employment" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleOccupation(); closeSidebar(); }}>
                          <ListItemText primary="Occupation" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleEducation(); closeSidebar(); }}>
                          <ListItemText primary="Education" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleDiet(); closeSidebar(); }}>
                          <ListItemText primary="Diet" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleHeight(); closeSidebar(); }}>
                          <ListItemText primary="Height" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleIncome(); closeSidebar(); }}>
                          <ListItemText primary="Annual income" />
                        </ListItemButton>
                      </List>
                    </Collapse>
                    <ListItemButton onClick={handleClick} >
                      {<SummarizeIcon sx={{ ml: "-14px", fontSize: "1.25rem" }} />}
                      <ListItemText primary="Reports" sx={{ ml: 1 }} />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" >
                      <List component="div" disablePadding >
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleSend(); closeSidebar(); }}>
                          <ListItemText primary="Proposal Request Send" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleAccept(); closeSidebar(); }}>
                          <ListItemText primary="Proposal Request Accept" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleReject(); closeSidebar(); }}>
                          <ListItemText primary="Proposal Request Reject" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleReceiveUser(); closeSidebar(); }}>
                          <ListItemText primary="Proposal Receive User" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleRejectUser(); closeSidebar(); }}>
                          <ListItemText primary="Proposal Reject User" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleSendUser(); closeSidebar(); }}>
                          <ListItemText primary="Proposal Send User" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleRequestSend(); closeSidebar(); }}>
                          <ListItemText primary="Top Request Send" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleRequestReceive(); closeSidebar(); }}>
                          <ListItemText primary="Top Request Receive" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleApplicationUser(); closeSidebar(); }}>
                          <ListItemText primary="Application User" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handlePremiumAppUser(); closeSidebar(); }}>
                          <ListItemText primary="Premium App User" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => { handleSystemBlockedUsers(); closeSidebar(); }}>
                          <ListItemText primary="System Blocked User" />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </List>
                </SubMenuWrapper>
              </List>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/admin/FAQs"
                  startIcon={<DeviceUnknownIcon />}
                >
                  FAQs
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/admin/successStory"
                  startIcon={<AutoStoriesIcon />}
                >
                  Success Story
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/admin/feedback"
                  startIcon={<FeedbackIcon />}
                >
                  Feedback
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/admin/setting"
                  startIcon={<SettingsIcon />}
                >
                  Setting
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
      {/* <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Master Entry
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/admin/religion"
                  startIcon={<SynagogueIcon />}
                >
                  Religion
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/admin/community"
                  startIcon={<TempleHinduSharpIcon />}
                >
                  Community
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/admin/subcommunity"
                  startIcon={<PeopleIcon />}
                >
                  Sub Community
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/admin/marital"
                  startIcon={<FavoriteIcon />}
                >
                  Marital Status
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/admin/employment"
                  startIcon={<BadgeIcon />}
                >
                  Employment
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/admin/occupation"
                  startIcon={<AssignmentInd />}
                >
                  Occupation
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/admin/education"
                  startIcon={<School />}
                >
                  Education
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/admin/diet"
                  startIcon={<DiningIcon />}
                >
                  Diet
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/admin/height"
                  startIcon={<HeightIcon />}
                >
                  Height
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/admin/income"
                  startIcon={<CurrencyRupeeIcon />}
                >
                  Income
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List> */}

    </>
  );
}

export default SidebarMenu;
