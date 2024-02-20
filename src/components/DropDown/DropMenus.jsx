import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const DropMenus = () => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    navigate(path);
  };

  // DropdownTrigger 클릭 시 드롭다운 메뉴가 닫히지 않도록 이벤트 막기
  const handleDropdownClick = (e) => {
    e.preventDefault();
    dropdownRef.current.toggle();
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" color="solid">
          Menus
        </Button>
      </DropdownTrigger>
      <DropdownMenu ref={dropdownRef} aria-label="Static Actions">
        <DropdownItem onClick={() => handleItemClick('/noticeBoard')}>
          <Link to="/noticeBoard" onClick={handleDropdownClick}>
            📢 Notice
          </Link>
        </DropdownItem>
        <DropdownItem onClick={() => handleItemClick('/write')}>
          <Link to="/write" onClick={handleDropdownClick}>
            📝 BoardWrite
          </Link>
        </DropdownItem>
        <DropdownItem onClick={() => handleItemClick('/recruit')}>
          <Link to="/recruit" onClick={handleDropdownClick}>
            🙌 Recruit
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropMenus;
