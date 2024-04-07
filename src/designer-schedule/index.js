import { Input as AntdInput, Button, Calendar, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import instance from "../configApi/axiosConfig";
import FooterComponent from "../footer/index";
import HeaderComponent from "../header/index";

const { Option } = Select;

const DesignerSchedule = () => {
    const { designer_id } = useParams();
    const [designerInfo, setDesignerInfo] = useState({});
    const [userId, setUserId] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeOfDay, setTimeOfDay] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [place, setPlace] = useState('');
    const [note, setNote] = useState('');
    const [scheduleId, setScheduleId] = useState('');
    const [scheduleBooked, setScheduleBooked] = useState({});
    const [busyDate, setBusyDate] = useState([]);
    const [workOnDate, setWorkOnDate] = useState([]);

    const checkRole = JSON.parse(localStorage.getItem('datawebfpt'))?.role || '';

    const [selectedDateModalVisible, setSelectedDateModalVisible] = useState(false);
    const [waitingForApprovalModalVisible, setWaitingForApprovalModalVisible] = useState(false);
    const [confirmBookModalVisible, setConfirmBookModalVisible] = useState(false);
    const [isBooked, setIsBooked] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const [calendarRes, designerRes] = await Promise.all([
                    instance.get(`/schedule/${designer_id}/busy-dates`),
                    instance.post(`/update-designer/${designer_id}`)
                ]);
                setBusyDate(calendarRes.data.busyDates);
                setWorkOnDate(calendarRes.data.workOnDates);
                setUserId(calendarRes.data.designerId)
                setScheduleId(calendarRes.data.scheduleId);
                setIsBooked(calendarRes.data?.isSelectBook);
                setDesignerInfo(designerRes.data.message[0].dataDesigner[0]);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [designer_id]);

    const handleTimeChange = (value) => {
        setTimeOfDay(value);
    };

    const handleDateSelect = async (date) => {
        const formattedDate = dayjs(date);
        const formattedDateString = formattedDate.format('YYYY-MM-DD');

        if (busyDate && busyDate.includes(formattedDateString) && !workOnDate.includes(formattedDateString)) {
            return;
        }
        if (isBooked && workOnDate.length === 0) {
            setWaitingForApprovalModalVisible(true);
            return;
        }
        if (isBooked && workOnDate.length > 0) {
            const scheduleInfo = await instance.get('/schedule/user-info', {
                params: {
                    timeWork: formattedDateString
                }
            });
            if (scheduleInfo.data.data.length > 0) {
                setScheduleBooked(scheduleInfo.data.data[0]);
                setConfirmBookModalVisible(true);
            }
            return;
        }
        setSelectedDateModalVisible(true);
        setSelectedDate(formattedDateString);
    };

    const handleDateModalOk = () => {
        Modal.confirm({
            title: 'Xác nhận đặt lịch',
            content: 'Bạn có chắc chắn muốn đặt lịch với nhà thiết kế này không?',
            okText: 'Xác nhận',
            cancelText: 'Hủy bỏ',
            onOk() {
                if (scheduleId !== "") {
                    instance.post(`/schedule/${designer_id}/book`, {
                        timeSelect: timeOfDay,
                        id_schedule: scheduleId,
                        description_book: note,
                        timeWork: selectedDate,
                        phoneNumber: phoneNumber,
                        email: email,
                        place: place
                    }).then(response => {
                        window.location.reload();
                    }).catch(error => {
                        if (error.response.status === 402) {
                            return toast.error(error.response.data.errors[0].msg)
                        } else if (error.response.status === 400) {
                            return toast.error(error.response.data.message)
                        } else if (error.response.status === 403) {
                            return toast.error(error.response.data.message)
                        } else {
                            return toast.error("Server error")
                        }
                    });
                    setSelectedDateModalVisible(false);
                } else {
                    toast.error('Bạn đã đặt lịch hẹn với giảng viên này');
                }
            },
            onCancel() {
                // Không làm gì nếu người dùng hủy
            },
        });
    };

    const handleDateModalCancel = () => {
        setSelectedDateModalVisible(false);
    };

    const customDateCellRender = (date, busyDate, workOnDate) => {
        if (!busyDate) {
            return <div></div>;
        }

        const busyDateObjects = busyDate.map(dateString => dayjs(dateString));
        const isBusyDate = busyDateObjects.find(d => d.isSame(date, 'day'));

        const workOnDateObjects = workOnDate.map(dateString => dayjs(dateString));
        const isWorkOnDate = workOnDateObjects.find(d => d.isSame(date, 'day'));

        // Màu mặc định nếu không phải ngày bận hoặc ngày làm việc
        let backgroundColor = 'transparent';

        // Nếu là ngày bận, thì sử dụng màu xám
        if (isBusyDate) {
            backgroundColor = 'gray';
        }

        // Nếu là ngày làm việc, sử dụng màu xanh
        if (isWorkOnDate) {
            if (designer_id !== userId) {
                backgroundColor = 'gray';
            } else {
                backgroundColor = 'green';
            }
        }

        // Nếu workOnDate là một mảng rỗng và isBooked là true, đặt màu vàng cho ngày cuối cùng trong busyDate
        if (workOnDate.length === 0 && isBooked) {
            const lastBusyDate = busyDateObjects[busyDateObjects.length - 1];
            if (lastBusyDate && lastBusyDate.isSame(date, 'day')) {
                backgroundColor = 'yellow';
            }
        }

        return (
            <div style={{ backgroundColor: backgroundColor, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            </div>
        );
    };

    const CustomCalendar = ({ busyDate, workOnDate }) => {
        return (
            <div>
                <Calendar cellRender={(date) => customDateCellRender(date, busyDate, workOnDate)} onSelect={handleDateSelect} />
                {
                    checkRole === "CUSTOMER" && (
                        <>
                            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '20px', height: '20px', backgroundColor: 'gray', marginRight: '5px' }}></div>
                                <span>Ngày bận của kiến trúc sư</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                <div style={{ width: '20px', height: '20px', backgroundColor: 'transparent', border: '1px solid #000', marginRight: '5px' }}></div>
                                <span>Ngày có thể chọn và đặt lịch</span>
                            </div>
                        </>
                    )
                }
            </div>
        );
    };

    return (
        <div className="h-screen">
            <HeaderComponent />
            <ToastContainer />
            <div style={{ padding: '50px' }}>
                <h1 style={{ fontWeight: 'bold' }}>Lịch trình của kiến trúc sư {designerInfo?.fullName}</h1>
                <CustomCalendar busyDate={busyDate} workOnDate={workOnDate} />
                <Modal
                    title="Đặt lịch hẹn"
                    open={selectedDateModalVisible}
                    onOk={handleDateModalOk}
                    onCancel={handleDateModalCancel}
                >
                    <Form>
                        <Form.Item label="Tên nhà thiết kế">
                            <Input disabled value={designerInfo?.fullName} />
                        </Form.Item>
                        <Form.Item label="Ngày">
                            <Input disabled value={selectedDate} />
                        </Form.Item>
                        <Form.Item label="Thời gian">
                            <Select onChange={handleTimeChange} value={timeOfDay}>
                                <Option value="BRIGHT">Sáng: 8h00 - 11h30</Option>
                                <Option value="AFTERNOON">Chiều: 14h00 - 17h30</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Số điện thoại">
                            <Input value={designerInfo.phoneNumber} disabled />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input value={designerInfo.email} disabled />
                        </Form.Item>
                        <Form.Item label="Địa điểm">
                            <Input value={place} onChange={(e) => setPlace(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Ghi chú">
                            <AntdInput.TextArea value={note} onChange={(e) => setNote(e.target.value)} />
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="Thông báo"
                    visible={waitingForApprovalModalVisible}
                    onCancel={() => setWaitingForApprovalModalVisible(false)}
                    footer={[
                        <Button key="ok" onClick={() => setWaitingForApprovalModalVisible(false)}>
                            OK
                        </Button>
                    ]}
                >
                    <p>Đang chờ phê duyệt</p>
                </Modal>
                <Modal
                    title="Thông báo lịch hẹn"
                    visible={confirmBookModalVisible}
                    onCancel={() => setConfirmBookModalVisible(false)}
                    footer={[
                        <Button key="ok" onClick={() => setConfirmBookModalVisible(false)}>
                            OK
                        </Button>
                    ]}
                >
                    <Form>
                        <Form.Item label="Tên nhà thiết kế">
                            <Input disabled value={designerInfo?.fullName} />
                        </Form.Item>
                        <Form.Item label="Ngày">
                            <Input disabled value={scheduleBooked?.timeWork} />
                        </Form.Item>
                        <Form.Item label="Thời gian">
                            <Select value={scheduleBooked?.timeOfDay}>
                                {scheduleBooked?.timeOfDay === "BRIGHT" ? <Option value="BRIGHT">Sáng: 8h00 - 11h30</Option> : <Option value="AFTERNOON">Chiều: 14h00 - 17h30</Option>}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Số điện thoại">
                            <Input disabled value={scheduleBooked?.phoneNumber} />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input disabled value={scheduleBooked?.email} />
                        </Form.Item>
                        <Form.Item label="Địa điểm">
                            <Input disabled value={scheduleBooked?.place} />
                        </Form.Item>
                        <Form.Item disabled label="Ghi chú">
                            <AntdInput.TextArea disabled value={scheduleBooked?.description_book} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <FooterComponent />
        </div >
    );
};

export default DesignerSchedule;
