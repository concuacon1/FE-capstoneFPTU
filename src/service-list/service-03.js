import { Image } from "antd";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { fadeIn } from "../Animation/variants";
import { waveVariants } from "../Animation/waveVariants";
import FooterComponent from "../footer";
import HeaderComponent from "../header";
import Video from '../../src/videos/noithatvugia.mp4';
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
                  <p className='description'>Đăng ký báo giá xây dựng dựa trên các thiết kế tiêu chuẩn</p>
                  <hr />
               </div>
               <div className="body">
                  <div className="service-intro">
                     <div className="title">
                        GIỚI THIỆU DỊCH VỤ
                     </div>
                     <div className="content">
                        Dịch vụ đăng kí báo giá xây dựng dựa trên các thiết kế tiêu chuẩn là giải pháp giúp bạn dễ dàng dự trù chi phí cho công trình của mình. Với dịch vụ này, bạn chỉ cần cung cấp thông tin về loại công trình, diện tích, thiết kế tiêu chuẩn mong muốn, hệ thống sẽ tự động tính toán và báo giá chi tiết các hạng mục thi công.
                     </div>
                  </div>
                  <div className="service-video">
                     <div className="title">
                        Quá trình sản xuất trực tiếp tại xưởng
                     </div>
                     <div className="video">
                        <video autoPlay loop muted style={{ width: '100%', height: '80%' }}>
                           <source src={Video} type='video/mp4'></source>
                        </video></div>
                  </div>
                  <div className="service-benefit">
                     <div className="title">LỢI ÍCH</div>
                     <div className="text">
                        - <b>Tiết kiệm thời gian:</b> So với việc liên hệ trực tiếp với các nhà thầu để lấy báo giá, dịch vụ này giúp bạn tiết kiệm được rất nhiều thời gian.<br />
                        - <b>So sánh giá cả dễ dàng:</b> Hệ thống sẽ cung cấp báo giá từ nhà thầu Vu Gia, giúp bạn dễ dàng so sánh và lựa chọn nhà thầu phù hợp.<br />
                        - <b>Dự trù chi phí chính xác:</b> Báo giá được cung cấp dựa trên các thiết kế tiêu chuẩn, giúp bạn dự trù chi phí cho công trình một cách chính xác hơn.<br />
                        - <b>Minh bạch và rõ ràng:</b> Hệ thống cung cấp báo giá chi tiết từng hạng mục thi công, giúp bạn nắm rõ chi phí cho công trình của mình.
                     </div>
                     <div className="images">
                        <div className="img">
                           <Image
                              style={{ width: "100vw", height: "auto" }}
                              src={ProjectListBannerImage}
                              className='bg-white'
                              preview={false}
                           />
                        </div>
                        <div className="img">
                           <Image
                              style={{ width: "100vw", height: "auto" }}
                              src={ProjectListBannerImage}
                              className='bg-white'
                              preview={false}
                           />
                        </div>
                     </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                     <motion.button className="button" type="button"
                        variants={waveVariants}
                        animate="wave"
                     >
                        ĐẶT LỊCH TƯ VẤN
                     </motion.button>
                  </div>
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