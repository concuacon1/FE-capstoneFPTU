import React from "react";
import { Image } from "antd"
import ProjectListBannerImage from "../images/list-project-screen-banner.png"
import DesignImage from "../images/vgdesign-image.png"
import BuildImage from "../images/vgbuild-image.png"
import Service1Image from "../images/service1-image.png"
import Service2Image from "../images/service2-image.png"
import Service3Image from "../images/service3-image.png"
import FooterComponent from "../footer/index";
import HeaderComponent from "../header/index";
import './service-info.css'

const Service = () => {
   return (
      <div className="service3">
         <HeaderComponent />
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
               <div className='title'>
                  GÓI DỊCH VỤ
               </div>
               <p className='description'>Đăng ký báo giá xây dựng dựa trên các thiết kế tiêu chuẩn </p>
               <hr />
            </div>
            <div className="body">
               
            </div>
            <div className="footer">
               <div className="other-service">
                  <div className="title">
                     CÁC DỊCH VỤ KHÁC
                  </div>
                  <hr />
                  <div className="list-services">
                     <div className="service-child">
                        <Image
                           style={{ width: "200px", height: "200px" }}
                           src={Service1Image}
                           className='bg-white'
                           preview={false}
                        />
                        <div className="info">
                           <div className="text">
                              Thiết kế và thi công trọn gói căn hộ
                           </div>
                           <button className="button" type="button">
                              ĐỌC THÊM
                           </button>
                        </div>
                     </div>
                     <div className="service-child">
                        <Image
                           style={{ width: "200px", height: "200px" }}
                           src={Service2Image}
                           className='bg-white'
                           preview={false}
                        />
                        <div className="info">
                           <div className="text">
                              Tư vấn thiết kế sang trọng, đẹp mắt và nhanh chóng ...
                           </div>
                           <button className="button" type="button">
                              ĐỌC THÊM
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <FooterComponent />
      </div>
   )
};

export default Service;