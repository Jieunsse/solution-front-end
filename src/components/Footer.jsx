import { FaBars } from 'react-icons/fa';
import { GrPrevious } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';

function Footer() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <footer
      className="fixed bottom-0 max-w-md w-full flex justify-between items-center p-5"
      style={{ backgroundColor: '#E4E4E4' }}
    >
      <FaBars className="text-gray-600 cursor-pointer" />
      <Link to="/" className="text-gray-600 text-xl">
        <MdOutlineCheckBoxOutlineBlank />
      </Link>
      <GrPrevious onClick={goBack} className="cursor-pointer" />
    </footer>
  );
}

export default Footer;
