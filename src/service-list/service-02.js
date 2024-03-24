import { Image } from "antd";
import { motion } from "framer-motion";
import React from "react";
import FooterComponent from "../footer";
import HeaderComponent from "../header";
import CT1SV2Image from "../images/ct1-sv2-image.png";
import CT2SV2Image from "../images/ct2-sv2-image.png";
import CT3SV2Image from "../images/ct3-sv2-image.png";
import ProjectListBannerImage from "../images/list-project-screen-banner.png";
import Service1Image from "../images/service1-image.png";
import Service3Image from "../images/service3-image.png";
import ImageTitle from "../images/sv2-image-title.png";
import './service-info.css';

const Service = () => {
   return (
      <>
      <HeaderComponent />
      <motion.div className="service2"
      initial={{ scaleX: 0, originX: 1 }}
      animate={{ scaleX: 1, originX: 1 }}
      exit={{ scaleX: 0, originX: 1 }}
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
               <div className='title'>
                  GÓI DỊCH VỤ
               </div>
               <p className='description'>Tư vấn thiết kế sang trọng, đẹp mắt và nhanh chóng ...</p>
               <hr />
            </div>
            <div className="body">
               <div className="service2__content-head">
                  🌟 Khám Phá Sự Đẳng Cấp với Dịch Vụ Tư Vấn Thiết Kế Của Chúng Tôi! 🌟
               </div>
               <div className="first-content">
                  <div className="text">
                     Chúng tôi tự hào giới thiệu đến bạn gói dịch vụ tư vấn thiết kế, nơi mọi ý tưởng độc đáo của bạn trở thành hiện thực sống động. Với đội ngũ chuyên gia giàu kinh nghiệm và sáng tạo, chúng tôi cam kết mang đến cho bạn những lợi ích không thể bỏ qua.
                  </div>
                  <div className="image">
                     <Image
                        style={{ width: "25vw", height: "auto" }}
                        src={ImageTitle}
                        className='bg-white'
                        preview={true}
                     />
                  </div>
               </div>
               <div className="content">
                  <div className="content-child">
                     <div className="content-title">
                        Sự sáng tạo phi giới hạn
                     </div>
                     <hr />
                     <div className="content-detail">
                        <div className="image">
                           <Image
                              style={{ width: "100vw", height: "600px", objectFit: "cover" }}
                              src={CT1SV2Image}
                              className='bg-white'
                              preview={false}
                           />
                        </div>
                        <div className="background-text-content">
                           <div className="background-white" />
                           <div className="background-middle" />
                           <div className="background-brown" />
                           <div className="text" style={{ fontSize: '39px' }}>
                              Mỗi dự án được tạo ra từ tư duy sáng tạo và lòng đam mê của chúng tôi. Chúng tôi không ngừng tìm kiếm và thực hiện những ý tưởng mới để tạo ra không gian sống độc đáo và đáng nhớ cho bạn.
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="content-child">
                     <div className="content-title">
                        Thiết kế độc quyền và phù hợp
                     </div>
                     <hr />
                     <div className="content-detail">
                        <div className="image">
                           <Image
                              style={{ width: "100vw", height: "600px", objectFit: "cover" }}
                              src={CT2SV2Image}
                              className='bg-white'
                              preview={false}
                           />
                        </div>
                        <div className="background-text-content">
                           <div className="background-white" />
                           <div className="background-middle" />
                           <div className="background-brown" />
                           <div className="text" style={{ fontSize: '35px' }}>
                              Chúng tôi không chỉ tạo ra các thiết kế độc đáo, mà còn đảm bảo rằng chúng phản ánh chính xác phong cách và nhu cầu của bạn. Với sự kết hợp tinh tế giữa thẩm mỹ và sự tiện ích, mỗi không gian sẽ trở thành nơi bạn muốn trở về sau mỗi ngày làm việc.
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="content-child">
                     <div className="content-title">
                        Hỗ trợ tận tâm và toàn diện
                     </div>
                     <hr />
                     <div className="content-detail">
                        <div className="image">
                           <Image
                              style={{ width: "100vw", height: "600px", objectFit: "cover" }}
                              src={CT3SV2Image}
                              className='bg-white'
                              preview={false}
                           />
                        </div>
                        <div className="background-text-content">
                           <div className="background-white" />
                           <div className="background-middle" />
                           <div className="background-brown" />
                           <div className="text" style={{ fontSize: '35px' }}>
                              Chúng tôi không chỉ là những nhà thiết kế, mà còn là những người bạn đồng hành trung thành trong hành trình xây dựng không gian của bạn. Với dịch vụ tư vấn thiết kế của chúng tôi, bạn sẽ nhận được sự hỗ trợ tận tâm và chuyên nghiệp từ đầu đến cuối dự án.
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="content-03">
                     <div className="content-desc">
                        Hãy để chúng tôi giúp bạn biến ước mơ về không gian sống lý tưởng thành hiện thực! <br />
                        Liên hệ với chúng tôi ngay hôm nay để bắt đầu hành trình tìm kiếm sự hoàn hảo và phong cách cho ngôi nhà của bạn!
                     </div>
                     <button className="button" type="button">
                        ĐẶT LỊCH TƯ VẤN
                     </button>
                  </div>
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
                           src={Service3Image}
                           className='bg-white'
                           preview={false}
                        />
                        <div className="info">
                           <div className="text">
                              Tư vấn thi công nhanh chóng <br />(không cần thiết kế)
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
      </motion.div>
      <FooterComponent />
      </>
   )
};

export default Service;