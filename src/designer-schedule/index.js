import { Alert, Button, Calendar, Modal } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import FooterComponent from "../footer/index";
import HeaderComponent from "../header/index";

const DesignerSchedule = () => {
    const [value, setValue] = useState(() => dayjs('2017-01-25'));
    const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));
    const [currentDateArray, setCurrentDateArray] = useState([
        '2024-03-01',
        '2024-03-02',
        '2024-03-03',
        '2024-03-04',
    ]);

    const [busyDate, setBusyDate] = useState([
        '2024-03-16',
        '2024-03-23',
        '2024-03-30',
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedDateModalVisible, setSelectedDateModalVisible] = useState(false);
    const [selectedDateModalValue, setSelectedDateModalValue] = useState(null);

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
        setBusyDate([...busyDate, ...selectedDates]);
        setModalVisible(false);
        setSelectedDates([]);
    };

    const handleCancel = () => {
        setModalVisible(false);
        setSelectedDates([]);
    };

    const handleDateSelect = (date) => {
        const formattedDate = dayjs(date);
        const formattedDateString = formattedDate.format('YYYY-MM-DD');

        // Kiểm tra nếu ngày đã chọn có màu đỏ hoặc xám, không thêm vào danh sách được chọn
        if (currentDateArray.includes(formattedDateString) || busyDate.includes(formattedDateString)) {
            return;
        }

        // Nếu không, hiển thị Modal để đặt lịch cho ngày được chọn
        setSelectedDateModalValue(formattedDate);
        setSelectedDateModalVisible(true);

        // Thêm ngày vào danh sách được chọn
        setSelectedDates(prevSelectedDates => [...prevSelectedDates, formattedDateString]);
    };

    const handleDateModalOk = () => {
        // Thêm logic xử lý khi người dùng hoàn tất việc đặt lịch cho ngày được chọn
        setSelectedDateModalVisible(false);
    };

    const handleDateModalCancel = () => {
        // Ẩn Modal đặt lịch cho ngày được chọn
        setSelectedDateModalVisible(false);
    };

    const customDateCellRender = (date, currentDateArray, busyDate) => {
        const currentDateObjects = currentDateArray.map(dateString => dayjs(dateString));
        const busyDateObjects = busyDate.map(dateString => dayjs(dateString));

        const isDateInArray = currentDateObjects.find(d => d.isSame(date, 'day'));
        const isBusyDate = busyDateObjects.find(d => d.isSame(date, 'day'));

        if (isDateInArray) {
            return (
                <div style={{ backgroundColor: 'red', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                </div>
            );
        }

        if (isBusyDate) {
            return (
                <div style={{ backgroundColor: 'gray', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                </div>
            );
        }

        return <div></div>;
    };

    const CustomCalendar = ({ currentDateArray, busyDate }) => {
        return <Calendar dateCellRender={(date) => customDateCellRender(date, currentDateArray, busyDate)} onSelect={handleDateSelect} />;
    };

    return (
        <div className="h-screen">
            <HeaderComponent />
            <ToastContainer />
            <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
            <Button onClick={handleEdit}>Edit</Button>
            <CustomCalendar currentDateArray={currentDateArray} busyDate={busyDate} />
            <Modal
                title="Select Dates"
                visible={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Select dates to mark as busy:</p>
                <Calendar
                    onSelect={(date) => handleDateSelect(date.format('YYYY-MM-DD'))}
                    dateCellRender={(date) => {
                        const formattedDate = date.format('YYYY-MM-DD');
                        return (
                            <div
                                style={{
                                    backgroundColor: selectedDates.includes(formattedDate) ? 'blue' : busyDate.includes(formattedDate) ? 'gray' : 'transparent',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onClick={() => handleDateSelect(formattedDate)}
                            >
                                {date.date()}
                            </div>
                        );
                    }}
                />
            </Modal>
            <Modal
                title="Set Schedule"
                visible={selectedDateModalVisible}
                onOk={handleDateModalOk}
                onCancel={handleDateModalCancel}
            >
                <p>Select schedule for {selectedDateModalValue?.format('YYYY-MM-DD')}:</p>
                {/* Add your schedule input components here */}
            </Modal>
            <FooterComponent />
        </div >
    );
};

export default DesignerSchedule;
