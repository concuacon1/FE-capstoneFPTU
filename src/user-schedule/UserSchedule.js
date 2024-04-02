import React, { useState, useEffect } from 'react';
import { Card } from 'antd'; // Import Ant Design Card component
import dayjs from 'dayjs'; // Import dayjs for date formatting
import instance from "../configApi/axiosConfig";
import HeaderComponent from '../header';
import { ToastContainer } from 'react-toastify';
import FooterComponent from '../footer';

const { Meta } = Card; // Destructure Meta component from Card

const ScheduleCard = ({ key, designerName, scheduleInfo }) => {
    const currentDate = dayjs();
    const bookedDate = dayjs(scheduleInfo.timeWork);
    const daysUntilBooked = bookedDate.diff(currentDate, 'day');

    return (
        <Card style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'center', background: 'rgba(102, 112, 133, 0.20)', width: '80%', padding: '50px', margin: '0 auto' }}>
                <div style={{ width: '182px', height: '210px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{
                        fontSize: '32px',
                        color: 'rgb(255, 255, 255)',
                        backgroundColor: 'blue',
                        width: '100%',
                        borderTopLeftRadius: '15px',
                        borderTopRightRadius: '15px',
                        textAlign: 'center',
                    }}>{dayjs(scheduleInfo.timeWork).format('ddd')}</div>
                    <div style={{
                        backgroundColor: 'white', width: '100%', height: '100%', borderBottomLeftRadius: '15px',
                        borderBottomRightRadius: '15px', textAlign: 'center'
                    }}>
                        <div style={{ fontSize: 62 }}>{dayjs(scheduleInfo.timeWork).format('DD')}</div>
                        <div style={{ fontSize: 20 }}>{dayjs(scheduleInfo.timeWork).format('MM')}</div>
                    </div>
                </div>
                <div style={{ marginLeft: 100, fontSize: 40, fontWeight: 500, color: 'black', fontFamily: 'Roboto' }}>
                    {
                        scheduleInfo.timeSelect === "AFTERNOON" ? <p>- Chiều : 14h00 – 17h30</p> : <p>- Sáng : 8h30 - 11h00</p>
                    }
                    <p>- Tên kiến trúc sư: {designerName.fullName}</p>
                    <p>- Còn {daysUntilBooked} ngày ...</p>
                </div>
            </div>
        </Card >
    );
};

const UserSchedule = () => {
    const [scheduleData, setScheduleData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const calendarRes = await instance.get('/schedule/user-list-schedule');
                setScheduleData(calendarRes.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="h-screen">
            <HeaderComponent />
            <ToastContainer />
            {scheduleData.map((item, index) => (
                <ScheduleCard
                    key={index}
                    designerName={item.designerInfo}
                    scheduleInfo={item.scheduleInfo}
                />
            ))}
            <FooterComponent />
        </div>
    );
};

export default UserSchedule;
