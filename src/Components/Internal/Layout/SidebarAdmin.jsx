import React from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EuroOutlinedIcon from '@material-ui/icons/EuroOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import HowToRegOutlinedIcon from '@material-ui/icons/HowToRegOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import DirectionsCarOutlinedIcon from '@material-ui/icons/DirectionsCarOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import RecordVoiceOverOutlinedIcon from '@material-ui/icons/RecordVoiceOverOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const drawerWidth = 250;
const useStyles   = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) - 5,
        },
    },
}));
const menuItems   = [
    {
        label: 'Dashboard',
        icon : <DashboardOutlinedIcon />,
        url  : '/dashboard/'
    },
    {
        type: 'divider',
        key : 1
    },
    {
        label: 'Schools',
        icon : <AccountBalanceOutlinedIcon />,
        url  : '/schools/'
    },
    {
        type: 'divider',
        key : 2
    },
    {
        label: 'Students',
        icon : <LocalLibraryOutlinedIcon />,
        url  : '/students/'
    },
    {
        type: 'divider',
        key : 3
    },
    {
        label: 'Teachers',
        icon : <RecordVoiceOverOutlinedIcon />,
        url  : '/teachers/'
    },
    {
        type: 'divider',
        key : 4
    },
    {
        label: 'Parents',
        icon : <HowToRegOutlinedIcon />,
        url  : '/parents/'
    },
    {
        type: 'divider',
        key : 5
    },
    {
        label: 'Pickups',
        icon : <DirectionsCarOutlinedIcon />,
        url  : '/pickups/'
    },
    {
        type: 'divider',
        key : 6
    },
    {
        label: 'Attendance',
        icon : <EventAvailableOutlinedIcon />,
        url  : '/attendance/'
    },
    {
        type: 'divider',
        key : 7
    },
    {
        label: 'Security',
        icon : <VerifiedUserOutlinedIcon />,
        url  : '/security/'
    },
    {
        label: 'View Approvals',
        icon : <AssignmentTurnedInOutlinedIcon />,
        url  : '/view-security-approvals/'
    },
    {
        type: 'divider',
        key : 8
    },
    {
        label: 'Visitors',
        icon : <SupervisorAccountOutlinedIcon />,
        url  : '/visitors/'
    },
    {
        type: 'divider',
        key : 9
    },
    {
        label: 'Countries',
        icon : <PublicOutlinedIcon />,
        url  : '/countries/'
    },
    {
        type: 'divider',
        key : 10
    },
    {
        label: 'Admins',
        icon : <SupervisedUserCircleOutlinedIcon />,
        url  : '/admins/'
    },
    {
        type: 'divider',
        key : 11
    },
    {
        label: 'SMS',
        icon : <SendOutlinedIcon />,
        url  : '/sms/'
    },
    {
        label: 'Email',
        icon : <EmailOutlinedIcon />,
        url  : '/email/'
    },
    {
        type: 'divider',
        key : 12
    },
    {
        label: 'Payment',
        icon : <EuroOutlinedIcon />,
        url  : '/payments/'
    },
    {
        type: 'divider',
        key : 13
    },
    {
        label: 'Activity Log',
        icon : <VisibilityOutlinedIcon />,
        url  : '/activity-log/'
    },
    {
        type: 'divider',
        key : 14
    }
];

const SidebarAdmin = () => {
    const visible = useSelector(state => state.sidebarReducer.visible);
    const classes = useStyles();
    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: visible,
                    [classes.drawerClose]: !visible,
                }),
            }}>
            <Divider />
            <List>
                {menuItems.map((menuItem) => (
                    menuItem.type
                    ?
                    <Divider key={menuItem.key} />
                    :
                    <NavLink to={menuItem.url} key={menuItem.label}>
                        <ListItem button>
                            <ListItemIcon>
                                {menuItem.icon}
                            </ListItemIcon>
                            <ListItemText primary={menuItem.label} />
                        </ListItem>
                    </NavLink>
                ))}
            </List>
        </Drawer>
    );
}

export default SidebarAdmin;
