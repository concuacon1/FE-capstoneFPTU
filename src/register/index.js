
import { Image } from 'antd';
import BannerLogin from '../images/banner_login.png'
import { useNavigate } from 'react-router-dom';
const Register = () => {

    const pushLink = useNavigate();

    const linkScreenDesigner = () => {
        pushLink("/register-designer");
    }

    const linkScreenCustomer = () => {
        pushLink("/register-designer");
    }
    return <div className='flex items-center justify-center h-screen banner-bg-all'>
        <div className='flex max-w-custom-width' >
            <Image
                width={500}
                height={679}
                src={BannerLogin}
                className='bg-white'
                preview={false} />

            <div className='with-banner-login flex items-center justify-center'>
                <div>
                    <div className='text-xs font-bold flex justify-center mb-12'> WELCOME </div>
                    <div className='text-3xl font-bold flex justify-center mb-12'> Sign Up as: </div>
                    <div className='border-button-designer mb-8' onClick={linkScreenDesigner}>Designer</div>
                    <div className='border-button-customer mb-12' onClick={linkScreenCustomer}>Customer</div>
                    <div className='banner-login-color flex justify-center'> Already have an account? <span className='banner-login-here'> LOGIN HERE </span> </div>
                </div>
            </div>
        </div>

    </div>
}

export default Register;