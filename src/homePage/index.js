
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LockIcon from '@mui/icons-material/Lock';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import { Image } from 'antd';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeOne from '../images/home_image_one.png';
const HomePage = () => {
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

    const logout = () => {
        localStorage.removeItem('datawebfpt')
        setOpenListInAvatar(null);
        Cookies.remove('tokenfpt');
        pushLink("/login")
    }

    return (
        <div>
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


            <Image
                width={"100%"}
                height={679}
                src={HomeOne}
                className='bg-white'
                preview={false} />


            <div className='cunstom-footer'>
                <div className='block_footer_one'>
                    <h2 className='tittle_footer'>VU GIA furniture</h2>
                    <p>Worldwide furniture store since 2020. We sell over 1000+ branded products on our website</p>
                    <p className='flex'>

                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.4308 13.0668L12.9153 13.8401C12.8124 13.9944 12.6763 14.1261 12.4969 14.1735C11.9095 14.3287 10.3499 14.3988 7.97554 12.0244C5.60115 9.65004 5.67123 8.09046 5.82645 7.50302C5.87384 7.32368 6.00553 7.1876 6.15987 7.0847L6.93312 6.5692C7.50882 6.1854 7.66439 5.40757 7.28059 4.83187L5.82018 2.64126C5.48518 2.13876 4.83937 1.94678 4.28427 2.18468L3.62548 2.46702C3.12502 2.6815 2.71678 3.06643 2.47328 3.55343C2.26984 3.96031 2.11217 4.38877 2.0908 4.84316C2.02348 6.27515 2.33747 9.80312 6.26717 13.7328C10.1969 17.6625 13.7248 17.9765 15.1568 17.9092C15.6112 17.8878 16.0397 17.7301 16.4465 17.5267C16.9335 17.2832 17.3185 16.8749 17.5329 16.3745L17.8153 15.7157C18.0532 15.1606 17.8612 14.5148 17.3587 14.1798L15.1681 12.7194C14.5924 12.3356 13.8146 12.4911 13.4308 13.0668Z" fill="#898989" />
                        </svg>
                        <span className='ml-3'>  +6289 456 3455 </span> </p>
                    <p className='flex'>

                        <svg width="26" height="29" viewBox="0 0 26 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_681_849)">
                                <path fillRule="evenodd" clip-rule="evenodd" d="M13.9721 20.463C16.2437 18.9283 21.7083 14.7081 21.7083 9.62508C21.7083 4.8156 17.8094 0.916748 13 0.916748C8.19048 0.916748 4.29163 4.8156 4.29163 9.62508C4.29163 14.7081 9.75623 18.9283 12.0278 20.463C12.6213 20.8639 13.3786 20.8639 13.9721 20.463ZM13 12.3751C14.5187 12.3751 15.75 11.1439 15.75 9.62508C15.75 8.1063 14.5187 6.87508 13 6.87508C11.4812 6.87508 10.25 8.1063 10.25 9.62508C10.25 11.1439 11.4812 12.3751 13 12.3751Z" fill="#898989" />
                            </g>
                            <defs>
                                <filter id="filter0_d_681_849" x="-2" y="0" width="30" height="30" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="4" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_681_849" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_681_849" result="shape" />
                                </filter>
                            </defs>
                        </svg>

                        <span className='ml-3'> HaNoi, VietNam </span></p>
                    <div>www.noithatvugia.com</div>
                </div>

                <div className='block_footer_one'>
                    <h2 className='tittle_footer'>Menu</h2>
                    <p>Projects</p>
                    <p>Rooms</p>
                    <p>Inspirations</p>
                    <div>About Us</div>
                    <div>Terms & Policy</div>
                </div>

                <div className='block_footer_one'>
                    <h2 className='tittle_footer'>Stay Connected</h2>
                    <p>Facebook</p>
                    <p>Instagram</p>
                    <p>Twitter</p>

                </div>

                <div className='block_footer_one'>
                    <h2 className='tittle_footer'>Account</h2>
                    <p>My Profile</p>
                    <p>My catalog</p>
                    <p onClick={logout} className="cursor-pointer">Log out</p>
                </div>

            </div>

        </div>
    )

}

export default HomePage;