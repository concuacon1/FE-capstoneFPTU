import React, { useEffect, useState } from "react";
import FooterComponent from "../footer/index";
import HeaderComponent from "../header/index";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import instance from "../configApi/axiosConfig";

const ContractDetail = () => {
    const { contract_id } = useParams()
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getAllUser() {
            try {
                const dataRes = await instance.get(`/contract_detail/${contract_id}`);
                const dataDB = dataRes.data.data.contract;
                setData(dataDB[0]);
            } catch (error) {
                if (error?.response?.status === 402) {
                    return toast.error(error.response.data.errors[0].msg)
                } else if (error.response.status === 400) {
                    return toast.error(error.response.data.message)
                } else if (error.response.status === 403) {
                    return toast.error(error.response.data.message)
                } else {
                    return toast.error("Server error")
                }
            }
        }

        getAllUser()
    }, [])

    return (
        <div className="h-screen">
            <ToastContainer />
            <div className="table-account ">
                <embed
                    src={data.imageContract}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                />
            </div>

            <div className="border-2 pt-2 pb-2"></div>
        </div>
    );
};

export default ContractDetail;
