import React, { useEffect, useState } from "react";
import FooterComponent from "../footer/index";
import HeaderComponent from "../header/index";
import VuGia from "../images/Vu_gia.png";
// import { Image } from "antd";
import { Button } from '@mui/base/Button';
import { Modal as BaseModal } from '@mui/base/Modal';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { FormControlLabel, IconButton, OutlinedInput, Radio, RadioGroup } from "@mui/material";
import Fade from '@mui/material/Fade';
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from "@mui/material/TextField";
import { css, styled } from '@mui/system';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Image } from "antd";
import dayjs from "dayjs";
import { ToastContainer, toast } from 'react-toastify';
import instance from "../configApi/axiosConfig";

const StaffList = () => {
    const [formSearch, setFormSearch] = useState({
        userCode: "",
        fullName: "",
        role: "All",
        startDate: "",
        endDate: "",
    });

    const [formAdd, setFormAdd] = useState({
        firstname: "",
        lastname: "",
        email: "",
        dob: "",
        gender: true,
        password: "",
        passwordConnfirm: "",
        phoneNumber: ""
    });

    const [formShow, setFormShow] = useState({
        username: "",
        accountcode: "",
        email: "",
        phoneNumber: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [openShow, setOpenShow] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onChangeAddForm = (event, nameProps) => {
        const formAddOld = { ...formAdd };
        formAddOld[event.target.name] = event.target.value
        setFormAdd(formAddOld);
    }

    const columns = [
        { id: 'accountcode', label: 'Mã nhân viên', minWidth: 170, fontWeight: 600, fontSize: 20 },
        { id: 'username', label: 'Tên nhân viên', minWidth: 100, fontWeight: 600, fontSize: 20 },
        {
            id: 'email',
            label: 'Email',
            minWidth: 170, fontWeight: 600, fontSize: 20,
        },
        {
            id: 'phoneNumber',
            label: 'Số điện thoại',
            align: 'center',
            minWidth: 170, fontWeight: 600, fontSize: 20,
        },
        {
            id: 'information',
            label: 'Thông tin',
            align: 'center',
            minWidth: 170, fontWeight: 600, fontSize: 20,
        },
    ];

    const [rowsData, setRowData] = useState([])

    const [dateAddSelect, setDataAddSelect] = useState()

    const [openDelete, setOpenDelete] = useState(false);
    const [idDeleteAccount, setIdDeleteAccount] = useState();

    const [openAdd, setOpenAdd] = useState(false);
    const [idEditAccount, setIdEditAccount] = useState();

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const deleteAccount = (id) => {
        setOpenDelete(true);
        setIdDeleteAccount(id)
    }

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const handleCloseShow = () => {
        setOpenShow(false);
    }

    const showInfo = (data) => {
        setFormShow(data);
        setOpenShow(true);
    }

    const [callApiReset, setCallApiReset] = useState(false)

    const deleteAccountAsync = async () => {
        try {
            await instance.delete(`/delete_user/${idDeleteAccount}`);
            setCallApiReset(prev => !prev);
            toast.success("Xóa thành công");
            setOpenDelete(false)
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
    }

    const editAccountAsync = async () => {
        try {

            if (formAdd.password.length < 1) {
                return toast.error("Vui lòng nhập password mới")
            }

            const formDataEdit = {
                email: formAdd.email,
                password: formAdd.password,
                isActive: formAdd.activeAccount,
                role: formAdd.role
            }
            await instance.post(`/update-user`, formDataEdit);
            console.log(formDataEdit)
            setCallApiReset(prev => !prev);
            toast.success("Sửa  thành công");
            setOpenAdd(false)
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
    }


    const apiSearch = async () => {
        try {
            const dataSeachForm = {
                userCode: formSearch.userCode,
                fullName: formSearch.fullName,
                role: formSearch.role === "All" ? "" : formSearch.role,
                startDate: formSearch.startDate,
                endDate: formSearch.endDate
            }
            const dataSearch = await instance.post("/search_user_role_admin", dataSeachForm);
            const dataDB = dataSearch.data.data;
            const item = [];
            if (dataDB.length > 0) {
                dataDB.map(item_data => {
                    const objectPush = {
                        'id': item_data._id,
                        'email': item_data.email,
                        'phoneNumber': item_data.phoneNumber,
                        'dob': item_data.dob,
                        'isActive': item_data.isActive,
                        'accountcode': item_data.userCode,
                        'username': item_data.fullName,
                        'permission': item_data.role,
                        'created_date': dayjs(item_data?.createdAt).format('DD/MM/YYYY'),
                        'action': <div >
                            <button className="bg_edit_account mr-5" onClick={() => editAccount(item_data._id)}>Edit</button>
                            <button className="bg_delete_account" onClick={() => deleteAccount(item_data._id)}>Delete</button>
                        </div>
                    };
                    item.push(objectPush); // Push the object to the array
                });
                setRowData(item);
            } else {
                setRowData([]);
            }


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
    }

    useEffect(() => {
        async function getAllUser() {
            try {
                const dataRes = await instance.get(`/list_user_role_admin`);
                const dataDB = dataRes.data.data;
                const item = [];
                if (dataDB.length > 0) {
                    dataDB.map(item_data => {
                        const objectPush = {
                            'id': item_data._id,
                            'email': item_data.email,
                            'phoneNumber': item_data.phoneNumber,
                            'dob': item_data.dob,
                            'isActive': item_data.isActive,
                            'accountcode': item_data.userCode,
                            'username': item_data.fullName,
                            'permission': item_data.role,
                            'created_date': dayjs(item_data?.createdAt).format('DD/MM/YYYY'),
                            'information': <div >
                                <button className="bg_edit_account mr-5" onClick={() => showInfo(item_data)}>Xem</button>
                            </div>
                        };
                        item.push(objectPush); // Push the object to the array
                    });
                    console.log("item == ", item);
                    setRowData(item);
                }
            } catch (error) {

                console.log(error)

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
    }, [callApiReset])


    const editAccount = (data) => {
        const formData = { ...formAdd, role: data.role, activeAccount: data.isActive, email: data.email };
        setDataAddSelect(data)
        setIdEditAccount(data._id)
        setOpenAdd(true);
        setFormAdd(formData)
    }

    const addStaff = () => {
        setOpenAdd(true);
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
        const data = {
            ...formSearch,
            startDate: newDateRange[0],
            endDate: newDateRange[1],
        };
        setFormSearch(data);
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
                    <div style={{ marginLeft: '40px' }}>Danh sách nhân viên</div>
                </div>

                <Modal
                    open={openDelete}
                    onClose={handleCloseDelete}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    closeAfterTransition
                    slots={{ backdrop: StyledBackdrop }}
                >
                    <ModalContent >
                        <h2 id="parent-modal-title" className="modal-title">
                            Xóa nhân viên
                        </h2>
                        <p id="parent-modal-description" className="modal-description">
                            Bạn chắc chắn muốn xóa nhân viên này chứ
                        </p>

                        <div className="flex justify-end">
                            <button className="pr-5" onClick={handleCloseDelete}>Hủy</button>
                            <button onClick={deleteAccountAsync}>Ok</button>
                        </div>


                    </ModalContent>
                </Modal>

                <Modal
                    open={openAdd}
                    onClose={handleCloseAdd}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    closeAfterTransition
                    slots={{ backdrop: StyledBackdrop }}

                >
                    <ModalContent >
                        <div>
                            <div className="item flex justify-center items-center">
                                <TextField
                                    size="small"
                                    label="Họ"
                                    style={{ width: 222.45 }}
                                    id="outlined-start-adornment"
                                    name="firstname"
                                    value={dateAddSelect?.firstname}
                                    sx={{ m: 1, width: "222.45px", height: "40px" }}
                                />

                                <TextField
                                    size="small"
                                    label="Tên"
                                    style={{ width: 222.45 }}
                                    id="outlined-start-adornment"
                                    name="lastname"
                                    value={dateAddSelect?.lastname}
                                    sx={{ m: 1, width: "222.45px", height: "40px" }}
                                />

                            </div>

                            <div className="item flex justify-center items-center">
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
                                            <DatePicker />
                                        </DemoItem>
                                    </DemoContainer>
                                </LocalizationProvider>
                                <div className="flex items-center" style={{ marginLeft: '30px' }}>
                                    <div style={{ marginRight: '5px' }}>Giới tính</div>
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="male"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel value="male" control={<Radio />} label="Nam" />
                                            <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>

                            <TextField
                                size="small"
                                label="Email"
                                style={{ width: 222.45 }}
                                id="outlined-start-adornment"
                                name="email"
                                value={dateAddSelect?.email}
                                sx={{ m: 1, width: "222.45px", height: "40px" }}
                            />

                            <TextField
                                size="small"
                                label="Số điện thoại"
                                style={{ width: 222.45 }}
                                id="outlined-start-adornment"
                                name="phonenumber"
                                value={dateAddSelect?.phoneNumber}
                                sx={{ m: 1, width: "222.45px", height: "40px" }}
                            />

                            <div className="item flex justify-center items-center">
                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password-confirm">Xác nhận mật khẩu</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password-confirm"
                                        type={showPasswordConfirm ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPasswordConfirm}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button className="bg_edit_account mr-5" onClick={editAccountAsync}>Tạo</button>
                        </div>


                    </ModalContent>
                </Modal>

                <Modal
                    open={openShow}
                    onClose={handleCloseShow}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    closeAfterTransition
                    slots={{ backdrop: StyledBackdrop }}

                >
                    <ModalContent >
                        <div>
                            <div className="item flex justify-center items-center">
                                <div style={{ width: 200 }}>Mã nhân viên : </div>
                                <TextField
                                    size="small"
                                    style={{ width: 222.45 }}
                                    id="outlined-start-adornment"
                                    name="accountcode"
                                    value={formShow?.accountcode}
                                    sx={{ m: 1, width: "222.45px", height: "40px" }}
                                    disabled
                                />
                            </div>
                            <div className="item flex justify-center items-center">
                                <div style={{ width: 200 }}>Tên nhân viên : </div>
                                <TextField
                                    size="small"
                                    style={{ width: 222.45 }}
                                    id="outlined-start-adornment"
                                    name="username"
                                    value={formShow?.username}
                                    sx={{ m: 1, width: "222.45px", height: "40px" }}
                                    disabled
                                />
                            </div>
                            <div className="item flex justify-center items-center">
                                <div style={{ width: 200 }}>Email : </div>
                                <TextField
                                    size="small"
                                    style={{ width: 222.45 }}
                                    id="outlined-start-adornment"
                                    name="email"
                                    value={formShow?.email}
                                    sx={{ m: 1, width: "222.45px", height: "40px" }}
                                    disabled
                                />
                            </div>
                            <div className="item flex justify-center items-center">
                                <div style={{ width: 200 }}>Số điện thoại : </div>
                                <TextField
                                    size="small"
                                    style={{ width: 222.45 }}
                                    id="outlined-start-adornment"
                                    name="phonenumber"
                                    value={formShow?.phoneNumber}
                                    sx={{ m: 1, width: "222.45px", height: "40px" }}
                                    disabled
                                />
                            </div>
                        </div>

                    </ModalContent>
                </Modal>

                <div className="flex justify-center">
                    <div>
                        <div className="flex mt-5 items-center justify-center">
                            <div >
                                <div className="flex mt-5 items-center justify-center">
                                    <div className="flex items-center justify-center ">
                                        <div className="text-2xl pr-5">
                                            Mã nhân viên{" "}
                                        </div>
                                        <TextField
                                            size="small"
                                            id="outlined-start-adornment"
                                            name="userCode"
                                            onChange={onChangeInput}
                                            value={formSearch.userCode}
                                            sx={{ m: 1, width: "280px", height: "40px" }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>

                                    <div className="flex items-center justify-center pl-10">
                                        <div className="text-2xl pr-5">
                                            Email{" "}
                                        </div>
                                        <TextField
                                            size="small"
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
                                    <div className="pl-10">
                                        <button
                                            className="custombutton-register-designer"
                                            style={{ width: "150px", marginTop: "5" }}
                                            type="submit"
                                            onClick={apiSearch}
                                        >
                                            Tìm kiếm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex mt-5 items-center justify-center">
                            <div >
                                <div className="flex mt-5 items-center justify-center">
                                    <div className="flex items-center justify-center ">
                                        <div className="text-2xl pr-5">
                                            Tên nhân viên{" "}
                                        </div>
                                        <TextField
                                            size="small"
                                            id="outlined-start-adornment"
                                            name="userCode"
                                            onChange={onChangeInput}
                                            value={formSearch.userCode}
                                            sx={{ m: 1, width: "280px", height: "40px" }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>

                                    <div className="flex items-center justify-center pl-10">
                                        <div className="text-2xl pr-5">
                                            Số điện thoại{" "}
                                        </div>
                                        <TextField
                                            size="small"
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
                                    <div className="pl-10">
                                        <button
                                            className="button-add"
                                            style={{ width: "150px", marginTop: "5" }}
                                            type="submit"
                                            onClick={addStaff}
                                        >
                                            Thêm mới <AddIcon></AddIcon>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Paper sx={{ width: '100%', overflow: 'hidden', height: '750px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="px-20 pt-10">
                    <TableContainer sx={{ maxHeight: 440 }}>
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
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
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

export default StaffList;

const Backdrop = React.forwardRef((props, ref) => {
    const { open, ...other } = props;
    return (
        <Fade in={open}>
            <div ref={ref} {...other} />
        </Fade>
    );
});



const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
};

const ModalContent = styled('div')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
      padding: 24px;
      color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  
      & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
      }
  
      & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
      }
    `,
);

const TriggerButton = styled(Button)(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.5;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 150ms ease;
      cursor: pointer;
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
      &:hover {
        background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
      }
  
      &:active {
        background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
      }
  
      &:focus-visible {
        box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
        outline: none;
      }
    `,
);