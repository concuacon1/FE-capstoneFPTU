import { Input as AntdInput, Button, Calendar, Checkbox, Form, Input, Modal, Select } from "antd";
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
    const [value, setValue] = useState(() => dayjs('2017-01-25'));
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeOfDay, setTimeOfDay] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [note, setNote] = useState('');
    const [emailEdit, setEmailEdit] = useState('');
    const [noteEdit, setNoteEdit] = useState('');
    const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));
    const [scheduleId, setScheduleId] = useState('');

    const [busyDate, setBusyDate] = useState([]);
    const [workOnDate, setWorkOnDate] = useState([]);

    const checkRole = JSON.parse(localStorage.getItem('datawebfpt'))?.role || '';

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedDateModalVisible, setSelectedDateModalVisible] = useState(false);
    const [selectedDateModalValue, setSelectedDateModalValue] = useState(null);
    const [confirmChecked, setConfirmChecked] = useState(false);
    const [waitingForApprovalModalVisible, setWaitingForApprovalModalVisible] = useState(false);
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

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue) => {
        setValue(newValue);
    };

    const handleEdit = () => {
        setModalVisible(true);
    };

    const handleOk = () => {
        // setBusyDate([...busyDate, ...selectedDates]);
        // setModalVisible(false);
        // setSelectedDates([]);
        if (confirmChecked) {
            // Show confirmation alert
            Modal.confirm({
                title: 'Xác nhận',
                content: 'Bạn có chắc chắn muốn xác nhận thời gian làm việc?',
                onOk() {
                    // Handle OK button click
                    setBusyDate([...busyDate, ...selectedDates]);
                    setModalVisible(false);
                    instance.post(`/schedule/${designer_id}/confirm`, {
                        timeWorkOn: selectedDates,
                        description_off: scheduleId,
                        email: email
                    }).then(response => {
                        console.log('Request thành công:', response.data);
                    }).catch(error => {
                        console.error('Đã xảy ra lỗi:', error);
                    });
                    setSelectedDates([]);
                    setConfirmChecked(false); // Reset checkbox
                    setSelectedDateModalVisible(false);
                },
                onCancel() {
                    // Handle Cancel button click
                },
            });
        } else {
            toast.error("Bạn cần xác nhận với thời gian làm việc trước khi xác nhận.");
        }
    };

    const handleCancel = () => {
        setModalVisible(false);
        setSelectedDates([]);
        setConfirmChecked(false); // Reset checkbox
    };

    const handleDateSelectEdit = (date) => {
        const formattedDate = dayjs(date);
        const formattedDateString = formattedDate.format('YYYY-MM-DD');

        if (busyDate && busyDate.includes(formattedDateString)) {
            return;
        }

        setSelectedDateModalValue(formattedDate);
        setSelectedDates(prevSelectedDates => [...prevSelectedDates, formattedDateString]);
    };

    const handleDateSelect = (date) => {
        const formattedDate = dayjs(date);
        const formattedDateString = formattedDate.format('YYYY-MM-DD');

        if (busyDate && busyDate.includes(formattedDateString) || workOnDate && workOnDate.includes(formattedDateString)) {
            return;
        }
        if (isBooked) {
            setWaitingForApprovalModalVisible(true);
            return;
        }
        setSelectedDateModalVisible(true);
        setSelectedDate(date);
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
                        email: email
                    }).then(response => {
                        console.log('Request thành công:', response.data);
                    }).catch(error => {
                        console.error('Đã xảy ra lỗi:', error);
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
        if (!busyDate || !workOnDate) {
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

        return (
            <div style={{ backgroundColor: backgroundColor, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            </div>
        );
    };

    const handleConfirmCheckboxChange = (e) => {
        setConfirmChecked(e.target.checked);
    };

    const CustomCalendar = ({ busyDate }) => {
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
                {
                    checkRole === "DESIGNER" && (
                        <Button onClick={handleEdit}>Chọn ngày nghỉ</Button>
                    )
                }
                {
                    checkRole != "DESIGNER" && (
                        <h1 style={{ fontWeight: 'bold' }}>Lịch trình của kiến trúc sư {designerInfo?.fullName}</h1>
                    )
                }
                <CustomCalendar busyDate={busyDate} />
                <Modal
                    title="Chọn ngày nghỉ"
                    open={modalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Calendar
                        onSelect={(date) => handleDateSelectEdit(date.format('YYYY-MM-DD'))}
                        cellRender={(date) => {
                            const formattedDate = date.format('YYYY-MM-DD');
                            return (
                                <div
                                    style={{
                                        backgroundColor: selectedDates && selectedDates.includes(formattedDate) ? 'blue' :
                                            busyDate && busyDate.includes(formattedDate) ? 'gray' :
                                                workOnDate && workOnDate.includes(formattedDate) ? 'green' :
                                                    'transparent',

                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onClick={() => handleDateSelectEdit(formattedDate)}
                                >
                                </div>
                            );
                        }}
                    />
                    <Form>
                        <Form.Item label="Email">
                            <Input value={emailEdit} onChange={(e) => setEmailEdit(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Ghi chú">
                            <AntdInput.TextArea value={noteEdit} onChange={(e) => setNoteEdit(e.target.value)} />
                        </Form.Item>
                        <Form.Item>
                            <Checkbox onChange={handleConfirmCheckboxChange}>Chắc chắn với thời gian làm việc</Checkbox>
                        </Form.Item>
                    </Form>
                </Modal>
                {
                    checkRole === "CUSTOMER" && (
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
                                    <Input disabled value={selectedDate ? selectedDate.format('DD/MM/YYYY') : ''} />
                                </Form.Item>
                                <Form.Item label="Thời gian">
                                    <Select onChange={handleTimeChange} value={timeOfDay}>
                                        <Option value="BRIGHT">Sáng: 8h00 - 11h30</Option>
                                        <Option value="AFTERNOON">Chiều: 14h00 - 17h30</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Số điện thoại">
                                    <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Email">
                                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Ghi chú">
                                    <AntdInput.TextArea value={note} onChange={(e) => setNote(e.target.value)} />
                                </Form.Item>
                            </Form>
                        </Modal>
                    )
                }
                <Modal
                    title="Đang chờ phê duyệt"
                    visible={waitingForApprovalModalVisible}
                    onCancel={() => setWaitingForApprovalModalVisible(false)}
                    footer={[
                        <Button key="ok" type="primary" onClick={() => setWaitingForApprovalModalVisible(false)}>
                            OK
                        </Button>
                    ]}
                >
                    <p>Đang chờ phê duyệt</p>
                </Modal>

            </div>
            <FooterComponent />
        </div >
    );
};

export default DesignerSchedule;
