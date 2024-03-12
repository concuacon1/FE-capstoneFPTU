import React, { useEffect, useState } from 'react';
import ProjectListBannerImage from '../images/list-project-screen-banner.png'
import ProjectImage from '../images/project-image.png'
import AIchatBoxIcon from '../images/support.png'
import { Image, Col, Divider, Row, Carousel } from 'antd';
import HeaderComponent from "../header/index";
import FooterComponent from "../footer/index"
import instance from "../configApi/axiosConfig";
import { toast, ToastContainer } from 'react-toastify'
import '../App.css'
import './list-project.css';

const ListProject = () => {
    const projectImageStyle = {
        width: "25vw",
        height: "auto",
        borderRadius: '20px',
    };
    const dividerStyle = {
        fontSize: '40px',
        color: '#B91616',
        marginTop: '2%',
        fontFamily: 'Gabriela'
    }
    const projectNameStyle = {
        display: 'block',
        fontSize: '24px',
        color: 'black',
        fontFamily: 'Gabriela'
    }
    const colStyle = {
        textAlign: 'center',
    }

    const [listProject, setListProject] = useState([])
    useEffect(() => {
        async function getAllProject() {
            try {
                const resData = await instance.get("/get_project");
                setListProject(resData.data.data.listProject);
            } catch (error) {
                if (error.response.status === 402) {
                    return toast.error(error.response.data.errors[0].msg)
                } else if (error.response.status === 400) {
                    return toast.error(error.response.data.message)
                } else if (error.response.status === 403) {
                    return toast.error(error.response.data.message)
                } else {
                    return toast.error("Server error")
                }
            }

        }
        getAllProject()
    }, [])

    return (
        <div>
            <HeaderComponent />
            <ToastContainer />
            <div className='list-project-screen' style={{ backgroundColor: '#DED49F' }}>
                <div className='list-project-screen__image-banner'>
                    <Image
                        style={{ width: "100vw", height: "auto" }}
                        src={ProjectListBannerImage}
                        className='bg-white'
                        preview={false}
                    />
                </div>
                <Divider orientation="center" style={dividerStyle}>Nội thất nhà phố</Divider>
                <hr style={{
                    border: 'none',
                    borderTop: '2px solid #B91616',
                    margin: 'auto',
                    width: '50%'
                }} />
                <div className='list-project-screen__container' style={{ marginTop: '2%' }}>
                    <Carousel className='customCarousel' dotPosition="bottom">
                        {
                            listProject.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div className='list-project-screen__projects' style={{ margin: '2% 5%' }}>
                                            <Row gutter={[40, 24]}>
                                                <Col className="gutter-row" span={6} style={colStyle}>
                                                    <a href={`project/${item._id}`}>
                                                        <Image
                                                            style={projectImageStyle}
                                                            src={`http://localhost:8000/img/${item.projectImage}`}
                                                            className='bg-white'
                                                            preview={false}
                                                        />
                                                        <label className='project-name' style={projectNameStyle}>{item.name}</label>
                                                    </a>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </Carousel>
                </div>
                {/* <div>
            <div className='AIchatBoxIcon'>
                <Image
                    src={AIchatBoxIcon}
                    preview={false}
                />
            </div>
         </div> */}
            </div>

            <div className='mt-5'></div>

            <FooterComponent />
        </div>
    )
}
export default ListProject