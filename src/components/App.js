import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './Login';
import IdFind from "./IdFind";
import PwFind from "./PwFind";
import SignUp from "./SignUp";
import News from "./News";
import MyPage from "./MyPage";
import Home from "./Home";
import OAuth2RedirectHandler from './OAuth2RedirectHandler';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/idfind" element={<IdFind />} />
                <Route path="/pwfind" element={<PwFind />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/news" element={<News />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
            </Routes>
        </Router>
    );
}

export default App;
