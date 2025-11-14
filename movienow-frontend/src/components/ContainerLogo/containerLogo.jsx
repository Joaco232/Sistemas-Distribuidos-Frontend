import "./containerLogo.css";

export default function PlatformBubble({ name, logo, selected, onClick }) {
  return (
    <div
      className={`platform-bubble ${selected ? "selected" : ""}`}
      onClick={onClick}
      title={name}
    >
      <img src={logo} alt={name} className="bubble-logo" />
    </div>
  );
}