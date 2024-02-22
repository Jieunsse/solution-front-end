import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import { Image } from '@nextui-org/react';

function Footer() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <footer
      className="fixed bottom-0 max-w-[500px] h-16 w-full flex justify-between items-center p-5 "
      style={{ backgroundColor: '#E4E4E4' }}
    >
      <FaBars className="text-gray-600 cursor-pointer"/>
      <Link to="/" className="text-gray-600 text-tiny text-center mt-2 mb-1">
        {/*<MdOutlineCheckBoxOutlineBlank />*/}
        <Image
          src="/assets/miniLogo/miniLogo.svg"
          width={40}
          className="mb-1"
        />
        HOME
      </Link>
      <div className="text-tiny text-gray-600 mt-4 text-center">
      <Image src="public/assets/icons/back.svg" onClick={goBack} className="cursor-pointer mb-2 ml-1" width={30}/>
        BACK
      </div>
    </footer>
  );
}

export default Footer;
