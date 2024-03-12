import React, { useState } from 'react';
import { Image } from 'antd';
import { Button, Flex, Popover } from 'antd';
import { Avatar } from 'antd';
import { FloatButton, Row, Col } from 'antd';
import ProjectValueBannerImage from '../images/project-screen-banner.png'
import AvatarCustomer from '../images/avatar-customer.png';
import AIchatBoxIcon from '../images/support.png'
import '../App.css'
import './project-value.css'

const ProjectValue = () => {
   const [clicked, setClicked] = useState(false);
   const [hovered, setHovered] = useState(false);
   const hide = () => {
      setClicked(false);
      setHovered(false);
   };
   const handleHoverChange = (open) => {
      setHovered(open);
      setClicked(false);
   };
   const handleClickChange = (open) => {
      setHovered(false);
      setClicked(open);
   };
   const hoverContent = <div style={{ fontSize: "24px" }}>Có thể giúp gì cho bạn ... ?</div>;
   const clickContent = <div ></div>;
   return (
      <div className="project-value-screen" style={{ backgroundColor: '#DED49F' }}>
         <div className='project-value-screen__image-banner'>
            <Image
               style={{ width: "100vw", height: "auto" }}
               src={ProjectValueBannerImage}
               className='bg-white'
               preview={false}
            />
         </div>
         <div className='project-value-screen__content'>
            <div className='project-feedback'>
               <div className='feedback-title'>FEEDBACK</div>
               <div className='feedback-container'>
                  <div className='feedback-avatar'>
                     <Avatar
                        size={343}
                        src={<img src={AvatarCustomer} alt="avatar" />}
                     />
                  </div>
                  <div className='feedback-content'>
                     " Cuối cùng thì mình cũng đã tìm được lời giải cho bài
                     toán khó nhất từ trước đến giờ của mình, chọn được mảnh đất
                     để làm nơi an cư lạc nghiệp đã khó ( Nhất Vị, Nhị Hướng ),
                     chọn được phương án thiết kế, thi công theo đúng sở thích
                     và công việc còn khó khăn hơn rất nhiều. Sau đúng 6 tháng
                     đưa lên đặt xuống, cuối cùng tôi và Ekip đã tìm dc lời giải
                     cho bài toán khó của mình. “
                  </div>
               </div>
            </div>
            <div className='project-value-container'>
               <div className='title'>Sản phẩm hoàn thiện</div>
               <div className='first-values'>
                  <div className='project-name'>Biệt thự Mr. Đức - Hà Đông</div>
                  <Button className='catalog'>Catalog</Button>
               </div>
               <div className='second-values'>
                  <div className='project-values'>
                     <div className='categories-and-date'>
                        <div className='category' >
                           <Flex vertical gap="20px" style={{ width: '100%' }}>
                              <Button type="primary" autoFocus>
                                 Phòng khách
                              </Button>
                              <Button type="primary">
                                 Phòng ngủ
                              </Button>
                              <Button type="primary">
                                 Nhà tắm
                              </Button>
                              <Button type="primary">
                                 Sân vườn
                              </Button>
                           </Flex>
                        </div>
                        <div className='date'>
                           <label className='design-date'>
                              Design date : <span className='date-value'>20/10/2024</span></label>
                           <label className='construction-date'>
                              Construction date: <span className='date-value'>20/10/2024</span></label>
                        </div>
                     </div>
                     <div className='middle-line'>
                        <hr />
                     </div>
                     <div className='category-images'>
                        <Row gutter={[40, 24]}>
                           <Col className="gutter-row" span={12}>
                              <Image
                                 src={ProjectValueBannerImage}
                                 className='bg-white'
                                 preview={true}
                              />
                           </Col>
                           <Col className="gutter-row" span={12}>
                              <Image
                                 src={AvatarCustomer}
                                 className='bg-white'
                                 preview={true}
                              />
                           </Col>
                           <Col className="gutter-row" span={12}>
                              <Image
                                 src={ProjectValueBannerImage}
                                 className='bg-white'
                                 preview={true}
                              />
                           </Col>
                           <Col className="gutter-row" span={12}>
                              <Image
                                 src={ProjectValueBannerImage}
                                 className='bg-white'
                                 preview={true}
                              />
                           </Col>
                           <Col className="gutter-row" span={12}>
                              <Image
                                 src={ProjectValueBannerImage}
                                 className='bg-white'
                                 preview={true}
                              />
                           </Col>
                           <Col className="gutter-row" span={12}>
                              <Image
                                 src={ProjectValueBannerImage}
                                 className='bg-white'
                                 preview={true}
                              />
                           </Col>
                           <Col className="gutter-row" span={12}>
                              <Image
                                 src={ProjectValueBannerImage}
                                 className='bg-white'
                                 preview={true}
                              />
                           </Col>
                           <Col className="gutter-row" span={12}>
                              <Image
                                 src={ProjectValueBannerImage}
                                 className='bg-white'
                                 preview={true}
                              />
                           </Col>
                        </Row>
                     </div>
                  </div>
               </div>
               <div className='third-values'>
                  <div className='bottom-line'>
                     <hr />
                  </div>
                  <div className='designer-info'>
                     Design by <span className='designer-name'>Văn Minh Tuấn</span>
                  </div>
               </div>
            </div>
         </div>
         <div>
            <div className='AIchatBoxIcon'>
               <Popover
                  style={{
                     width: 500,
                  }}
                  placement="leftBottom"
                  content={hoverContent}
                  title="Vũ Gia"
                  trigger="hover"
                  open={hovered}
                  onOpenChange={handleHoverChange}
               >
                  <Popover
                     content={
                        <div>
                           {clickContent}
                           <a onClick={hide}>Close</a>
                        </div>
                     }
                     placement="leftBottom"
                     title="Vũ Gia"
                     trigger="click"
                     open={clicked}
                     onOpenChange={handleClickChange}
                  >
                     <Image
                        src={AIchatBoxIcon}
                        preview={false}
                     />
                  </Popover>
               </Popover>
            </div>
         </div>
         <FloatButton.BackTop />
      </div >
   )
}
export default ProjectValue;