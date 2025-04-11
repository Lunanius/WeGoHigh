import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../css/MyPage.css";
import axios from "axios";

function MyPage() {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [resetPasswordBox, setResetPasswordBox] = useState(false);
    const [profileBox, setProfileBox] = useState(false);
    const [name, setName] = useState(null);
    const [birthDate, setBirthDate] = useState(null);
    const [id, setId] = useState(null);




    useEffect(() => {

        axios.get("http://localhost:8080/api/session-user", { withCredentials: true })
            .then(res => {
                axios.get(`http://localhost:8080/api/userData/${res.data.username}`)
                    .then((response) => {
                        setName(response.data.name)
                        setBirthDate(response.data.birthDate)
                        setId(response.data.username)



                    })
                    .catch((err) => {
                        console.log(err);
                        alert(`오류가 발생하였습니다.\n${err}`)
                        navigate('/')
                    });
            })
            .catch((err) => {
                alert(`오류가 발생하였습니다.\n${err}`)
                navigate('/')
            });

    }, []);

    const handleLogout = () => {
        axios.post("http://localhost:8080/api/logout", {}, { withCredentials: true })
            .finally(() => {
                setName(null);
                setBirthDate(null);
                setId(null);

                setProfileBox(false);
                navigate("/");
            });
    };


    const handleResetPassword = () => {
        if (newPassword.length < 8 || newPassword.length > 16) {
            alert("비밀번호 길이는 최소 8글자 최대 16글자입니다.")
        }
        else {
            const userData = {
                username: id,
                password: newPassword
            };

            const url = `http://localhost:8080/api/newPw`;

            axios
                .post(url,userData)
                .then((response) => {

                   alert("갱신되었습니다\n 다시 로그인해주세요")
                    handleLogout()
                    navigate('/')
                })
                .catch((error) => {
                    const msg = error.response?.data || '입니다';
                    alert(msg);
                });
        }
    }

    const profileToggleBox = () => {
        setProfileBox(!profileBox);
    };

    const resetPasswordToggleBox = () => {
        setResetPasswordBox(!resetPasswordBox)
    };

    return (
        <div className="MyPage">
            <header className="MyPage-header">
                <button className="MyPage-home-button" type="button" onClick={() => navigate("/")}>We go high</button>
                <img className="MyPage-profile-img" src="profile.png" alt="프로필" onClick={profileToggleBox} />

                {profileBox && (
                    <div className="MyPage-profileBox" id="myBox">
                        <button className="MyPage-profileBox-element" onClick={() => navigate("/mypage")}>내 정보</button>
                        <button className="Home-profileBox-element" onClick={handleLogout}>로그아웃</button>
                    </div>
                )}

                <div className="MyPage-container">
                    <div className="MyPage-container-element">
                        <div className="MyPage-element">
                            <p>이름</p>
                        </div>
                        <div className="MyPage-element-value">
                            <p>{name}</p>
                        </div>
                    </div>

                    <div className="MyPage-container-element">
                        <div className="MyPage-element">
                            <p>생년월일</p>
                        </div>
                        <div className="MyPage-element-value">
                            <p>{birthDate}</p>
                        </div>
                    </div>

                    <div className="MyPage-container-element">
                        <div className="MyPage-element">
                            <p>아이디</p>
                        </div>
                        <div className="MyPage-element-value">
                            <p>{id}</p>
                        </div>
                    </div>

                    <div className="MyPage-container-element">
                        <div className="MyPage-element">
                            <p>비밀번호</p>
                        </div>
                        <div className="MyPage-element-value">
                            <button className="MyPage-element-button" onClick={resetPasswordToggleBox}>변경</button>
                        </div>

                        {resetPasswordBox && (
                            <div className="ResetPasswordBox" id="myBox">
                                <input
                                    className="Reset-password-textbox"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    minLength="8"
                                    maxLength="16"
                                    placeholder="비밀번호 변경"/>
                                <button className="ResetPasswordBox-button" onClick={handleResetPassword}>비밀번호 변경</button>
                            </div>
                        )}

                    </div>

                </div>
            </header>

        </div>
    );
}

export default MyPage;
