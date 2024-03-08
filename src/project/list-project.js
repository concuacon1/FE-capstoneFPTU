import React from 'react';
import ProjectBanner from '../images/list-project-screen-banner.png'
import { Image, Col, Divider, Row, Carousel } from 'antd';

import './list-project.css';

const ListProject = () => {
   const projectImageStyle = {
      width: "100vw",
      height: "auto",
      borderRadius: '20px',
   };
   const dividerStyle = {
      fontSize: '40px',
      color: '#B91616',
   }
   return (
      <div className='list-project-screen' style={{ backgroundColor: '#DED49F' }}>
         <div className='list-project-screen__image-banner'>
            <Image
               style={{ width: "100vw", height: "auto" }}
               src={ProjectBanner}
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
         <div>
            <Carousel className='customCarousel' dotPosition="bottom">
               <div>
                  <div className='list-project-screen__projects' style={{ margin: '2% 5%' }}>
                     <Row gutter={[32, 24]}>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                     </Row>
                  </div>
               </div>
               <div>
                  <div className='list-project-screen__projects' style={{ margin: '2% 5%' }}>
                     <Row gutter={[32, 24]}>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                     </Row>
                  </div>
               </div>
               <div>
                  <div className='list-project-screen__projects' style={{ margin: '2% 5%' }}>
                     <Row gutter={[32, 24]}>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                        <Col className="gutter-row" span={6}>
                           <Image
                              style={projectImageStyle}
                              src={ProjectBanner}
                              className='bg-white'
                              preview={false}
                           />
                        </Col>
                     </Row>
                  </div>
               </div>
            </Carousel>
         </div>
      </div>
   )
}
export default ListProject