import React from "react"
import { Image } from "antd"
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined'
import ProjectListBannerImage from "../images/list-project-screen-banner.png"
import './project-services.css'

const ProjectServices = () => {
   const iconStyle = {
      fontSize: 50,
      color: 'black',
      marginTop: 50,
      cursor: 'pointer',
   }
   const arrButton = document.querySelectorAll(".project-type-scroll-bar i")
   arrButton.forEach(btn => {
      btn.addEventListener("click", () => {
         console.log(btn.id)
      })
   })
   return (
      <div className="project-service-screen">
         <div className='image-banner'>
            <Image
               style={{ width: "100vw", height: "auto" }}
               src={ProjectListBannerImage}
               className='bg-white'
               preview={false}
            />
         </div>
         <div className="project-type-scroll-bar">
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
         </div>
         <div className="title">
            <div className="screen-name">GÓI DỊCH VỤ</div>
            <div className="slogan">
               Từ những thiết kế nổi bật, thi công chính xác, chất liệu tốt nhất, ... VU GIA hứa hẹn mang đến những trải nghiệm đáng có cho khách hàng.
               <br />
               Đến và cảm nhận sự đẳng cấp và tận hưởng dịch vụ chăm sóc khách hàng tốt nhất ở VU GIA.
            </div>
         </div>
         <div className="content-container">
            <div className="service-content">
               <div className="image">
                  <Image
                     style={{ width: "100vw", height: "auto" }}
                     src={ProjectListBannerImage}
                     className='bg-white'
                     preview={false}
                  />
               </div>
               <div className="content">
                  <div className="text">Thiết kế và thi công trọn gói căn hộ ...</div>
                  <button className="button" type="button">
                     ĐỌC THÊM
                  </button>
               </div>
            </div>
            <div className="service-content" style={{ flexDirection: 'row-reverse' }}>
               <div className="image">
                  <Image
                     style={{ width: "100vw", height: "auto" }}
                     src={ProjectListBannerImage}
                     className='bg-white'
                     preview={false}
                  />
               </div>
               <div className="content">
                  <div className="text">Tư vấn thiết kế sang trọng, đẹp mắt và nhanh chóng ...</div>
                  <button className="button" type="button">
                     ĐỌC THÊM
                  </button>
               </div>
            </div>
            <div className="service-content">
               <div className="image">
                  <Image
                     style={{ width: "100vw", height: "auto" }}
                     src={ProjectListBannerImage}
                     className='bg-white'
                     preview={false}
                  />
               </div>
               <div className="content">
                  <div className="text">Dịch vụ đăng kí báo giá xây dựng dựa trên các thiết kế tiêu chuẩn ...</div>
                  <button className="button" type="button">
                     ĐỌC THÊM
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
};

export default ProjectServices;             