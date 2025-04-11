import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SignUp.css";
import axios from "axios";


function SignUp() {
    const [birthDate, setBirthDate] = useState("");
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    let [samevalue, setSamevalue] = useState(false);
    const navigate = useNavigate();
    const handleDateChange = (e) => {
        setBirthDate(e.target.value); // 선택된 날짜를 상태로 저장
    }

    // const handleSignUp = () => {
    //     console.log("Name:", name);
    //     console.log("BirthDate:", birthDate);
    //     console.log("Id:", id);
    //     console.log("Password:", password);
    //     console.log("==========================");
    //     if (name !== "" && birthDate !== "" && id !== "" && password !== "" && samevalue === true) {
    //         alert("회원가입 성공");
    //     }
    //     else {
    //         alert("다시 시도해보세요")
    //     }
    // };
    const handleSignUp = (e) => {
        e.preventDefault();

        if (name === "") {
            alert("이름을 입력하세요.");
        } else if (birthDate === "") {
            alert("생년월일을 입력하세요.");
        } else if (id === "") {
            alert("아이디를 입력하세요.");
        } else if (password === "") {
            alert("비밀번호를 입력하세요.");
        }else if (password.length < 8 || password.length > 16) {
            alert("비밀번호 길이는 최소 8글자 최대 16글자입니다.")
        }
        else if (!samevalue) {
            alert("아이디 중복을 체크하세요.");
        } else {
            const userData = {
                birthDate: birthDate,
                name: name,
                id: id,
                password: password,
            };

            const url = `http://localhost:8080/api/signup`;

            axios
                .post(url, userData)
                .then((_response) => {
                    alert(`${id}님 회원가입 성공`);
                    navigate("/");
                })
                .catch((error) => {
                    alert("회원가입 실패");
                });
        }
    };

    const handleSame = (e) => {
        e.preventDefault();
        const userData = {
            id: id,
        };

        console.log("보내는 ID:", userData.id);
        axios.get(`http://localhost:8080/api/signup/IdCheck/${userData.id}`)
            .then((response) =>{
                if(response.data === true){
                    alert('사용 가능한 아이디입니다')
                    setSamevalue(true);
                } else {
                    alert('중복된 아이디입니다')
                    setSamevalue(false);

                }

            }).catch((_error) => {
                alert('적절한 값을 입력하세요')
                setSamevalue(false)
        });
    };


    return (
        <div className="SignUp">
            <header className="SignUp-header">
                <div className="SignUp-home-container">
                    <button className="SignUp-home-button" type="button" onClick={() => navigate("/")}>We go high</button>
                </div>
                <div className="SignUp-location-container">
                    <div className="SignUp-location">
                        회원가입
                    </div>
                </div>
                <div className="SignUp-container">
                    <div className="SignUp-container-element">
                        <div className="SignUp-element-container">
                            <p className="SignUp-element-box">이름</p>
                            <input
                                className="SignUp-textbox"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <p className="SignUp-element-box">생년월일</p>
                            <input
                                className="SignUp-textbox"
                                type="date"
                                id="startDate"
                                value={birthDate}
                                onChange={handleDateChange}
                                max="9999-12-31"
                            />
                        </div>
                        <div className="SignUp-element-container">
                            <p className="SignUp-element-box">ID</p>
                            <input
                                className="SignUp-textbox"
                                type="text"
                                value={id}
                                onChange={(e) => {
                                    setId(e.target.value);
                                     setSamevalue(false);
                                }}
                                placeholder="아이디 입력"/>
                            <div className="SignUp-same-box">
                                <button className="SignUp-same-button" onClick={handleSame}>
                                    중복확인
                                </button>
                            </div>
                        </div>

                        <div className="SignUp-element-container">
                            <p className="SignUp-element-box">PW</p>
                            <input className="SignUp-textbox"
                                   type="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   minLength="8"
                                   maxLength="16"
                                   placeholder="비밀번호 입력"/>
                        </div>

                        <div className="SignUp-element-container">
                            <p className="SignUp-element-box">Email</p>
                            <input className="SignUp-textbox"
                                   type="text"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   placeholder="이메일 입력"/>
                        </div>

                        <div className="SignUp-container-signup">
                            <button className="Sign-up-button" onClick={handleSignUp}>
                                회원가입
                            </button>
                        </div>

                    </div>
                </div>

            </header>
        </div>
    );
}

export default SignUp;
