import Register from "./register/Register";
import Login from "./login/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileEdit from "./editProfile/editProfile";
import Home from "./home/Home";
import EditPassword from "./editPassword/editPassword";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/edit-profile" element={<ProfileEdit />} />
                <Route path="/home" element={<Home />} />
                <Route path="/edit-password" element={<EditPassword />} />
            </Routes>
        </Router>
    );
}

export default App;