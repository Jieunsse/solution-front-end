import { Link } from 'react-router-dom';
import logo from '../../public/logo.svg';
import { FaBars } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', closeMenu);

    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  }, []);

  const handleShow = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="flex fixed top-0 items-center p-5 w-full max-w-[500px] flex-1 z-1 bg-white">
      <FaBars onClick={handleShow} className="w-12 h-5 absolute left-5" />
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
        </div>
      )}
      <Link to="/" className="flex justify-center flex-1">
        <img src={logo} />
      </Link>
      <Link to="/login" className="absolute flex right-3 ">
        <button>login</button>
      </Link>
    </nav>
  );
}

export default Navbar;
