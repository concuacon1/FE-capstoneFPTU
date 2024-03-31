import { Image } from 'antd';
import { motion } from 'framer-motion';
import React from 'react';
import Video from '../../src/images/noithatvugia.mp4';
import { fadeIn } from '../Animation/variants';
import FooterComponent from '../footer';
import HeaderComponent from "../header/index";
import AnhQuyen from '../images/image 30.png';
import './about_screen.css';

const AboutScreen = () => {
   const ImageContentStyle = {
      width: "470px",
      height: "470px"
   }
   return (
      <div>
         <HeaderComponent />
         <motion.div className='about-screen'
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }} // Change from 0 to 1 to animate from scaleY 0 to scaleY 1
            exit={{ scaleY: 1 }} // Change from 0 to 1 to animate from scaleY 0 to scaleY 1
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
         >

            <motion.div className='about-screen title'>

            </motion.div>
            <motion.div className='Text-content'

               variants={fadeIn('down', 0.2)}
               initial="hidden"
               whileInView={"show"}
               viewport={{ once: false, amount: 0.7 }}
            >
               Doanh Nghiệp
            </motion.div>

            <div className='about-screen container'>
               <motion.div className='images'
                
               >
                  <Image
                     style={ImageContentStyle}
                     src={AnhQuyen}
                     className='bg-white'
                     preview={true}
                  />
               </motion.div>
               <motion.div className="content"



               >
                  Chúng ta đã có nhiều năm gia công cho các thương hiệu nội thất lớn trên thế giới. Các sản phẩm được sản xuất tại Việt Nam, gắn thương hiệu ngoại và quay trở lại bán cho người Việt với giá gấp nhiều lần giá trị sử dụng thực.
                  <br /><br />Xuất phát từ lòng tự hào dân tộc, khởi nguồn từ khao khát người Việt Nam được dùng hàng hiệu Việt với tiêu chuẩn châu Âu cùng mức chi phí tối ưu. Vũ Gia ra đời với đầy đủ phẩm chất của một thương hiệu gia công chế tác Nội thất cao cấp.
                  <br /><br />Vũ Gia Furniture nâng tầm phong cách sống sang trọng, đẳng cấp với những giá trị bền vững đi cùng mức chi phí hợp lý.
               </motion.div>
               <div className='data'>
                  <motion.div className='item'
                     variants={fadeIn('right', 0.2)}
                     initial="hidden"
                     whileInView={"show"}
                     viewport={{ once: false, amount: 0.7 }}
                  >
                     <p style={{ fontSize: "40px", color: '#A14C17' }}>1 Tỷ</p>
                     <p>Hoàn trả nếu không đúng nguyên vật liệu</p>
                  </motion.div>
                  <motion.div className='item'
                     variants={fadeIn('up', 0.2)}
                     initial="hidden"
                     whileInView={"show"}
                     viewport={{ once: false, amount: 0.7 }}
                  >
                     <p style={{
                        fontSize: "40px",
                        color: '#A14C17'
                     }}>5 năm</p>
                     <p> Bảo hành sản phẩm </p>

                  </motion.div>
                  <motion.div className='item'
                     variants={fadeIn('left', 0.2)}
                     initial="hidden"
                     whileInView={"show"}
                     viewport={{ once: false, amount: 0.7 }}
                  >
                     <p style={{
                        fontSize: "40px",
                        color: '#A14C17'
                     }}>100%</p>
                     <p> Cam kết chính xác so với hồ sơ thiết kế </p>
                  </motion.div>
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
            <FooterComponent />
         </motion.div>
      </div>
   )
}
export default AboutScreen;