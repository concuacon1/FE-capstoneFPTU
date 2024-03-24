import { Avatar, Button, Col, Flex, FloatButton, Image, Popover, Row } from 'antd';
import dayjs from "dayjs";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../App.css';
import instance from "../configApi/axiosConfig";
import FooterComponent from "../footer/index";
import HeaderComponent from "../header/index";
import AvatarCustomer from '../images/avatar-customer.png';
import ProjectValueBannerImage from '../images/project-screen-banner.png';
import AIchatBoxIcon from '../images/support.png';
import './project-value.css';

const ProjectValue = () => {
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const hide = () => {
        setClicked(false);
        setHovered(false);
    };
    const handleHoverChange = (open) => {
        setHovered(open);
        setClicked(false);
    };
    const handleClickChange = (open) => {
        setHovered(false);
        setClicked(open);
    };
    const { project_id } = useParams();
    const [listCategoris, setListCategoris] = useState([])

    useEffect(() => {
        async function getItemProject() {
            try {
                const dataRes = await instance.get(`/get_project/${project_id}`);
                setListCategoris(dataRes.data.data.listProject[0])
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

        getItemProject()

    }, [])

    const [isActive, setIsActive] = useState(0);
    const onClickActive = (index) => {
        setIsActive(index);
    }

    const removeProject = (id) => {
        console.log("id == ", id);
    }

    const hoverContent = <div style={{ fontSize: "24px" }}>Có thể giúp gì cho bạn ... ?</div>;
    const clickContent = <div ></div>;
    return (
        <div>
            <HeaderComponent />
            <ToastContainer />

            <div className="project-value-screen" style={{ backgroundColor: '#DED49F' }}>
                <div className='project-value-screen__image-banner'>
                    <Image
                        style={{ width: "100vw", height: "auto" }}
                        src={ProjectValueBannerImage}
                        className='bg-white'
                        preview={false}
                    />
                </div>
                <div className='project-value-screen__content'>
                    <div className='project-feedback'>
                        <div className='feedback-title'>FEEDBACK</div>
                        <div className='feedback-container'>
                            <div className='feedback-avatar'>
                                {
                                    listCategoris?.dataDesigner?.imageDesigner?.length > 0 ? <Avatar
                                        size={343}
                                        src={<img src={`http://localhost:8000/img/${listCategoris?.dataDesigner?.imageDesigner}`} alt="avatar" />}
                                    /> : <Avatar
                                        size={343}
                                        src={<img src={AvatarCustomer} alt="avatar" />}
                                    />
                                }
                            </div>
                            <div className='feedback-content'>
                                " {listCategoris?.description} “
                            </div>
                        </div>
                    </div>
                    <div className='project-value-container'>
                        <div className='title'>Sản phẩm hoàn thiện</div>
                        <div className='first-values'>
                            <div className='project-name'>{listCategoris?.name}</div>
                            <a href={listCategoris?.catalog}>
                                <Button className='catalog'>Catalog</Button>
                            </a>
                            <Button onClick={() => removeProject(listCategoris._id)} className='delete'>Delete</Button>
                        </div>
                        <div className='second-values'>
                            <div className='project-values'>
                                <div className='categories-and-date'>
                                    <div className='category' >
                                        <Flex vertical gap="20px" style={{ width: '100%' }}>

                                            {
                                                listCategoris?.categoryData?.length > 0 && listCategoris?.categoryData.map((item, index) => {
                                                    return (
                                                        <Button type="primary" key={index} className={isActive === index ? "item_categorys cursor-pointer bg_active_item" : "item_categorysNo cursor-pointer"} onClick={() => onClickActive(index)} >
                                                            {item.categoriesName}
                                                        </Button>
                                                    )
                                                })
                                            }
                                        </Flex>
                                    </div>
                                    <div className='date'>
                                        <label className='design-date'>
                                            Design date : <span className='date-value'> {dayjs(listCategoris?.designerDate).format('DD/MM/YYYY')} </span></label>
                                        <label className='construction-date'>
                                            Construction date: <span className='date-value'>{dayjs(listCategoris?.constructionDate).format('DD/MM/YYYY')} </span></label>
                                    </div>
                                </div>
                                <div className='middle-line'>
                                    <hr />
                                </div>
                                <div className='category-images'>
                                    <Row gutter={[40, 24]}>
                                        {
                                            !!listCategoris?.categoryData && listCategoris?.categoryData.length > 0 && listCategoris?.categoryData[isActive]?.images.length > 0 &&
                                            listCategoris?.categoryData[isActive]?.images?.map(e => {
                                                return (
                                                    <Col className="gutter-row" span={12}>
                                                        <Image
                                                            src={`http://localhost:8000/img/${e}`}
                                                            className='bg-white'
                                                            preview={true}
                                                        />
                                                    </Col>
                                                );
                                            }
                                            )
                                        }

                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div className='third-values'>
                            <div className='bottom-line'>
                                <hr />
                            </div>
                            <div className='designer-info'>
                                Design by <span className='designer-name'>{listCategoris?.userData?.length > 0 && listCategoris?.userData[0]?.fullName} </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='AIchatBoxIcon'>
                        <Popover
                            style={{
                                width: 500,
                            }}
                            placement="leftBottom"
                            content={hoverContent}
                            title="Vũ Gia"
                            trigger="hover"
                            open={hovered}
                            onOpenChange={handleHoverChange}
                        >
                            <Popover
                                content={
                                    <div>
                                        {clickContent}
                                        <a onClick={hide}>Close</a>
                                    </div>
                                }
                                placement="leftBottom"
                                title="Vũ Gia"
                                trigger="click"
                                open={clicked}
                                onOpenChange={handleClickChange}
                            >
                                <Image
                                    src={AIchatBoxIcon}
                                    preview={false}
                                />
                            </Popover>
                        </Popover>
                    </div>
                </div>
                <FloatButton.BackTop />
            </div >
            <FooterComponent />
        </div>

    )
}
export default ProjectValue;