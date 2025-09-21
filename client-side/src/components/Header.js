import { LuNotebookPen } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import "./Header.css";

const Header = ({ handleModalShow }) => {
  return (
    <nav className="nav-container">
      <div className="logo-section">
        <LuNotebookPen className="app-icon" />
        <h1 className="app-name">Contact Book</h1>
      </div>
      <button
        type="button"
        className="add-btn"
        onClick={() => handleModalShow()}
      >
        <FiPlus size={17} />
        Add
      </button>
    </nav>
  );
};
export default Header;
