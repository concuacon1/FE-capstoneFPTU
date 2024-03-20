import React from "react";
import { Image } from "antd"
import ProjectListBannerImage from "../images/list-project-screen-banner.png"

const Service = () => {
   return (
      <div className="service">
         <div className='service image-banner'>
            <Image
               style={{ width: "100vw", height: "auto" }}
               src={ProjectListBannerImage}
               className='bg-white'
               preview={false}
            />
         </div>
         <div className='container service-content'>
            <div className='service-content header'>
               <div className='header title'>
                  GÓI DỊCH VỤ
               </div>
            </div>
            <p className='description'>Thiết kế và thi công trọn gói căn hộ</p>
            <hr />
         </div>
      </div>
   )
};

export default Service;