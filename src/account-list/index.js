import HeaderComponent from "../header/index";
import { useState } from "react";
import FooterComponent from "../footer/index";
import VuGia from "../images/Vu_gia.png";
// import { Image } from "antd";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { toast, ToastContainer } from 'react-toastify'
import instance from "../configApi/axiosConfig"

const AccountList = () => {
    const [formSearch, setFormSearch] = useState({
        userCode: "",
        fullName: "",
        role: "",
        startDate: "",
        endDate: "",
    });
   

    const onChangeInput = (event) => {
        const data = {
            ...formSearch,
            [event.target.name]: event.target.value,
        };

        setFormSearch(data);
    };


    const searchData = async () =>{
        try {
            const dataCreate = await instance.post("/search_user_role_admin", formSearch);
             console.log(dataCreate)
            return toast.success(dataCreate.data.message)
        } catch (error) {
            if (error.response.status === 402) {
                return toast.error(error.response.data.errors[0].msg)
            } else if (error.response.status === 400) {
                return toast.error(error.response.data.message)
            }else if (error.response.status === 401) {
                return toast.error(error.response.data.message)
            }
            return toast.error("Server error")
        }
    }

    const handleDateRangeChange = (newDateRange) => {
        const data = {
            ...formSearch,
            startDate: newDateRange[0],
            endDate :  newDateRange[1],
        };
        setFormSearch(data);
      };

    return (
        <div>
            <HeaderComponent />
            <ToastContainer />
            <div className="table-account ">
                <div className="text-4xl bg-account mt-5 text-white font-bold">
                    Accounts List
                </div>

                <div className="flex justify-center">
                    <div>
                        <div className="flex mt-5 items-center justify-center">
                            <div
                                className="flex items-center justify-around"

                            >
                                <div className="flex items-center justify-around">
                                    <div className="text-2xl font-semibold pr-5">Permission</div>
                                    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                        <InputLabel id="demo-select-small-label">
                                            --Choose--
                                        </InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={formSearch.role}
                                            label="--Choose--"
                                            onChange={onChangeInput}
                                            name="role"
                                        >
                                            <MenuItem value={"DESIGNER"}>DESIGNER</MenuItem>
                                            <MenuItem value={"STAFF"}>STAFF</MenuItem>
                                            <MenuItem value={"CUSTOMER"}>CUSTOMER</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="date_time_search flex items-center justify-center pl-10">
                                    <div className="text-2xl font-semibold pr-5">
                                        {" "}
                                        Created Date{" "}
                                    </div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer
                                            components={[
                                                "DatePicker",
                                                "TimePicker",
                                                "DateTimePicker",
                                                "DateRangePicker",
                                            ]}
                                        >
                                            <DemoItem component="DateRangePicker">
                                                <DateRangePicker
                                                  value={[formSearch.startDate , formSearch.endDate]}
                                                  onChange={handleDateRangeChange}
                                                    localeText={{
                                                        start: "",
                                                        end: "",
                                                    }}
                                                />
                                            </DemoItem>
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-5 items-center justify-around">
                            <div >
                                <div className="flex mt-5 items-center justify-around">
                                    <div className="flex items-center justify-around ">
                                        <div className="text-2xl font-semibold pr-5">
                                            Account code{" "}
                                        </div>
                                        <TextField
                                            label="Account code "
                                            id="outlined-start-adornment"
                                            name="userCode"
                                            onChange={onChangeInput}
                                            value={formSearch.userCode}
                                            sx={{ m: 1, width: "280px", height: "50px" }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>

                                    <div className="flex items-center justify-center pl-10">
                                        <div className="text-2xl font-semibold pr-5">
                                            User name{" "}
                                        </div>
                                        <TextField
                                            label="User name"
                                            id="outlined-start-adornment"
                                            name="fullName"
                                            onChange={onChangeInput}
                                            value={formSearch.fullName}
                                            sx={{ m: 1, width: "280px" }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-center pl-10 pt-2">
                            <button
                                className="custombutton-register-designer"
                                style={{ width: "150px", marginTop: "5" }}
                                type="submit"
                                onClick={searchData}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-2 pt-2 pb-2"></div>
            <FooterComponent />
        </div>
    );
};

export default AccountList;
