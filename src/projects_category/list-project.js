import { Carousel, Col, Divider, Image, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../App.css';
import instance from "../configApi/axiosConfig";
import FooterComponent from "../footer/index";
import HeaderComponent from "../header/index";
import ProjectListBannerImage from '../images/list-project-screen-banner.png';
import './list-project.css';

const ListProject = () => {
    const { project_type } = useParams();
    const projectImageStyle = {
        width: "25vw",
        height: "200px",
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
    const [listProjectA, setListProjectA] = useState([])
    const [listProjectB, setListProjectB] = useState([])
    const [listProjectC, setListProjectC] = useState([])
    useEffect(() => {
        async function getAllProject() {
            try {
                const resData = await instance.get("/get_project");
                const dataRes = resData.data.data.listProject;
                if (dataRes.length < 8) {
                    setListProjectA(dataRes)
                } else if (dataRes.length >= 8 && dataRes.length < 15) {
                    const dataSliceA = dataRes.slice(0, 8);
                    const dataSliceB = dataRes.slice(8, dataRes.length);
                    setListProjectB(dataSliceB)
                    setListProjectA(dataSliceA)
                } else if (dataRes.length >= 15 && dataRes.length < 24) {
                    const dataSliceA = dataRes.slice(0, 8);
                    const dataSliceB = dataRes.slice(8, dataRes.length);
                    setListProjectB(dataSliceB)
                    setListProjectA(dataSliceA)
                    const dataSliceC = dataRes.slice(15, dataRes.length);
                    setListProjectC(dataSliceC)
                }
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

    console.log(listProjectA, listProjectB, listProjectC)
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
                        <div>
                            <div className='list-project-screen__projects' style={{ margin: '2% 5%' }} >
                                <Row gutter={[40, 24]}>
                                    {
                                        listProjectA.length > 0 && listProject.map((item, index) => {
                                            return (
                                                <Col className="gutter-row" span={6} style={colStyle} key={index}>
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
                                            )
                                        })
                                    }
                                </Row>
                            </div>
                        </div>


                        {listProjectB.length > 0 && <div>
                            <div className='list-project-screen__projects' style={{ margin: '2% 5%' }} >
                                <Row gutter={[40, 24]}>
                                    {
                                        listProjectB.map((item, index) => {
                                            return (
                                                <Col className="gutter-row" span={6} style={colStyle} key={index}>
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
                                            )
                                        })
                                    }
                                </Row>
                            </div>
                        </div>}


                        {listProjectC.length > 0 && <div>
                            <div className='list-project-screen__projects' style={{ margin: '2% 5%' }} >
                                <Row gutter={[40, 24]}>
                                    {
                                        listProjectC.map((item, index) => {
                                            return (
                                                <Col className="gutter-row" span={6} style={colStyle} key={index}>
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
                                            )
                                        })
                                    }
                                </Row>
                            </div>
                        </div>
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