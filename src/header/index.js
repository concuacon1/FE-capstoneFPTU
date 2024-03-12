
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import { Image } from 'antd';
import HomeOne from '../images/home_image_one.png'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'



const HeaderComponent = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [openNotipush, setOpenNotipush] = useState(null);
    const [openListInAvatar, setOpenListInAvatar] = useState(null);
    const open = Boolean(anchorEl);
    const openNotipushBool = Boolean(openNotipush);
    const openListAvatarBool = Boolean(openListInAvatar);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickOpenNotiPush = (event) => {
        setOpenNotipush(event.currentTarget);
    };

    const handleClickOpenListInAvatar = (event) => {
        setOpenListInAvatar(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseNotipush = () => {
        setOpenNotipush(null);
    };

    const handleCloseListInAvatar = () => {
        setOpenListInAvatar(null);
    };

    const StyledMenu = styled((props) => (
        <Menu
            elevation={1}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
                theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    }));

    const pushLink = useNavigate();
    const checkRole = JSON.parse(localStorage.getItem('datawebfpt'))?.role || '';

    const logout = () =>{
        localStorage.removeItem('datawebfpt')
        setOpenListInAvatar(null);
        Cookies.remove('tokenfpt');
        pushLink("/login")
    }

    
    return (
        <div className="header_all flex">
            <div className='bg_header_custom '>
                <div className='flex header-custom'>
                    <HomeIcon className='icon_home_header' />
                    {(checkRole == "ADMIN") && <div className='cursor-pointer'>Account</div>}
                    {(checkRole == "ADMIN" || checkRole == "DESIGNER" || checkRole == "STAFF" || checkRole == "CUSTOMER") && <div className='cursor-pointer'>Schedule</div>}
                    {(checkRole == "ADMIN" || checkRole == "DESIGNER") &&
                        <div className='cursor-pointer' ><Button
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            style={{ background: 'none', textTransform: 'none' }}
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            Project
                        </Button></div>}
                    {(checkRole == "ADMIN") && <div className='cursor-pointer'>Staff</div>}
                    {(checkRole == "ADMIN" || checkRole == "STAFF" || checkRole == "CUSTOMER") && <div className='cursor-pointer'>Designer</div>}
                    {(checkRole == "ADMIN" || checkRole == "STAFF") && <div className='cursor-pointer'>Customer</div>}
                    {(checkRole == "ADMIN" || checkRole == "DESIGNER" || checkRole == "STAFF" || checkRole == "CUSTOMER") && <div className='cursor-pointer'>Blogs</div>}
                    {(checkRole == "ADMIN" || checkRole == "DESIGNER" || checkRole == "STAFF" || checkRole == "CUSTOMER") && <div className='cursor-pointer'>About</div>}
                </div>
            </div>


            <div className='header_noti_user flex'>
                <div className='cursor-pointer'>
                    <Button
                        id="notipush-customized-button"
                        aria-controls={openNotipushBool ? 'notipush-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openNotipushBool ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        style={{ background: 'none', textTransform: 'none' }}
                        onClick={handleClickOpenNotiPush}
                    >
                        <NotificationsIcon className='cursor-pointer' />
                    </Button> </div>

                <Button
                    id="listInAvarat-customized-button"
                    aria-controls={openListAvatarBool ? 'listInAvarat-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openListAvatarBool ? 'true' : undefined}
                    variant="contained"
                    disableElevation
                    style={{ background: 'none', textTransform: 'none' }}
                    onClick={handleClickOpenListInAvatar}
                >
                    <Avatar>H</Avatar>
                </Button>
            </div>

            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} disableRipple>

                    Edit
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleClose} disableRipple>

                    Duplicate
                </MenuItem>

            </StyledMenu>


            <StyledMenu
                id="listInAvarat-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'listInAvarat-customized-button',
                }}
                anchorEl={openListInAvatar}
                open={openListAvatarBool}
                onClose={handleCloseListInAvatar}
            >
                <MenuItem onClick={logout} disableRipple>

                    Logout
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleCloseListInAvatar} disableRipple>

                    Profile
                </MenuItem>

            </StyledMenu>

            <StyledMenu
                id="notipush-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'notipush-customized-button',
                }}
                anchorEl={openNotipush}
                open={openNotipushBool}
                onClose={handleCloseNotipush}
            >
                <MenuItem>

                    <div className='flex items-center justify-center'>
                        <div className='icon_notipush-yellow'>
                            <CalendarMonthIcon />
                        </div>
                        <div>
                            <p className='item-title-notipush'>Schedule</p>
                            <p className='item-information-notipush'>Need confirm schedule !!!</p>
                        </div>
                        <p className='read_notipush'></p>

                        <div className=''>
                            <DeleteIcon className='cursor-pointer' />
                        </div>
                    </div>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />

                <MenuItem>

                    <div className='flex items-center justify-center'>
                        <div className='icon_notipush-green'>
                            <CalendarMonthIcon />
                        </div>
                        <div>
                            <p className='item-title-notipush'>Schedule</p>
                            <p className='item-information-notipush'>Need confirm schedule !!!</p>
                        </div>
                        <p className='read_notipush'></p>

                        <div className=''>
                            <DeleteIcon className='cursor-pointer' />
                        </div>
                    </div>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />


                <MenuItem>

                    <div className='flex items-center justify-center'>
                        <div className='icon_notipush-green'>
                            <LockIcon />
                        </div>
                        <div>
                            <p className='item-title-notipush'>Schedule</p>
                            <p className='item-information-notipush'>Need confirm schedule !!!</p>
                        </div>
                        <p className='read_notipush'></p>

                        <div className=''>
                            <DeleteIcon className='cursor-pointer' />
                        </div>
                    </div>
                </MenuItem>
            </StyledMenu>
        </div>

    )
}

export default HeaderComponent;