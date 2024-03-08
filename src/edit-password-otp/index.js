import ChangePasswordImage from "../images/change_password.png";
import { Image } from "antd";
import { useState, useEffect } from "react";
import RegisterCunstomerImage from "../images/register-customer.png";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import * as yup from "yup";
import Checkbox from "@mui/material/Checkbox";
import { useFormik } from "formik";
import instance from "../configApi/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const EditPasswordOtp = () => {
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showPasswordConfirmNew, setShowPasswordConfirmNew] = useState(false);
    const handleClickShowPasswordNew = () => setShowPasswordNew((show) => !show);

    const handleClickShowPasswordNewConfirm = () =>
        setShowPasswordConfirmNew((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validationSchema = yup.object({
        email: yup
            .string()
            .required("Email không được để trống"),
        code_change_password: yup.string()
            .required("Mã code không được để trống"),
        passwordNew: yup
            .string()
            .required("Vui lòng nhập mật khẩu mới")
            .min(3, "Tối thiểu 3 kí tự ")
            .max(100, "Tối đa 100 kí tự"),
        passwordNewConfirm: yup
            .string()
            .required("Vui lòng nhập mật khẩu xác nhận mới khẩu mới")
            .oneOf([yup.ref("passwordNew"), null], "Mật khẩu xác nhận không khớp"),
    });

    const submitData = async (values) => {
        try {
            const data = {
                email: values.email,
                code_change_password: values.code_change_password,
                passwordNew: values.passwordNew,
            };
            const dataChange = await instance.post("/change-password-otp", data);
            return toast.success(dataChange.data.message);
        } catch (error) {
            if (error.response.status === 402) {
                return toast.error(error.response.data.errors[0].msg);
            } else if (error.response.status === 400) {
                return toast.error(error.response.data.message);
            }
            return toast.error("Server error");
        }
    };

    const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
        useFormik({
            initialValues: {
                email: "",
                passwordNew: "",
                passwordNewConfirm: "",
                code_change_password:""
            },
            validationSchema,
            onSubmit: async (values) => {
                await submitData(values);
            },
        });


    const sendOTP = async () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!regex.test(values.email)){
           return toast.error("Vui lòng nhập đúng email để lấy mã OTP");
        }
        await instance.post("/send-otp", { email: values.email });
        return toast.success("Gửi mã OTP thành công")
    }



   console.log(22222222, values)
    return (
        <div className="flex items-center justify-center h-screen banner-bg-all ">
            <ToastContainer />


            <div className="with-banner-change-pass flex justify-center items-center">
                <div>
                    <p className="xl font-bold text-2xl pb-5">Change password</p>

                    <div className="pl-15">
                        <form onSubmit={handleSubmit}>
                            <div className="pb-2">
                                <TextField
                                    label="Email"
                                    name ="email"
                                    sx={{ m: 1, width: "410px" }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                 {touched.email && errors.email && (
                                        <p className="errors-file">{errors.email}</p>
                                    )}
                            </div>
                            <div className="pb-3 float-right">
                                <button
                                    className="custombutton-register-designer"
                                    style={{ margin: "1", width: "150px", borderRadius: '10px' }}
                                    onClick={sendOTP}
                                    type="button"
                                >
                                    Receive code
                                </button>
                            </div>

                            <div className="pb-5">
                                <TextField
                                    label="OTP"
                                    name ="code_change_password"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: "410px" }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.code_change_password}
                                />
                                         {touched.code_change_password && errors.code_change_password && (
                                        <p className="errors-file">{errors.code_change_password}</p>
                                    )}
                            </div>

                            <div className="pb-5">
                                <FormControl sx={{ m: 1, width: "410px" }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-new-password">
                                        New Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-new-password"
                                        type={showPasswordNew ? "text" : "password"}
                                        name="passwordNew"
                                        onBlur={handleBlur}
                                        value={values.passwordNew}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPasswordNew}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPasswordNew ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="New Password"
                                    />
                                    {touched.passwordNew && errors.passwordNew && (
                                        <p className="errors-file">{errors.passwordNew}</p>
                                    )}
                                </FormControl>
                            </div>
                            <div className="pb-5">
                                <FormControl sx={{ m: 1, width: "410px" }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-confirm-password-new">
                                        Confirm Password New
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-confirm-password-new"
                                        type={showPasswordConfirmNew ? "text" : "password"}
                                        name="passwordNewConfirm"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.passwordNewConfirm}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPasswordNewConfirm}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPasswordConfirmNew ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Confirm Password New"
                                    />
                                    {touched.passwordNewConfirm && errors.passwordNewConfirm && (
                                        <p className="errors-file">{errors.passwordNewConfirm}</p>
                                    )}
                                </FormControl>
                            </div>
                            <button
                                className="custombutton-register-designer"
                                style={{ margin: "1", width: "100%" }}
                                type="submit"
                            >
                                CONTINUE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Image
                width={615}
                height={679}
                src={ChangePasswordImage}
                // className="bg-white"
                preview={false}
            />
        </div>
    );
};

export default EditPasswordOtp;
