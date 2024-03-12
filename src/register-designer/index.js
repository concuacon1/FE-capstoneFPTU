import { useState, useRef } from "react";
import { Image } from "antd";
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
import instance from "../configApi/axiosConfig"
import { toast, ToastContainer } from 'react-toastify'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { UploadFileCloudinary } from "../uploadImage/index";

const RegisterDesigner = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [messageCheckBox, setMessageChekbox] = useState("Vui lòng click checkbox");
    const fileInputRef = useRef(null);
    const [selectedCV, setSelectedCV] = useState(null);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [messageFile, setMessageFile] = useState("");
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }
    const [onChangeCheckBox, setonChangeCheckBox] = useState(false);

    const pushLink = useNavigate();

    const handleClickOnChangeCheckBox = (event) => {
        if (!event.target.checked) {
            setMessageChekbox("Vui lòng click checkbox")
        } else {
            setMessageChekbox("")
        }
        setonChangeCheckBox(event.target.checked);
    }
    const validationSchema = yup.object({
        email: yup
            .string()
            .email("Vui lòng nhập đúng định dạng email")
            .required("Email không được để trống"),
        firstName: yup
            .string()
            .required('FirstName không được để trống')
            .min(3, "Tối thiểu 3 kí tự ")
            .max(100, "Tối đa 100 kí tự"),
        lastName: yup
            .string()
            .required('LastName không được để trống')
            .min(3, "Tối thiểu 3 kí tự ")
            .max(100, "Tối đa 100 kí tự"),
        dob: yup
            .date()
            .max(new Date(), 'Thời gian chọn không được lớn hơn thời gian hiện tại'),
        phoneNumber: yup
            .string()
            .required('Số điện thoại không được để trống')
            .matches(/^(03|05|07|08|09)+([0-9]{8})$/, 'Không đúng định dạng số điện thoại'),
        password: yup.string()
            .required('Vui lòng nhập mật khẩu xác nhận')
            .min(3, "Tối thiểu 3 kí tự ")
            .max(100, "Tối đa 100 kí tự"),
        confirmPassword: yup
            .string()
            .required('Vui lòng nhập mật khẩu xác nhận')
            .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không khớp'),
        gender: yup.string().required("Vui lòng chon gender"),
    });

    const submitData = async (values) => {
        if (!selectedCV) {
            return setMessageFile("Vui lòng chọn 1 file pdf")
        }
        if (!onChangeCheckBox) {
            return setMessageChekbox("Vui lòng click checkbox")
        } else {
            setMessageChekbox("")
           
            try {
                const formDataFile = new FormData();
                formDataFile.append('file', selectedCV);
                const uploafFile = await instance.post("/upload-file", formDataFile ,{
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  });
                if(!uploafFile.data.success){
                     return toast.error("Upload error")
                }
                const data = {
                    fullName: `${values.firstName} ${values.lastName}`,
                    ...values,
                    dob: dayjs().format('YYYY/DD/MM'),
                    role: "DESIGNER",
                    cv:uploafFile.data.filename
                }
                const dataCreate = await instance.post("/register", data);
                Cookies.set('tokenfpt', dataCreate.data.data.cookie)
                localStorage.setItem("datawebfpt", JSON.stringify(dataCreate.data.data.informationuser))
                pushLink("/home-page");
                return toast.success(dataCreate.data.message)
            } catch (error) {
                if (error.response.status === 402) {
                    return toast.error(error.response.data.errors[0].msg)
                } else if (error.response.status === 400) {
                    return toast.error(error.response.data.message)
                }
                return toast.error("Server error")
            }

        }
    }
    const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            dob: dayjs().subtract(3, 'year'),
            gender: "Male",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            await submitData(values)
        },
    });




    const handleButtonClick = () => {
        // Trigger the file input click when the button is clicked
        fileInputRef.current.click();
    };

    const handleCVChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setSelectedCV(selectedFile);
            setMessageFile("")
        }
    };

    console.log(errors)

    return (
        <div className="flex items-center justify-center h-screen banner-bg-all">
            <ToastContainer />
            <div className="max-w-custom-width-register-designer">
                <Image
                    width={500}
                    height={679}
                    src={RegisterCunstomerImage}
                    className="bg-white"
                    preview={false}
                />


                <div className="with-banner-login-register-designer flex justify-center items-center">
                    <div>
                        <div className="text-xs font-bold  mb-1"> WELCOME </div>
                        <div className="text-3xl font-bold mb-4"> Sign Up as: </div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex">
                                <div>
                                    <TextField
                                        label="First name"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: "280px" }}
                                        name="firstName"
                                        onChange={handleChange}
                                        value={values.firstName}
                                        onBlur={handleBlur}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start"></InputAdornment>
                                            ),
                                        }}
                                    />

                                    {touched.firstName && errors.firstName && <p className="errors-file">{errors.firstName}</p>}
                                </div>

                                <div>
                                    <TextField
                                        label="Last name"
                                        id="outlined-start-adornment"
                                        name="lastName"
                                        onChange={handleChange}
                                        value={values.lastName}
                                        sx={{ m: 1, width: "280px" }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start"></InputAdornment>
                                            ),
                                        }}
                                    />

                                    {touched.lastName && errors.lastName && <p className="errors-file">{errors.lastName}</p>}
                                </div>



                            </div>

                            <div className="flex">
                                <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            sx={{ m: 1, width: "280px" }}
                                            label="Date of birth"
                                            defaultValue={values.dob}
                                            name="dob"
                                            onChange={(date) => handleChange({ target: { name: "dob", value: date } })}
                                        />
                                    </LocalizationProvider>
                                    {errors.dob && <p className="errors-file">{errors.dob}</p>}
                                </div>
                                <div className="flex">
                                    <div className="text-base mt-1 mr-3 pl-2">Gender : </div>
                                    <RadioGroup
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="gender"
                                        value={values.gender}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel
                                            value="Male"
                                            control={
                                                <Radio
                                                    sx={{
                                                        "& .MuiSvgIcon-root": {
                                                            fontSize: 18,
                                                        },
                                                        "&.Mui-checked": {
                                                            color: "#5B3000", // Change this to the desired checked color
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Male"
                                        />
                                        <FormControlLabel
                                            value="Female"
                                            control={
                                                <Radio
                                                    sx={{
                                                        "& .MuiSvgIcon-root": {
                                                            fontSize: 18,
                                                        },
                                                        "&.Mui-checked": {
                                                            color: "#5B3000", // Change this to the desired checked color
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Female"
                                        />
                                    </RadioGroup>

                                </div>
                            </div>

                            <div>
                                <TextField
                                    label="Email"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: "280px" }}
                                    name="email"
                                    onChange={handleChange}
                                    value={values.email}
                                />

                                {touched.email && errors.email && <p className="errors-file">{errors.email}</p>}

                            </div>

                            <div>
                                <TextField
                                    label="Phone number"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: "280px" }}
                                    name="phoneNumber"
                                    onChange={handleChange}
                                />

                                {touched.phoneNumber && errors.phoneNumber && <p className="errors-file">{errors.phoneNumber}</p>}
                            </div>

                            <div>
                                <div className="flex">
                                    <p className="pr-3">Upload CV :</p>
                                    <Button variant="contained" onClick={handleButtonClick}>
                                        Choose file...
                                    </Button>
                                    {/* Hidden file input */}
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleCVChange}
                                    />
                                    {/* Display the selected CV file name */}
                                    {selectedCV && <p className="pl-2">{selectedCV.name}</p>}

                                </div>
                                {messageFile.length > 0 && <p className="errors-file">{messageFile}</p>}
                            </div>



                            <div>
                                <FormControl sx={{ m: 1, width: "280px" }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        onChange={handleChange}
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
                                    {touched.password && errors.password && <p className="errors-file">{errors.password}</p>}
                                </FormControl>

                                <FormControl sx={{ m: 1, width: "280px" }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-confirm-password">
                                        Confirm password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-confirm-password"
                                        type={showPasswordConfirm ? "text" : "password"}
                                        name="confirmPassword"
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPasswordConfirm}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPasswordConfirm ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Confirm password"
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && <p className="errors-file">{errors.confirmPassword}</p>}
                                </FormControl>
                            </div>
                            <div >
                                <Checkbox checked={onChangeCheckBox} onChange={(event) => {
                                    handleClickOnChangeCheckBox(event)
                                }} />  I have read, understood, and <Link href="#" className="link-color-register"> agree with the terms and conditions of company.</Link>
                                {messageCheckBox.length > 0 && <p className="errors-file">{messageCheckBox}</p>}
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

export default RegisterDesigner;
