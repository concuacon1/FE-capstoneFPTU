import React from 'react';
import ProjectListBannerImage from '../images/list-project-screen-banner.png'
import ProjectImage from '../images/project-image.png'
import AIchatBoxIcon from '../images/support.png'
import { Image, Col, Divider, Row, Carousel } from 'antd';
import '../App.css'
import './list-project.css';

const ListProject = () => {
   const projectImageStyle = {
      width: "25vw",
      height: "auto",
      borderRadius: '20px',
   };
   const dividerStyle = {
      fontSize: '40px',
      color: '#B91616',
      marginTop: '2%',
      fontFamily: 'Gabriela'
   }
   const projectNameStyle = {
      display: 'block',
      fontSize: '24px',
      color: 'black',
      fontFamily: 'Gabriela'
   }
   const colStyle = {
      textAlign: 'center',
   }
   return (
      <div className='list-project-screen' style={{ backgroundColor: '#DED49F' }}>
         <div className='list-project-screen__image-banner'>
            <Image
               style={{ width: "100vw", height: "auto" }}
               src={ProjectListBannerImage}
               className='bg-white'
               preview={false}
            />
         </div>
         <Divider orientation="center" style={dividerStyle}>Nội thất nhà phố</Divider>
         <hr style={{
            border: 'none',
            borderTop: '2px solid #B91616',
            margin: 'auto',
            width: '50%'
         }} />
         <div className='list-project-screen__container' style={{ marginTop: '2%' }}>
            <Carousel className='customCarousel' dotPosition="bottom">
               <div>
                  <div className='list-project-screen__projects' style={{ margin: '1% 5%' }}>
                     <Row gutter={[40, 24]}>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Căn hộ Mr Đàm - Vĩnh Hưng</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Căn hộ Mr Đức - Hải Phòng</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Căn hộ Mr Vinh - Thái Bình</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Căn hộ Mr Hải - Thạch Thất</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Căn hộ Mr Tùng - TP Việt Trì</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Căn hộ Mr Khải - Quảng Ninh</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Căn hộ Mrs Ngọc - Hải Phòng</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Căn hộ Mr Thành - Hà Nội</label>
                        </Col>
                     </Row>
                  </div>
               </div>
               <div>
                  <div className='list-project-screen__projects' style={{ margin: '2% 5%' }}>
                     <Row gutter={[40, 24]}>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Mr Đàm - Vĩnh Hưng</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Mr Đàm - Vĩnh Hưng</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Mr Đàm - Vĩnh Hưng</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Mr Đàm - Vĩnh Hưng</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Mr Đàm - Vĩnh Hưng</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Mr Đàm - Vĩnh Hưng</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Mr Đàm - Vĩnh Hưng</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Mr Đàm - Vĩnh Hưng</label>
                        </Col>
                     </Row>
                  </div>
               </div>
               <div>
                  <div className='list-project-screen__projects' style={{ margin: '2% 5%' }}>
                     <Row gutter={[40, 24]}>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Mr Đàm - Vĩnh Hưng</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Mr Đàm - Vĩnh Hưng</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Mr Đàm - Vĩnh Hưng</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Mr Đàm - Vĩnh Hưng</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Mr Đàm - Vĩnh Hưng</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Mr Đàm - Vĩnh Hưng</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Mr Đàm - Vĩnh Hưng</label>
                        </Col>
                        <Col className="gutter-row" span={6} style={colStyle}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectImage}
                              className='bg-white'
                              preview={false}
                           />
                           <label className='project-name' style={projectNameStyle}>Mr Đàm - Vĩnh Hưng</label>
                        </Col>
                     </Row>
                  </div>
               </div>
            </Carousel>
         </div>
         <div>
            <div className='AIchatBoxIcon'>
               <Image
                  src={AIchatBoxIcon}
                  preview={false}
               />
            </div>
         </div>
      </div>
   )
}
export default ListProject