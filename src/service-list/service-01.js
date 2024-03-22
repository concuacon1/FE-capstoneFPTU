import React from "react";
import { Image } from "antd"
import ProjectListBannerImage from "../images/list-project-screen-banner.png"
import DesignImage from "../images/vgdesign-image.png"
import BuildImage from "../images/vgbuild-image.png"
import './service-info.css'
const Service = () => {
	return (
		<div className="service">
			<div className='service__image-banner'>
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
					<p className='description'>Thiết kế và thi công trọn gói căn hộ</p>
					<hr />
				</div>
				<div className="body">
					<div className="title">
						Một giải pháp thông minh cho những ai đang tìm kiếm sự chuyên nghiệp và sáng tạo trong việc thiết kế không gian sống hoặc làm việc của mình.
					</div>
					<div className="content">
						<div className="content-01">
							<div className="left-content">
								<div className="content-name">
									VG DESIGN
								</div>
								<hr />
								<div className="content-desc">
									Với đội ngũ kiến trúc sư tài năng và giàu kinh nghiệm, chúng tôi cam kết mang đến cho khách hàng những giải pháp độc đáo và phản ánh chính xác nhu cầu và phong cách của họ.<br />
									Từ việc tư vấn thiết kế ban đầu đến việc triển khai dự án, chúng tôi luôn đảm bảo sự chăm sóc và hỗ trợ toàn diện, giúp khách hàng hoàn thiện mọi ý tưởng thành hiện thực một cách hoàn hảo nhất.<br />
									Đặc biệt, dịch vụ cho thuê kiến trúc sư của chúng tôi linh hoạt và phù hợp với mọi quy mô dự án, từ nhỏ đến lớn, từ cá nhân đến doanh nghiệp. Hãy để chúng tôi làm điều kỳ diệu cho không gian của bạn!
								</div>
							</div>
							<div className="image">
								<Image
									style={{ width: "100vw", height: "600px", objectFit: "cover" }}
									src={DesignImage}
									className='bg-white'
									preview={false}
								/>
							</div>
						</div>
						<div className="content-02">
							<div className="left-content">
								<div className="content-name">
									VG BUILD
								</div>
								<hr />
								<div className="content-desc">
									Bắt đầu từ việc lắng nghe và hiểu rõ nhu cầu và mong muốn của khách hàng cùng với đội ngũ thiết kế sẽ tạo ra các bản vẽ và mô hình 3D để minh họa ý tưởng và thiết kế.<br />
									Khi đạt được sự hài lòng về thiết kế, chúng tôi tiến hành chọn lựa các vật liệu và công nghệ sản xuất phù hợp nhất từ những mẫu mã sản phẩm cho tới các kỹ thuật lắp ráp.<br />
									Quá trình sản xuất sản phẩm sẽ bắt đầu với sự chăm sóc tỉ mỉ từ việc cắt, gia công, và lắp ráp. Chúng tôi luôn tuân thủ các tiêu chuẩn chất lượng nghiêm ngặt để đảm bảo mỗi sản phẩm đều đạt được độ hoàn hảo cao nhất.<br />
									Sau khi hoàn thành, đội ngũ kiểm tra chất lượng sẽ kiểm tra từng chi tiết để đảm bảo sản phẩm đáp ứng đúng các yêu cầu và tiêu chuẩn.
								</div>
							</div>
							<div className="image">
								<Image
									style={{ width: "100vw", height: "800px", objectFit: "cover" }}
									src={BuildImage}
									className='bg-white'
									preview={false}
								/>
							</div>
						</div>
						<div className="content-03">
							<div className="content-desc">
								Cuối cùng, sản phẩm được giao đến khách hàng với sự chăm sóc và dịch vụ hậu mãi tốt nhất. Quy trình sản xuất nội thất của chúng tôi không chỉ đảm bảo sự chất lượng mà còn đem lại sự hài lòng tuyệt đối cho khách hàng.
							</div>
							<button className="button" type="button">
								NHẬN BÁO GIÁ NGAY
							</button>
						</div>
					</div>
					<div className="other-service">
						<div className="title">
							CÁC DỊCH VỤ KHÁC
						</div>
						<hr />
						<div>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default Service;