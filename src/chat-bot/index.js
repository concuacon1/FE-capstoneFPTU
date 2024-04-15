import React from 'react';
import MessageFB from "../images/messengerfb.png";
import { Image } from 'antd';

const ChatBot = () => {
    const messengerLink = 'https://www.facebook.com/messages/t/266412489895972';

    const handleOnClick = () => {
        window.open(messengerLink, '_blank'); // Mở link trong một tab mới
    };

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '50px',
                right: '40px',
                zIndex: 1000,
                width: '60px',
                cursor: 'pointer'
            }}
            onClick={handleOnClick} // Gọi hàm xử lý sự kiện khi div được click
        >
            <Image
                height={'100%'}
                src={MessageFB}
                preview={false}
            />
        </div>
    );
}

export default ChatBot;
