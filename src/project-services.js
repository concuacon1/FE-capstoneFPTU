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
         <div className='list-project-screen__image-banner'>
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
      </div>
   )
}

export default ProjectServices; 