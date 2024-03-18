import React, { useEffect, useState } from "react";
import FooterComponent from "../footer/index";
import HeaderComponent from "../header/index";
import VuGia from "../images/Vu_gia.png";
// import { Image } from "antd";
import { Button } from '@mui/base/Button';
import { Modal as BaseModal } from '@mui/base/Modal';
import AddIcon from '@mui/icons-material/Add';
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
import { css, styled } from '@mui/system';
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Image, Switch } from "antd";
import dayjs from "dayjs";
import { ToastContainer, toast } from 'react-toastify';
import instance from "../configApi/axiosConfig";

const ContractList = () => {
    const [formSearch, setFormSearch] = useState({
        userCode: "",
        fullName: "",
        role: "All",
        startDate: "",
        endDate: "",
    });

    const [formEdit, setFormEdit] = useState({
        email: "",
        passwordNew: "",
        activeAccount: true,
        permission: ""
    })


    const onChangeEditForm = (event, nameProps) => {
        const formEditOld = { ...formEdit };
        if (nameProps === "activeAccount") {
            formEditOld.activeAccount = event.target.checked;
        } else {
            formEditOld[event.target.name] = event.target.value
        }
        setFormEdit(formEditOld);
    }

    const columns = [
        { id: 'contractcode', label: 'Contract Code', minWidth: 170 },
        { id: 'customername', label: 'Customer name', minWidth: 100 },
        {
            id: 'signername',
            label: 'Singer Name',
            minWidth: 170,
        },
        {
            id: 'signeddate',
            label: 'Signed Date',
            minWidth: 170,
        },
        {
            id: 'detail',
            label: 'Detail',
            minWidth: 170,
        },
    ];


    const [rowsData, setRowData] = useState([])

    const [dateEditSelect, setDataEditSelect] = useState()

    const [openDelete, setOpenDelete] = useState(false);
    const [idDeleteAccount, setIdDeleteAccount] = useState();

    const [openEdit, setOpenEdit] = useState(false);
    const [idEditAccount, setIdEditAccount] = useState();

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const deleteAccount = (id) => {
        setOpenDelete(true);
        setIdDeleteAccount(id)
    }

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };



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

            if (formEdit.passwordNew.length < 1) {
                return toast.error("Vui lòng nhập password mới")
            }

            const formDataEdit = {
                email: formEdit.email,
                password: formEdit.passwordNew,
                isActive: formEdit.activeAccount,
                role: formEdit.role
            }
            await instance.post(`/update-user`, formDataEdit);
            console.log(formDataEdit)
            setCallApiReset(prev => !prev);
            toast.success("Sửa  thành công");
            setOpenEdit(false)
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
                            'action': <div >
                                <button className="bg_edit_account mr-5" onClick={() => editAccount(item_data)}>Edit</button>
                                <button className="bg_delete_account" onClick={() => deleteAccount(item_data._id)}>Delete</button>
                            </div>
                        };
                        item.push(objectPush); // Push the object to the array
                    });
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
        const formData = { ...formEdit, role: data.role, activeAccount: data.isActive, email: data.email };
        setDataEditSelect(data)
        setIdEditAccount(data._id)
        setOpenEdit(true);
        setFormEdit(formData)
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
                    <div style={{ marginLeft: '40px' }}>Contracts List</div>
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
                            Delete Account
                        </h2>
                        <p id="parent-modal-description" className="modal-description">
                            Bạn chắc chắn muốn xóa account này chứ
                        </p>

                        <div className="flex justify-end">
                            <button className="pr-5" onClick={handleCloseDelete}>Hủy</button>
                            <button onClick={deleteAccountAsync}>Ok</button>
                        </div>


                    </ModalContent>
                </Modal>

                <Modal
                    open={openEdit}
                    onClose={handleCloseEdit}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    closeAfterTransition
                    slots={{ backdrop: StyledBackdrop }}

                >
                    <ModalContent >
                        <h2 id="parent-modal-title" className="modal-title">
                            Edit Account
                        </h2>

                        <div>
                            <div className="item flex justify-center items-center">
                                <div style={{ width: 200 }}>Full Name : </div>
                                <TextField
                                    style={{ width: 300 }}
                                    id="outlined-start-adornment"
                                    name="fullName"

                                    value={dateEditSelect?.fullName}
                                    sx={{ m: 1, width: "280px", height: "50px" }}
                                    disabled
                                />

                            </div>

                            <div className="item flex justify-center items-center">
                                <div style={{ width: 200 }}>Email : </div>
                                <TextField
                                    style={{ width: 300 }}
                                    id="outlined-start-adornment"
                                    name="email"
                                    onChange={onChangeInput}
                                    value={dateEditSelect?.email}
                                    sx={{ m: 1, width: "280px", height: "50px" }}
                                    disabled
                                />
                            </div>


                            <div className="item flex justify-center items-center">
                                <div style={{ width: 200 }}>Phone Number : </div>
                                <TextField
                                    style={{ width: 300 }}
                                    id="outlined-start-adornment"
                                    name="phoneNumber"
                                    onChange={onChangeInput}
                                    value={dateEditSelect?.phoneNumber}
                                    sx={{ m: 1, width: "280px", height: "50px" }}
                                    disabled
                                />
                            </div>


                            <div className="item flex justify-center items-center">
                                <div style={{ width: 200 }}>Password : </div>
                                <TextField
                                    style={{ width: 300 }}
                                    id="outlined-start-adornment"
                                    name="passwordNew"
                                    onChange={(event) => onChangeEditForm(event, "passwordNew")}
                                    value={formEdit.passwordNew}
                                    sx={{ m: 1, width: "280px", height: "50px" }}
                                />
                            </div>


                            <div className="item flex justify-start items-center" style={{ height: '56px' }}>
                                <div style={{ width: 200 }}>Active account : </div>
                                <Switch
                                    style={{ marginLeft: '10px' }}
                                    checked={formEdit.activeAccount}
                                    onChange={(data) => onChangeEditForm(data, "activeAccount")}

                                />
                            </div>


                            <div className="flex justify-center items-center">
                                <div className="" style={{ width: 200 }}>Permission :</div>
                                <FormControl sx={{ m: 1, minWidth: 300 }} size="small">

                                    <Select
                                        style={{ width: 300 }}
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={formEdit.role}
                                        label="--Choose--"
                                        onChange={(data) => onChangeEditForm(data, "role")}
                                        name="role"
                                    >
                                        <MenuItem value={"DESIGNER"}>DESIGNER</MenuItem>
                                        <MenuItem value={"STAFF"}>STAFF</MenuItem>
                                        <MenuItem value={"CUSTOMER"}>CUSTOMER</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>



                        </div>

                        <div className="flex justify-end">
                            <button className="pr-5" onClick={handleCloseEdit}>Hủy</button>
                            <button onClick={editAccountAsync}>Ok</button>
                        </div>


                    </ModalContent>
                </Modal>

                <div className="flex justify-center">
                    <div>
                        <div className="flex mt-5 items-center justify-center">
                            <div className="flex items-center justify-around">
                                <div className="flex items-center justify-around">
                                    <div className="text-2xl font-semibold pr-5">Permission</div>
                                    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                        <InputLabel id="demo-select-small-label">
                                            --Choose--
                                        </InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            defaultValue="All"
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
                                onClick={apiSearch}
                            >
                                Search
                            </button>
                        </div>
                        <div className="flex items-center justify-center pl-10 pt-2">
                            <button
                                className="custombutton-register-designer"
                                style={{ width: "150px", marginTop: "5" }}
                                type="submit"
                            >
                                Add new <AddIcon></AddIcon>
                            </button>
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
                                            style={{ minWidth: column.minWidth }}
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

export default ContractList;

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