import { Image } from "antd";
import { motion } from "framer-motion";
import React from "react";
import FooterComponent from "../footer";
import HeaderComponent from "../header";
import ProjectListBannerImage from "../images/list-project-screen-banner.png";
import './service-info.css';

const Service = () => {
   return (
      <>
         <HeaderComponent />
         <motion.div className="service"
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
            <div className='service-container'>
               <div className="service-content">
                  <div className='header'>
                     <div className='title'>
                        GÓI DỊCH VỤ
                     </div>
                     <p className='description'>Thiết kế và thi công trọn gói căn hộ</p>
                     <hr />
                  </div>
               </div>
            </div>
         </motion.div>
         <FooterComponent />
      </>
   )
};

export default Service;