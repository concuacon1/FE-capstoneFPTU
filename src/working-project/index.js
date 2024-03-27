import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Divider, Grid, ImageList, ImageListItem, TextField } from "@mui/material";
import Fade from '@mui/material/Fade';
import { styled } from '@mui/system';
import { Image } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer } from 'react-toastify';
import instance from "../configApi/axiosConfig";
import FooterComponent from "../footer/index";
import HeaderComponent from "../header/index";
import VuGia from "../images/Vu_gia.png";

const WorkingProject = () => {
    const userId = JSON.parse(localStorage.getItem('datawebfpt'))?.designerId || '';
    const [userInfo, setUserInfo] = useState(null);
    const [formCreateProject, setFormCretaeProject] = useState({
        projectImage: "",
    });
    const [formShow, setFormShow] = useState({
        username: "",
        accountcode: "",
        email: "",
        phoneNumber: ""
    });
    const [listCategory, setListCategory] = useState([]);

    const fileInputRef = useRef(null);
    const [isActive, setIsActive] = useState(0)

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const filesList = event.target.files;
        for (let i = 0; i < filesList.length; i++) {
            console.log(`file${i + 1}`, filesList[i]);
        }

        const listDataOle = [...listCategory];
        listDataOle[isActive].images = event.target.files;
        setListCategory(listDataOle);
    };

    const onChangeInput = (event) => {
        const data = {
            ...formShow,
            [event.target.name]: event.target.value,
        };

        setFormShow(data);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const designerRes = await instance.post(`/update-designer/${userId}`);
                setUserInfo(designerRes.data.message[0])
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [])

    console.log(userInfo);
    return (
        <div className="h-screen">
            <HeaderComponent />
            <ToastContainer />
            <div className="table-account " style={{ padding: '60px' }}>
                <h1 className="text-center" style={{ fontWeight: 'bold' }}>Tạo hồ sơ làm việc</h1>
                <div className="flex justify-between" style={{ gap: '40px' }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "15px"
                    }}>
                        <Image
                            style={{ borderRadius: '50%' }}
                            height={250}
                            width={250}
                            src={VuGia}
                            preview={true}
                        />
                        <div>{userInfo?.dataDesigner[0].fullName}</div>
                    </div>
                    <div style={{ margin: '20px' }}>
                        <div className="flex justify-around items-center">
                            <h1 className="text-center mb-3" style={{ textDecoration: 'underline' }}>Các dự án tiêu biểu</h1>
                            <div className="flex items-center" style={{ gap: '10px' }}>
                                <h1 onClick={handleButtonClick}>Tải lên</h1>
                                <button className="button-upload-images"
                                    onClick={handleButtonClick}>Chọn ảnh</button>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    multiple
                                />
                            </div>
                        </div>
                        <ImageList sx={{ width: '90%', height: 250, display: 'flex' }} cols={2} rowHeight={164}>
                            <div style={{
                                overflowX: 'auto',
                                overflowY: 'hidden',
                                display: 'flex'
                            }}>
                                {
                                    userInfo?.listImageProject.length > 0 && userInfo?.listImageProject.map((image, index) => (
                                        <ImageListItem key={index}>
                                            <Image
                                                style={{ minWidth: 365, height: 'auto', padding: 5 }}
                                                src={image}
                                                preview={true}
                                            />
                                        </ImageListItem>
                                    ))
                                }
                            </div>
                        </ImageList>
                    </div>
                </div>
                <div className="flex" style={{ width: '100%' }}>
                    <div style={{ width: '40%', padding: '50px' }}>
                        <div className="font-bold mb-3 flex items-center" style={{ fontSize: '20px', gap: 20 }}>
                            Mã nhà thiết kế
                            <TextField
                                size="small"
                                style={{ width: 222.45 }}
                                id="outlined-start-adornment"
                                name="accountcode"
                                value={userInfo?.dataDesigner[0].userCode}
                                sx={{ m: 1, width: "222.45px", }}
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className="font-bold mb-3" style={{ fontSize: '20px' }}>Giới thiệu bản thân</div>
                        <Textarea aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows" />
                    </div>
                    <Divider type="vertical" style={{ height: "auto", backgroundColor: 'black', width: '1px' }} />
                    <div style={{ padding: '50px' }}>
                        <div className="font-bold text-center" style={{ marginBottom: '20px', fontSize: '20px' }}>Kỹ năng</div>
                        <Grid container spacing={2}>
                            {[...Array(6)].map((_, index) => (
                                <Grid item xs={6} key={index}>
                                    <TextField
                                        fullWidth
                                        label={`Ky nang ${index + 1}`}
                                        InputProps={{
                                            disableUnderline: true,
                                            style: {
                                                borderBottom: '1px solid #000',
                                            },
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <div className="font-bold text-center" style={{ margin: '20px 0', fontSize: '20px' }}>Kinh nghiệm</div>
                        <Grid container spacing={2}>
                            {[...Array(4)].map((_, index) => (
                                <Grid item xs={12} key={index}>
                                    <TextField
                                        fullWidth
                                        label={`Kinh nghiem ${index + 1}`}
                                        InputProps={{
                                            disableUnderline: true,
                                            style: {
                                                borderBottom: '1px solid #000',
                                            },
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <div className="flex mt-3" style={{ float: 'right' }}>
                            <button className="bg_book_schedule mr-5">Tạo hồ sơ</button>
                        </div>
                    </div>
                </div>
            </div >

            <div className="border-2 pt-2 pb-2"></div>
            <FooterComponent />
        </div >
    );
};

export default WorkingProject;

const Backdrop = React.forwardRef((props, ref) => {
    const { open, ...other } = props;
    return (
        <Fade in={open}>
            <div ref={ref} {...other} />
        </Fade>
    );
});

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);