import { Modal as BaseModal } from '@mui/base/Modal';
import { TextField } from '@mui/material';
import Menu from "@mui/material/Menu";
import { alpha, styled } from "@mui/material/styles";
import { Image } from "antd";
import { motion } from 'framer-motion';
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Video from '../../src/images/noithatvugia.mp4';
import { waveVariants } from "../Animation/waveVariants";
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
    const [showModal, setShowModal] = useState(false);
    
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      address: '',
      note: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
      // Do something with formData
      handleCloseModal(); // Close modal after submission
    };
  
    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

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
                    <div>
      {/* Nút để mở modal */}
      <motion.Button variant="contained" onClick={handleOpenModal} className="get-price"
      variants={waveVariants}
      animate="wave"
      >
        Nhận tư vấn báo giá
      </motion.Button>
      
      {/* Lớp overlay */}
      {showModal && <div className="overlay" onClick={handleCloseModal}></div>}
      
      {/* Modal */}
      <BaseModal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="modal-container"
      >
        {/* Nội dung modal */}
        <div className="modal">
        <h2 id="modal-title" className="modal-title">Nhận tư vấn báo giá</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              id="name"
              label="Họ và tên"
              variant="outlined"
              fullWidth
              size="small"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              size="small"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              id="phone"
              label="Số điện thoại"
              variant="outlined"
              fullWidth
              size="small"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              id="address"
              label="Địa chỉ"
              variant="outlined"
              fullWidth
              size="small"
              multiline
              rows={2}
              name="address"
              value={formData.address}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              id="note"
              label="Ghi chú"
              variant="outlined"
              fullWidth
              size="small"
              multiline
              rows={4}
              name="note"
              value={formData.note}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <motion.button
  className="button"
  type="button"
  initial="hidden"
  whileInView={"show"}
  viewport={{ once: false, amount: 0.7 }}
>
  <>Gửi yêu cầu</>
</motion.button>
          </form>
        </div>
      </BaseModal>
    </div>
                </div>
                
            </div>
            <FooterComponent />
        </>
    );
};

export default HomePage;
