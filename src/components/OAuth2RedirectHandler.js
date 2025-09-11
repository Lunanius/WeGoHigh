import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        let token = params.get('token'); //

        if (token) {
            // Bearer 토큰 형태라면 앞에 "Bearer " 제거
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            localStorage.setItem("jwtToken", token);
            navigate("/");
        } else {
            // 토큰이 없으면 로그인 페이지로 리다이렉션
            const error = params.get('error');
            if (error) {
                navigate(`/login?error=${error}`, { replace: true });
            } else {
                navigate('/login', { replace: true });
            }
        }
    }, [location, navigate]);

    return (
        <div>
            <p>잠시만 기다려주세요...</p>
        </div>
    );
};

export default OAuth2RedirectHandler;