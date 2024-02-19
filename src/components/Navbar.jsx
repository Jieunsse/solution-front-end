import { Link, useNavigate } from 'react-router-dom';
import logo from '../../public/logo.svg';
import { FaBars } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { userDataAtom } from './Atoms/Atoms';
import CryptoJS from 'crypto-js';
import LoginIcon from '../../public/login.svg';
import User from '../../public/user.svg';

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
    <nav className="flex fixed top-0 items-center p-5 w-full max-w-[500px] flex-1 z-1 bg-white">
      <FaBars onClick={handleShow} className="w-14 h-5 absolute left-5" />
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-16 left-5 flex flex-col w-32 gap-2 text-[14px]"
        >
          <Link
            to="/noticeBoard"
            className=" border-2 rounded-md bg-white h-12 flex justify-center items-center"
            onClick={() => setIsOpen(false)}
          >
            📋 Notice Board
          </Link>
          <Link
            to="/write"
            className=" border-2 rounded-md bg-white h-12 flex justify-center items-center"
            onClick={() => setIsOpen(false)}
          >
            📝 Write Board
          </Link>
          <Link
            to="/recruit"
            className=" border-2 rounded-md bg-white h-12 flex justify-center items-center z-10"
            onClick={() => setIsOpen(false)}
          >
            🔖 Recruiting Board
          </Link>
        </div>
      )}
      <Link to="/" className="flex justify-center flex-1">
        <img src={logo} />
      </Link>
      <div className="absolute flex right-3 ">
        {userData ? (
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
            <img onClick={handleLogout} src={LoginIcon} alt="logout" />
          </div>
        ) : (
          <Link to="/login">
            <img src={LoginIcon} alt="login" />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
