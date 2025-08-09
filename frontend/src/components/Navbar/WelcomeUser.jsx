//css import
import "./WelcomeUser.css";

//react hook
import { useRef } from "react";

//icons
import { CircleUser } from "lucide-react";
import { LogOut } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";

//react router
import { Link } from "react-router-dom";

//react import
import React from "react";

const WelcomeUser = ({
  email,
  userName,
  itsOpen,
  setItsOpen,
  handelLogout,
}) => {
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setItsOpen((prev) => !prev);
  };

  const handelCloseMenu = () => {
    setItsOpen(false);
  };

  return (
    <>
      <li className="WelcomeUser" onClick={toggleMenu}>
        <ChevronDown style={{ color: "#fff" }} />
        Hello, {userName}
      </li>
      <CSSTransition
        in={itsOpen}
        timeout={300}
        classNames="dropdown"
        unmountOnExit
        nodeRef={dropdownRef}
      >
        <div className="dropdownMenu" ref={dropdownRef}>
          <div className="userInfo">
            <CircleUser size={32} color="#333" />
            <div className="textInfo">
              <h1 className="userName">{userName}</h1>
              <p className="userEmail">{email}</p>
            </div>
          </div>

          <div className="menuOptions">
            <div className="Setting">
              <p className="others">others:</p>
              <Link to={"/Settings"} className="menuItem">
                Settings
              </Link>
            </div>
            <div className="tt">
              <div className="logotContent" onClick={handelLogout}>
                <LogOut />
                <p className="logoutBtn">Log Out</p>
              </div>
              <div className="closeContent" onClick={handelCloseMenu}>
                <ChevronUp size={28} />
                <p className="closeBtn">Close</p>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
const MemoizedWelcomeUser = React.memo(WelcomeUser);
export default MemoizedWelcomeUser;
