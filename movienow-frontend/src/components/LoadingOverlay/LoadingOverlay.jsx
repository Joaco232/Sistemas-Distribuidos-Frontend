import "./LoadingOverlay.css";
import ReactDOM from "react-dom";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner.jsx";

export default function LoadingOverlay() {
    return ReactDOM.createPortal(
        <div className="loading-overlay">
            <LoaderSpinner />
        </div>,
        document.body
    );
}