import Register from "./register/Register";
import Login from "./login/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileEdit from "./editProfile/editProfile";
import Home from "./home/Home.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/edit-profile" element={<ProfileEdit />} />
            </Routes>
        </Router>
    );
}

export default App;