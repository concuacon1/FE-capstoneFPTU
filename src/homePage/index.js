import Menu from "@mui/material/Menu";
import { alpha, styled } from "@mui/material/styles";
import { Image } from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Video from '../../src/videos/noithatvugia.mp4';
import FooterComponent from "../footer";
import HeaderComponent from "../header";
import { default as BuildImage, default as DesignImage } from "../images/list-project-screen-banner.png";
import './index.css';

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
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            {...props}
        />
    ))(({ theme }) => ({
        "& .MuiPaper-root": {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
                theme.palette.mode === "light"
                    ? "rgb(55, 65, 81)"
                    : theme.palette.grey[300],
            boxShadow:
                "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            "& .MuiMenu-list": {
                padding: "4px 0",
            },
            "& .MuiMenuItem-root": {
                "& .MuiSvgIcon-root": {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                "&:active": {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity
                    ),
                },
            },
        },
    }));

    const pushLink = useNavigate();
    const checkRole = JSON.parse(localStorage.getItem("datawebfpt"))?.role || "";

    const logout = () => {
        localStorage.removeItem("datawebfpt");
        setOpenListInAvatar(null);
        Cookies.remove("tokenfpt");
        pushLink("/login");
    };

    return (
        <>
            <HeaderComponent />
            <div style={{ backgroundColor: '#FFFFFF' }}>
                <div className='about-screen video'>
                    <video autoPlay loop muted style={{ width: '100vw' }}>
                        <source src={Video} type='video/mp4'></source>
                    </video>
                </div>
                <div className='about-screen slogan' style={{
                    display: 'flex',
                    backgroundImage: 'linear-gradient(to left, #e89f71, #000000)',
                    height: '250px',
                    color: 'white',
                    fontSize: '60px',
                    fontFamily: 'Gabriela',
                    fontWeight: 400,
                    lineHeight: '54px',
                    letterSpacing: '10px',
                    flexWrap: 'wrap',
                    padding: '3% 10%',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <span style={{ textAlign: 'left' }}>NỘI THẤT VŨ GIA _</span>
                    <span style={{ textAlign: 'right' }}>_ ĐEM ƯỚC MƠ VỀ TỚI CỬA NHÀ</span>
                </div>
                <div className="manufactoring-process">
                    <div className="design-and-build">
                        <div className="design">
                            <div className="service-image">
                                <Image
                                    width={"100%"}
                                    height={"auto"}
                                    style={{ objectFit: "cover", borderRadius: "20px", boxShadow: "-10px 20px 30px 5px" }}
                                    src={DesignImage}
                                    className="bg-white"
                                    preview={false}
                                />
                            </div>
                            <div className="bg-text">
                                <div className="text">Design</div>
                                <div className="button-view-service">Xem dịch vụ</div>
                            </div>

                        </div>
                        <div className="and">&</div>
                        <div className="build">
                            <div className="service-image">
                                <Image
                                    width={"100%"}
                                    height={"auto"}
                                    style={{ objectFit: "cover", borderRadius: "20px", boxShadow: "-10px 20px 30px 5px" }}
                                    src={BuildImage}
                                    className="bg-white"
                                    preview={false}
                                />
                            </div>
                            <div className="bg-text">
                                <div className="text">Build</div>
                                <div className="button-view-service">Xem dịch vụ</div>
                            </div>
                        </div>
                    </div>
                    <div className="get-price">Nhận tư vấn báo giá</div>
                </div>

            </div>
            <FooterComponent />
        </>
    );
};

export default HomePage;
