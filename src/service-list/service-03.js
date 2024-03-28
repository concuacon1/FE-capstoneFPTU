import { Image } from "antd";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { fadeIn } from "../Animation/variants";
import { waveVariants } from "../Animation/waveVariants";
import FooterComponent from "../footer";
import HeaderComponent from "../header";
import ProjectListBannerImage from "../images/list-project-screen-banner.png";
import Service1Image from "../images/service1-image.png";
import Service3Image from "../images/service3-image.png";
import './service-info.css';

const Service = () => {
   return (
      <>
         <HeaderComponent />
         <motion.div className="service3"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1, originX: 0 }}
            exit={{ scaleX: 0, originX: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
         >
            <div className='service image-banner'>
               <Image
                  style={{ width: "100vw", height: "auto" }}
                  src={ProjectListBannerImage}
                  className='bg-white'
                  preview={false}
               />
            </div>
            <div className='service__container'>
               <div className='header'>
                  <div className='header title'>
                     GÓI DỊCH VỤ
                  </div>
                  <p className='description'>Thiết kế và thi công trọn gói căn hộ</p>
                  <hr />
               </div>
               <div className="footer">
                  <div className="other-service">
                     <div className="title">
                        CÁC DỊCH VỤ KHÁC
                     </div>
                     <hr />
                     <div className="list-services">
                        <div className="service-child">
                           <div
                              variants={fadeIn('right', 0.2)}
                              initial="hidden"
                              whileInView={"show"}
                              viewport={{ once: false, amount: 0.7 }}
                           >
                              <Image
                                 style={{ width: "200px", height: "200px" }}
                                 src={Service1Image}
                                 className='bg-white'
                                 preview={false}
                              />
                           </div>
                           <div className="info">
                              <motion.div className="text"
                                 variants={fadeIn('down', 0.2)}
                                 initial="hidden"
                                 whileInView={"show"}
                                 viewport={{ once: false, amount: 0.7 }}
                              >
                                 Thiết kế và thi công trọn gói căn hộ
                              </motion.div>
                              <motion.button className="button" type="button"
                                 variants={fadeIn('up', 0.2)}
                                 initial="hidden"
                                 whileInView={"show"}
                                 viewport={{ once: false, amount: 0.7 }}
                              >
                                 <Link to="/service/01">ĐỌC THÊM</Link>
                              </motion.button>
                           </div>
                        </div>
                        <div className="service-child">
                           <div
                              variants={fadeIn('right', 0.2)}
                              initial="hidden"
                              whileInView={"show"}
                              viewport={{ once: false, amount: 0.7 }}
                           >
                              <Image
                                 style={{ width: "200px", height: "200px" }}
                                 src={Service3Image}
                                 className='bg-white'
                                 preview={false}
                              />
                           </div>
                           <div className="info">
                              <motion.div className="text"
                                 variants={fadeIn('down', 0.2)}
                                 initial="hidden"
                                 whileInView={"show"}
                                 viewport={{ once: false, amount: 0.7 }}
                              >
                                 Tư vấn thi công nhanh chóng <br />(không cần thiết kế)
                              </motion.div>
                              <motion.button className="button" type="button"

                                 variants={fadeIn('up', 0.2)}
                                 initial="hidden"
                                 whileInView={"show"}
                                 viewport={{ once: false, amount: 0.7 }}>
                                 <Link to="/service/03">ĐỌC THÊM</Link>
                              </motion.button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </motion.div>
         <FooterComponent />
      </>
   )
};

export default Service;