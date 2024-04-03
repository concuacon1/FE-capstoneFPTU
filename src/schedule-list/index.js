import React, { useEffect, useState } from "react";
import FooterComponent from "../footer/index";
import HeaderComponent from "../header/index";
import VuGia from "../images/Vu_gia.png";
// import { Image } from "antd";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Fade from '@mui/material/Fade';
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from '@mui/material/Paper';
import Select from "@mui/material/Select";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from "@mui/material/TextField";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Image } from "antd";
import dayjs from "dayjs";
import { ToastContainer, toast } from 'react-toastify';
import instance from "../configApi/axiosConfig";

const ScheduleList = () => {
    const [formSearch, setFormSearch] = useState({
        customerName: "",
        designerName: "",
        time: "",
        startDate: "",
        endDate: "",
    });

    const columns = [
        { id: 'customerName', label: 'Tên khách hàng', minWidth: 170, fontWeight: 600, fontSize: 20 },
        { id: 'designerName', label: 'Tên kiến trúc sư', minWidth: 100, fontWeight: 600, fontSize: 20 },
        {
            id: 'date',
            label: 'Ngày',
            minWidth: 170, fontWeight: 600, fontSize: 20,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'time',
            label: 'Thời gian',
            minWidth: 170, fontWeight: 600, fontSize: 20,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'status',
            label: 'Trạng thái',
            minWidth: 170, fontWeight: 600, fontSize: 20,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'action',
            label: 'Hành động',
            minWidth: 170,
            fontWeight: 600, fontSize: 20,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
    ];


    const [rowsData, setRowsData] = useState([])

    const [callApiReset, setCallApiReset] = useState(false)

    const handleTimeClick = (id) => {
        const index = rowsData.findIndex(row => row.id === id);
        console.log(rowsData, index);
        if (index !== -1) {
            const updatedRowData = [...rowsData];
            updatedRowData[index].time = updatedRowData[index].time === "Sáng" ? "Chiều" : "Sáng";
            setRowsData(updatedRowData);
        } else {
            console.error('Record not found in rowData array');
        }
    };

    const apiSearch = async () => {
        try {
            const dataSeachForm = {
                time: formSearch.time,
                designerName: formSearch.designerName,
                customerName: formSearch.customerName,
                startDate: formSearch.startDate,
                endDate: formSearch.endDate,
            };

            const dataRes = await instance.post("/list-search-all-schedule", dataSeachForm);
            const dataDB = dataRes.data.data;
            const rowData = dataDB.map(item_data => {
                const statusOptions = {
                    PENDING: 'Đang đợi',
                    APPROVED: 'Đồng ý',
                    REJECT: 'Từ chối'
                };

                return {
                    id: item_data.scheduleInfo._id,
                    customerName: item_data.customerInfo.fullName,
                    designerName: item_data.designerInfo.fullName,
                    date: item_data.scheduleInfo.timeWork,
                    time: item_data.scheduleInfo.timeSelect === "BRIGHT" ? "Sáng" : "Chiều",
                    status: (
                        <div>
                            <select className={getStatusColorClass(item_data.scheduleInfo.status)}>
                                {Object.entries(statusOptions).map(([key, value]) => (
                                    <option key={key} value={value} selected={item_data.scheduleInfo.status === key}>{value}</option>
                                ))}
                            </select>
                        </div>
                    ),
                    action: (
                        <div>
                            <button className="bg_confirm_schedule" onClick={() => confirm(item_data)}>Cập nhật</button>
                        </div>
                    )
                };
            });
            setRowsData(rowData);
        } catch (error) {
            if (error.response.status === 402) {
                return toast.error(error.response.data.errors[0].msg)
            } else if (error.response.status === 400) {
                return toast.error(error.response.data.message)
            } else if (error.response.status === 403) {
                return toast.error(error.response.data.message)
            } else {
                return toast.error("Server error")
            }
        }
    };

    const getStatusColorClass = (status) => {
        switch (status) {
            case 'PENDDING':
                return 'pending';
            case 'APPROVED':
                return 'approved';
            case 'REJECT':
                return 'reject';
            default:
                return '';
        }
    };

    const confirm = (item) => {
        console.log(item);
    }

    useEffect(() => {
        async function getAllUser() {
            try {
                const dataRes = await instance.get(`/list-all-schedule`);
                const dataDB = dataRes.data.data;
                const rowData = dataDB.map(item_data => {
                    const statusOptions = {
                        PENDING: 'Đang đợi',
                        APPROVED: 'Đồng ý',
                        REJECT: 'Từ chối'
                    };

                    return {
                        id: item_data.scheduleInfo._id,
                        customerName: item_data.customerInfo.fullName,
                        designerName: item_data.designerInfo.fullName,
                        date: item_data.scheduleInfo.timeWork,
                        time: item_data.scheduleInfo.timeSelect === "BRIGHT" ? "Sáng" : "Chiều",
                        status: (
                            <div>
                                <select
                                    className={getStatusColorClass(item_data.scheduleInfo.status)}
                                    onChange={(e) => handleStatusChange(e, item_data.scheduleInfo._id)}
                                    value={item_data.scheduleInfo.status}
                                    name="status" // Thêm thuộc tính name
                                >
                                    {Object.entries(statusOptions).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>
                        ),
                        action: (
                            <div>
                                <button className="bg_confirm_schedule" onClick={() => confirm(item_data)}>Cập nhật</button>
                            </div>
                        )
                    };
                });

                setRowsData(rowData);
            } catch (error) {
                console.log(error);
                switch (error?.response?.status) {
                    case 402:
                        toast.error(error.response.data.errors[0].msg);
                        break;
                    case 400:
                    case 403:
                        toast.error(error.response.data.message);
                        break;
                    default:
                        toast.error("Server error");
                }
            }
        }

        getAllUser();
    }, []);

    const handleStatusChange = (e, id) => {
        const { value } = e.target;

        console.log(value, id, rowsData);
    }

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const onChangeInput = (event) => {
        const data = {
            ...formSearch,
            [event.target.name]: event.target.value,
        };

        setFormSearch(data);
    };

    const handleDateRangeChange = (newDateRange) => {
        if (newDateRange && newDateRange.length === 2) {
            const startDate = newDateRange[0] ? dayjs(newDateRange[0]).format('YYYY-MM-DD') : null;
            const endDate = newDateRange[1] ? dayjs(newDateRange[1]).format('YYYY-MM-DD') : null;
            const data = {
                ...formSearch,
                startDate: startDate,
                endDate: endDate,
            };
            setFormSearch(data);
        }
    };

    return (
        <div className="h-screen">
            <HeaderComponent />
            <ToastContainer />
            <div className="table-account ">
                <div className="text-4xl bg-account text-white font-bold flex" style={{ alignItems: 'center', height: '100px' }}>
                    <Image
                        height={'100%'}
                        src={VuGia}
                        preview={false}
                    />
                    <div style={{ marginLeft: '40px' }}>Danh sách lịch hẹn</div>
                </div>

                <div className="flex justify-center">
                    <div>
                        <div className="flex mt-5 items-center justify-center">
                            <div className="flex items-center justify-around">
                                <div className="flex items-center justify-around">
                                    <div className="text-2xl pr-5">Thời gian</div>
                                    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                        <InputLabel id="demo-select-small-label">
                                            --Chọn--
                                        </InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            defaultValue="All"
                                            id="demo-select-small"
                                            value={formSearch.time}
                                            label="--Choose--"
                                            onChange={onChangeInput}
                                            name="time"
                                        >
                                            <MenuItem value={"All"}>--Chọn--</MenuItem>
                                            <MenuItem value={"BRIGHT"}>Sáng</MenuItem>
                                            <MenuItem value={"AFTERNOON"}>Chiều</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="date_time_search flex items-center justify-center pl-10">
                                    <div className="text-2xl pr-5">
                                        {" "}
                                        Ngày{" "}
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
                                                    value={[formSearch.startDate, formSearch.endDate]}
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
                                <div className="pl-10">
                                    <button
                                        className="custombutton-register-designer"
                                        style={{ width: "150px", marginTop: "5" }}
                                        type="submit"
                                        onClick={apiSearch}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-5 items-center justify-around">
                            <div >
                                <div className="flex mt-5 items-center justify-around">
                                    <div className="flex items-center justify-around ">
                                        <div className="text-2xl pr-5">
                                            Tên khách hàng{" "}
                                        </div>
                                        <TextField
                                            size="small"
                                            id="outlined-start-adornment"
                                            name="customerName"
                                            onChange={onChangeInput}
                                            value={formSearch.customerName}
                                            sx={{ m: 1, width: "280px", height: "50px" }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>

                                    <div className="flex items-center justify-center pl-10">
                                        <div className="text-2xl pr-5">
                                            Tên kiến trúc sư{" "}
                                        </div>
                                        <TextField
                                            size="small"
                                            id="outlined-start-adornment"
                                            name="designerName"
                                            onChange={onChangeInput}
                                            value={formSearch.designerName}
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
                </div>

                <Paper sx={{ width: '100%', overflow: 'hidden', height: '850px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="px-20 pt-10">
                    <TableContainer sx={{}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead style={{ background: 'linear-gradient(90deg, #422817 0%, #A8653B 100%)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, fontWeight: column.fontWeight, fontSize: column.fontSize }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowsData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    // Nếu là cột thời gian, thêm hàm xử lý sự kiện khi click vào
                                                    if (column.id === "time") {
                                                        return (
                                                            <TableCell key={column.id} align={column.align} onClick={() => handleTimeClick(row.id)}>
                                                                {row[column.id]} <KeyboardArrowDownIcon />
                                                            </TableCell>
                                                        );
                                                    }
                                                    // Nếu không phải là cột thời gian, hiển thị giá trị bình thường
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof row[column.id] === 'number'
                                                                ? column.format(row[column.id])
                                                                : row[column.id]}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rowsData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </div>

            <div className="border-2 pt-2 pb-2"></div>
            <FooterComponent />
        </div>
    );
};

export default ScheduleList;

const Backdrop = React.forwardRef((props, ref) => {
    const { open, ...other } = props;
    return (
        <Fade in={open}>
            <div ref={ref} {...other} />
        </Fade>
    );
});