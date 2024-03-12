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

const ChangePassword = () => {
    const [showPasswordOld, setShowPasswordOld] = useState(false);
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showPasswordConfirmNew, setShowPasswordConfirmNew] = useState(false);

    const handleClickShowPasswordOld = () => setShowPasswordOld((show) => !show);

    const handleClickShowPasswordNew = () => setShowPasswordNew((show) => !show);

    const handleClickShowPasswordNewConfirm = () =>
        setShowPasswordConfirmNew((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validationSchema = yup.object({
        passwordOld: yup
            .string()
            .required("Vui lòng nhập mật khẩu cũ")
            .min(3, "Tối thiểu 3 kí tự ")
            .max(100, "Tối đa 100 kí tự"),
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
                passwordOld: values.passwordOld,
                passwordNew: values.passwordNew,
            };
            const dataCreate = await instance.post("/change-password", data);
            return toast.success(dataCreate.data.message);
        } catch (error) {
            if (error.response.status === 402) {
                return toast.error(error.response.data.errors[0].msg);
            } else if (error.response.status === 400) {
                return toast.error(error.response.data.message);
            }
            return toast.error("Server error");
        }
    };

    const { values, setValues, handleChange, handleSubmit, errors, touched ,handleBlur } =
        useFormik({
            initialValues: {
                fullName: "", 
                email: "",
                passwordOld: "",
                passwordNew: "",
                passwordNewConfirm: "",
            },
            validationSchema,
            onSubmit: async (values) => {
                await submitData(values);
            },
        });



    useEffect(() => {
        const fetchData = async () => {
            const dataInfor = await instance.get("/information-user");
            const { fullName, email } = dataInfor.data.message
            setValues({
                fullName: fullName,
                email: email,
            })
        }
        fetchData();
    }, [])

    return (
        <div className="flex items-center justify-center h-screen banner-bg-all ">
            <ToastContainer />
            <Image
                width={615}
                height={679}
                src={ChangePasswordImage}
                // className="bg-white"
                preview={false}
            />

            <div className="with-banner-change-pass flex justify-center items-center">
                <div>
                    <p className="xl font-bold text-2xl pb-5">Change password</p>

                    <div className="pl-15">
                        <form onSubmit={handleSubmit}>
                            <div className="pb-5">
                                <TextField
                                    label="FullName"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: "410px" }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fullName}
                                />
                            </div>
                            <div className="pb-5">
                                <TextField
                                    label="Email"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: "410px" }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                            </div>
                            <div className="pb-5">
                                <FormControl sx={{ m: 1, width: "410px" }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password-old">
                                        Old Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password-old"
                                        type={showPasswordOld ? "text" : "password"}
                                        name="passwordOld"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.passwordOld}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPasswordOld}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPasswordOld ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Old Password"
                                    />
                                    {touched.passwordOld && errors.passwordOld && (
                                        <p className="errors-file">{errors.passwordOld}</p>
                                    )}
                                </FormControl>
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
        </div>
    );
};

export default ChangePassword;
