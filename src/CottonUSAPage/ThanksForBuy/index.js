import React from 'react';
import { useHistory } from 'react-router-dom';
import 'index.css'; // Đảm bảo bạn tạo tệp CSS này

const ThankYou = () => {
    const history = useHistory();

    const handleBackToHome = () => {
        history.push('/');
    };

    return (
        <div className="thank-you-container">
            <h1>Cảm ơn bạn đã mua hàng!</h1>
            <p>Chúng tôi rất vui vì bạn đã chọn sản phẩm của chúng tôi.</p>
            <button onClick={handleBackToHome} className="btn">
                Quay lại trang chủ
            </button>
        </div>
    );
};

export default ThankYou;