import React, { useState } from 'react';
import backgroundprofile from '../images/backgroundprofile.png';

const UserProfileForm = () => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here, such as sending data to a server
        console.log(profile);
    };
    const handleAvatarChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                // Xử lý đường dẫn của ảnh đại diện và cập nhật nó vào state hoặc thực hiện các thao tác khác tùy theo nhu cầu của bạn
                // Ở đây mình chỉ log đường dẫn của ảnh đại diện ra console để minh họa
                console.log(e.target.result);
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                {/* Avatar and banner upload buttons (hidden file inputs for styling) */}
                {/* User will click on the images to select new ones */}
                <label htmlFor="banner-upload" >
                    <img src={backgroundprofile} alt="Banner" style={{ width: '100%' }} />
                </label>
                <input
                    id="banner-upload"
                    type="file"
                    style={{ display: 'none' }}

                />
                <div className="avatar-container">
                    <img src="/path-to-default-avatar.jpg" alt="Avatar" className="profile-avatar" />
                    <label htmlFor="avatar-upload" className="upload-label">
                        Upload
                    </label>
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: 'none' }}
                    />
                </div>
            </div>

            <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', marginTop: '-40px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        placeholder="Email"
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="date"
                        name="birthDate"
                        value={profile.birthDate}
                        onChange={handleChange}
                        placeholder="Birth Date"
                        style={{ width: '100%' }}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        value={profile.password}
                        onChange={handleChange}
                        placeholder="Password"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button type="submit" style={{ padding: '10px 15px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Save Profile</button>
            </div>
        </form>
    );
};

export default UserProfileForm;