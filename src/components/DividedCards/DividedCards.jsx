import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import miniLogo from '/assets/miniLogo/miniLogo.svg';

// eslint-disable-next-line react/prop-types
const DividedCards = ({ noticeBoardData }) => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src={miniLogo}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">NextUI</p>
          <p className="text-small text-default-500">nextui.org</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <ul>
          {/* eslint-disable-next-line react/prop-types */}
          {noticeBoardData.map((item) => (
            <li key={item.id}>
              <Link to={`/noticeBoard/detail/${item.id}`}>
                <p>Title: {item.title}</p>
                <p>Duration: {item.startDate} ~ {item.endDate}</p>
                <p>Content: {item.mainContent}</p>
              </Link>
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
}

export default DividedCards;
