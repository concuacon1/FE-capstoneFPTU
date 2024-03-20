import { Image } from 'antd';
import React from 'react';
import Video from '../../src/images/noithatvugia.mp4';
import FooterComponent from '../footer';
import HeaderComponent from "../header/index";
import PeopleImageScreen from '../images/image-about-screen.png';
import './about_screen.css';


const AboutScreen = () => {
   const ImageContentStyle = {
      width: "420px",
      height: "auto"
   }
   return (

      
      <div className='about-screen'>
       <HeaderComponent />
         <div className='about-screen title'>
            ABOUT US
         </div>
         <div className='about-screen container'>
            <div className='images'>
               <Image
                  style={ImageContentStyle}
                  src={PeopleImageScreen}
                  className='bg-white'
                  preview={false}
               />
            </div>
            <div className="content">
               Chúng ta đã có hàng chục năm gia công cho các thương hiệu nội thất lớn trên thế giới.
               Các sản phẩm được sản xuất tại Việt Nam, gắn thương hiệu ngoại và quay trở lại bán
               cho người Việt với giá gấp nhiều lần giá trị sử dụng thực.
               <br /><br />Xuất phát từ lòng tự hào
               dân tộc, khởi nguồn từ khao khát người Việt Nam được dùng hàng hiệu Việt với tiêu chuẩn
               châu Âu cùng mức chi phí tối ưu. D.Agostino ra đời với đầy đủ phẩm chất của một thương
               hiệu gia công chế tác Nội thất cao cấp.
               <br /><br />D.Agostino nâng tầm phong cách sống sang trọng,
               đẳng cấp với những giá trị bền vững đi cùng mức chi phí hợp lý.
            </div>
            <div className='data'>
               <div className='item'>
                  <p style={{ fontSize: "40px" }}>13+</p>
                  Hệ thống showrom trải dài khắp cả nước.
               </div>
               <div className='item'>
                  <p style={{ fontSize: "40px" }}>9</p>
                  Hành trình 9 năm
                  <br />Chinh phục thị trường Việt Nam
               </div>
               <div className='item'>
                  <p style={{ fontSize: "40px" }}>1000+</p>
                  Dự án Villa, Khách sạn, Penthouse, Chung cư cao cấp, ...  trải dài từ Bắc tới Nam
               </div>
            </div>
         </div>
         <div className='about-screen slogan'>
            <span style={{ textAlign: 'left' }}>NỘI THẤT VŨ GIA _</span>
            <span style={{ textAlign: 'right' }}>_ ĐEM ƯỚC MƠ VỀ TỚI CỬA NHÀ</span>
         </div>
         <div className='about-screen video'>
            <video autoPlay loop muted style={{ width: '100vw' }}>
               <source src={Video} type='video/mp4'></source>
            </video>
         </div>
         <FooterComponent  />
      </div>
   )
}
export default AboutScreen;