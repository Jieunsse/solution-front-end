import { FaHome, FaBars } from 'react-icons/fa';
import { GrPrevious } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <footer className="fixed bottom-0 max-w-md w-full border-t flex justify-between items-center p-5 bg-white">
      <FaBars className="text-gray-600 cursor-pointer" />
      <Link to="/" className="text-gray-600 text-xl">
        <FaHome className="" />
      </Link>
      <GrPrevious onClick={goBack} className="cursor-pointer" />
    </footer>
  );
}

export default Footer;
