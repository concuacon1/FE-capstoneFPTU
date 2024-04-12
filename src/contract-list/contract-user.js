import React, { useEffect, useState } from "react";
import FooterComponent from "../footer/index";
import dayjs from 'dayjs';
import HeaderComponent from "../header/index";
import VuGia from "../images/Vu_gia.png";
import { Card } from 'antd';
import { Image, Switch } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import instance from "../configApi/axiosConfig";

const { Meta } = Card;

const ScheduleCard = () => {
    return (
        <Card style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'center', background: 'rgba(102, 112, 133, 0.20)', width: '80%', padding: '50px', margin: '0 auto' }}>
                <div style={{ width: '182px', height: '210px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        height={'100%'}
                        src={VuGia}
                        preview={false}
                    />
                </div>
                <div style={{ marginLeft: 100, fontSize: 40, fontWeight: 500, color: 'black', fontFamily: 'Roboto' }}>
                    <p>Hợp đồng thiết kế</p>
                    <p>Ngày 20/12/2017</p>
                    <button>Xem chi tiết</button>
                </div>
            </div>
        </Card >
    );
};

const ContractUser = () => {

    useEffect(() => {
        async function fetchData() {
            try {
                const calendarRes = await instance.get('/schedule/user-list-schedule');
                if (calendarRes.data.data.length === 0) {
                }
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
            <div className="table-account ">
                <div className="text-4xl bg-account text-white font-bold flex" style={{ alignItems: 'center', height: '100px' }}>
                    <ScheduleCard />
                </div>
            </div>
            <div className="border-2 pt-2 pb-2"></div>
            <FooterComponent />
        </div>
    );
};

export default ContractUser;
