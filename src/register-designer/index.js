import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
// import * from 'yup';
import Checkbox from '@mui/material/Checkbox';
import { useFormik } from 'formik'


const RegisterDesigner = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [bussiness, setBussiness] = useState(false);
    const [gender, setGender] = useState('Male');
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);
    const handleRadioChangeBusiness = () => setBussiness((show) => !show);
    const handleRadioChangeGender = () => setGender((show) => show === "Male" ? "Female" : "Male");

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
  
    // const validatorFormRegisterDesigner = yub.object().shape({
    //     email: yub.string().email("Vui lòng nhập đúng định dạng email").required("Required"),
    //     email: yub.string().email("Vui lòng nhập đúng định dạng email").required("Required"),
    //     email: yub.string().email("Vui lòng nhập đúng định dạng email").required("Required")
    // })

    const formikSubmit = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return <div className='flex items-center justify-center h-screen banner-bg-all'>
        <div className='max-w-custom-width-register-designer' >
            <Image
                width={500}
                height={679}
                src={RegisterCunstomerImage}
                className='bg-white'
                preview={false} />

            <div className='with-banner-login-register-designer flex justify-center items-center'>
                <div>
                    <div className='text-xs font-bold  mb-1'> WELCOME </div>
                    <div className='text-3xl font-bold mb-4'> Sign Up as Customer: </div>
                    <div>
                        <TextField
                            label="First name"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '280px' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }}
                        />

                        <TextField
                            label="Last name"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '280px' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }}
                        />
                    </div>

                    <div className='flex'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker sx={{ m: 1, width: '280px' }} label="Date of birth" defaultValue={dayjs('2022-04-17')} />
                        </LocalizationProvider>
                        <div className='flex'>
                            <div className='text-base mt-1 mr-3 pl-2'>Gender : </div>
                            <RadioGroup
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={gender}
                                onChange={handleRadioChangeGender}
                            >
                                <FormControlLabel value="Male" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 18,
                                    },
                                    '&.Mui-checked': {
                                        color: '#5B3000', // Change this to the desired checked color
                                    },
                                }} />} label="Male" />
                                <FormControlLabel value="Female" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 18,
                                    },
                                    '&.Mui-checked': {
                                        color: '#5B3000', // Change this to the desired checked color
                                    },
                                }} />} label="Female" />

                            </RadioGroup>
                        </div>

                    </div>

                    <div>
                        <TextField
                            label="Email"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '280px' }}

                        />
                    </div>
                    <div>
                        <TextField
                            label="Phone number"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '280px' }}

                        />
                    </div>

                    <div>
                        <FormControl sx={{ m: 1, width: '280px' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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


                        <FormControl sx={{ m: 1, width: '280px' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-confirm-password"
                                type={showPassword ? 'text' : 'password'}
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
                                label="Confirm password"
                            />
                        </FormControl>

                    </div>

                    <div className="flex"> <span className="mt-1 mr-4 pl-2"> Business type: </span>
                        <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            row
                            value={bussiness}
                            onChange={handleRadioChangeBusiness}
                        >
                            <FormControlLabel value="false" control={<Radio sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 18,
                                },
                                '&.Mui-checked': {
                                    color: '#5B3000', // Change this to the desired checked color
                                },
                            }} />} label="Individual" />
                            <FormControlLabel value="true" control={<Radio sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 18,
                                },
                                '&.Mui-checked': {
                                    color: '#5B3000', // Change this to the desired checked color
                                },
                            }} />} label="Business" />

                        </RadioGroup></div>


                    <div>
                        <TextField
                            label="Business name"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '580px' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }}
                            disabled={!bussiness}
                        />
                    </div>

                    <div >
                        <Checkbox defaultChecked />  I have read, understood, and <Link href="#" className="link-color-register"> agree with the terms and conditions of company.</Link>
                    </div>

                    <button className="custombutton-register-designer" sx={{ m: 1, width: '52ch' }} > CONTINUE  </button>

                </div>
            </div>
        </div>

    </div>
}

export default RegisterDesigner;