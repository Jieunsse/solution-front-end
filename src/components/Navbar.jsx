import { Link, useNavigate } from 'react-router-dom';
import logo from '../../public/logo.svg';
// import { FaBars } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { userDataAtom } from './Atoms/Atoms';
import CryptoJS from 'crypto-js';
import NavLogin from '../../public/assets/NavbarLogin/NavLogin.svg';
import NavLogOut from '../../public/assets/NavbarLogin/NavLogOut.svg';
import User from '../../public/user.svg';
import DropMenus from './DropDown/DropMenus.jsx';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [userData, setUserData] = useAtom(userDataAtom);
  const navigate = useNavigate();

  const handleMove = () => {
    navigate();
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const decryptedData = CryptoJS.AES.decrypt(
        storedUserData,
        'secret key',
      ).toString(CryptoJS.enc.Utf8);
      setUserData(JSON.parse(decryptedData));
    }
  }, []);

  const handleShow = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    removeUserInfoFromLocalStorage();
    setUserData(null);
  };

  const removeUserInfoFromLocalStorage = () => {
    localStorage.removeItem('userData');
  };

  useEffect(() => {
    if (userData) {
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(userData),
        'secret key',
      ).toString();
      localStorage.setItem('userData', encryptedData);
    } else {
      removeUserInfoFromLocalStorage();
    }
  }, [userData]);

  return (
    <nav className="flex top-0 items-center p-5 w-full max-w-[500px] flex-1 z-1 bg-white fixed">
      <DropMenus  className="max-w-full max-h-full"/>

      <Link to="/" className="flex justify-center flex-1 mr-28 pointer-events-none">
        <img src={logo} alt="logo" className="max-w-full max-h-full pointer-events-auto" />
      </Link>

      <div className="absolute flex right-3">
        {userData ? (
          <Link to="/MyPage">
          <div className="flex gap-4">
            <div
              className="flex flex-col justify-center items-center"
              onClick={handleMove}
            >
              <img
                src={userData.photoURL ? userData.photoURL : User}
                className="w-8 h-8 rounded-full"
                alt="user"
              />
              {userData.displayName
                ? userData.displayName
                : userData.email.split('@')[0]}
            </div>
            <Link to="/">
            <img onClick={handleLogout} src={NavLogOut} alt="logout" />
            </Link>
          </div>
          </Link>
        ) : (
          <Link to="/login">
            <img src={NavLogin} alt="login" />
          </Link>
        )}
      </div>

    </nav>
  );
}

export default Navbar;
