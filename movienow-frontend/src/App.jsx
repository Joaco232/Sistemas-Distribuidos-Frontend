import Register from "./register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;