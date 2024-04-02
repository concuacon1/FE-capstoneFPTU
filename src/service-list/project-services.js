import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Image } from "antd";
import { motion } from 'framer-motion';
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { fadeIn } from '../Animation/variants';
import FooterComponent from '../footer';
import HeaderComponent from '../header';
import ProjectListBannerImage from "../images/list-project-screen-banner.png";
import './project-services.css';


const ProjectServices = () => {
   const iconStyle = {
      fontSize: 50,
      color: 'black',
      marginTop: 50,
      cursor: 'pointer',
   };

   useEffect(() => {
      const arrButton = document.querySelectorAll(".project-type-scroll-bar i");
      arrButton.forEach(btn => {
         btn.addEventListener("click", () => {
            console.log(btn.id);
         });
      });
   }, []);

   return (
      <>
         <HeaderComponent />
         <motion.div
            className="project-service-screen " style={{
               transform:"none"
            }}

            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }} // Change from 0 to 1 to animate from scaleY 0 to scaleY 1
            exit={{ scaleY: 1 }} // Change from 0 to 1 to animate from scaleY 0 to scaleY 1
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
         >
            <motion.div className='project-service-screen'
               // variants={fadeIn('up', 0.2)}
               initial="hidden"
               whileInView={"show"}
               viewport={{ once: false, amount: 0.7 }}
            >

               <motion.div className='list-project-screen image-banner'

               >
                  {/* <Image
                     style={{ width: "100vw", height: "auto" }}
                     src={ProjectListBannerImage}
                     className='bg-white'
                     preview={false} /> */}
               </motion.div>
               <motion.div className="project-type-scroll-bar"
                  variants={fadeIn('up', 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}>
                  <i id="left">
                     <ArrowCircleLeftOutlinedIcon style={iconStyle} />
                  </i>
                  <ul className="carousel">
                     <li className="circle">
                        <div className="img">
                           <img src={ProjectListBannerImage} alt="img" />
                        </div>
                        <div className="bg-text">NỘI THẤT NHÀ PHỐ</div>
                     </li>
                     <li className="circle">
                        <div className="img">
                           <img src={ProjectListBannerImage} alt="img" />
                        </div>
                        <div className="bg-text">NỘI THẤT NHÀ PHỐ</div>
                     </li>
                     <li className="circle">
                        <div className="img">
                           <img src={ProjectListBannerImage} alt="img" />
                        </div>
                        <div className="bg-text">NỘI THẤT NHÀ PHỐ</div>
                     </li>
                     <li className="circle">
                        <div className="img">
                           <img src={ProjectListBannerImage} alt="img" />
                        </div>
                        <div className="bg-text">NỘI THẤT NHÀ PHỐ</div>
                     </li>
                     <li className="circle">
                        <div className="img">
                           <img src={ProjectListBannerImage} alt="img" />
                        </div>
                        <div className="bg-text">NỘI THẤT NHÀ PHỐ</div>
                     </li>
                     <li className="circle">
                        <div className="img">
                           <img src={ProjectListBannerImage} alt="img" />
                        </div>
                        <div className="bg-text">NỘI THẤT NHÀ PHỐ</div>
                     </li>
                  </ul>
                  <i id="right">
                     <ArrowCircleRightOutlinedIcon style={iconStyle} />
                  </i>
               </motion.div>
               <motion.div className="title"
                  variants={fadeIn('down', 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}>
                  <div className="screen-name">GÓI DỊCH VỤ</div>
                  <motion.div className="slogan"
                     variants={fadeIn('down', 0.2)}
                     initial="hidden"
                     whileInView={"show"}
                     viewport={{ once: false, amount: 0.7 }}>
                     Từ những thiết kế nổi bật, thi công chính xác, chất liệu tốt nhất, ... VŨ GIA hứa hẹn mang đến những trải nghiệm đáng có cho khách hàng.
                     <br />
                     Đến và cảm nhận sự đẳng cấp và tận hưởng dịch vụ chăm sóc khách hàng tốt nhất ở VŨ GIA.
                  </motion.div>
               </motion.div>
               <div className="content-container">
                  <div className="service-content">
                     <motion.div className="image"
                        whileHover={{
                           scale: 1.1,
                           boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                           border: "2px solid rgba(0, 0, 0, 0.1)",
                           filter: "brightness(100%)" // Tăng độ sáng khi trỏ chuột vào
                        }}
                        initial={{
                           scale: 1,
                           boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                           border: "2px solid rgba(0, 0, 0, 0.05)",
                           filter: "brightness(50%)" // Đặt độ tối ban đầu của ảnh
                        }}
                        transition={{ duration: 0.3 }}
                     >
                        <Image
                           style={{ width: "100vw", height: "auto" }}
                           src={ProjectListBannerImage}
                           className='bg-white'
                           preview={false} />
                     </motion.div>
                     <motion.div className="content"
                        variants={fadeIn('right', 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.7 }}
                     >
                        <div className="text">Thiết kế và thi công trọn gói căn hộ ...</div>
                        <Link to="/service/01" style={{
                           textDecoration: "none" // Chỉ định nút không có gạch chân
                        }}>
                           <button className="button" type="button" style={{
                              fontSize: "20px",
                              color: "#FFFFFF",
                              marginTop: "2%",
                              backgroundColor: "#B91616",
                              padding: "8px 22px",
                              borderRadius: "10px",
                           }}>
                              ĐỌC THÊM
                           </button>
                        </Link>
                     </motion.div>
                  </div>
                  <div className="service-content" style={{ flexDirection: 'row-reverse' }}>
                     <motion.div className="image"
                        whileHover={{
                           scale: 1.1,
                           boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                           border: "2px solid rgba(0, 0, 0, 0.1)",
                           filter: "brightness(100%)" // Tăng độ sáng khi trỏ chuột vào
                        }}
                        initial={{
                           scale: 1,
                           boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                           border: "2px solid rgba(0, 0, 0, 0.05)",
                           filter: "brightness(50%)" // Đặt độ tối ban đầu của ảnh
                        }}
                        transition={{ duration: 0.3 }}
                     >
                        <Image
                           style={{ width: "100vw", height: "auto" }}
                           src={ProjectListBannerImage}
                           className='bg-white'
                           preview={false} />
                     </motion.div>
                     <motion.div className="content"
                        variants={fadeIn('left', 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.7 }}
                     >
                        <div className="text">Tư vấn thiết kế sang trọng, đẹp mắt và nhanh chóng ...</div>
                        <Link to="/service/02" style={{
                           textDecoration: "none" // Chỉ định nút không có gạch chân
                        }}>
                           <button className="button" type="button" style={{
                              fontSize: "20px",
                              color: "#FFFFFF",
                              marginTop: "2%",
                              backgroundColor: "#B91616",
                              padding: "8px 22px",
                              borderRadius: "10px",
                           }}>
                              ĐỌC THÊM
                           </button>
                        </Link>
                     </motion.div>
                  </div>
                  <div className="service-content">
                     <motion.div className="image"
                        whileHover={{
                           scale: 1.1,
                           boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                           border: "2px solid rgba(0, 0, 0, 0.1)",
                           filter: "brightness(100%)" // Tăng độ sáng khi trỏ chuột vào
                        }}
                        initial={{
                           scale: 1,
                           boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                           border: "2px solid rgba(0, 0, 0, 0.05)",
                           filter: "brightness(50%)" // Đặt độ tối ban đầu của ảnh
                        }}
                        transition={{ duration: 0.3 }}
                     >
                        <Image
                           style={{ width: "100vw", height: "auto" }}
                           src={ProjectListBannerImage}
                           className='bg-white'
                           preview={false} />
                     </motion.div>
                     <motion.div className="content"
                        variants={fadeIn('right', 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.7 }}
                     >
                        <div className="text">Dịch vụ đăng kí báo giá xây dựng dựa trên các thiết kế tiêu chuẩn ...</div>
                        <Link to="/service/03" style={{
                           textDecoration: "none" // Chỉ định nút không có gạch chân
                        }}>
                           <button className="button" type="button" style={{
                              fontSize: "20px",
                              color: "#FFFFFF",
                              marginTop: "2%",
                              backgroundColor: "#B91616",
                              padding: "8px 22px",
                              borderRadius: "10px",
                           }}>
                              ĐỌC THÊM
                           </button>
                        </Link>
                     </motion.div>
                  </div>
               </div>
            </motion.div>

         </motion.div>


         <FooterComponent />
      </>

   )
}

export default ProjectServices;
