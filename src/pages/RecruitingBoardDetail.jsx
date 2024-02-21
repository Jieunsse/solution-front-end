import { useParams } from 'react-router-dom';
import data from '../data/data.json';
import { Card, CardHeader, CardBody, Divider} from '@nextui-org/react';

const RecruitingBoardDetail = () => {
  const { id } = useParams();

  const selectedItem = data.find((item) => item.id === id);

  if (!selectedItem) return <div>Item not found</div>;

  return (
    <div>


      <Card className="mt-24">
        <CardHeader className="text-lg mb-1 text-center p-4">
          {selectedItem.title}
        </CardHeader>
        <Divider/>
        <CardBody>
          <p className="mt-2 mb-4">Place : {selectedItem.place}</p>
          <p className="mb-2">Activity Period: {selectedItem.period}</p>
          <p className="mb-2">Activity Area: {selectedItem.field}</p>
          <p className="mt-2 mb-2">Required : {selectedItem.required}</p>
        </CardBody>
      </Card>

      <Card className="mt-4">
        <CardBody className="text-balance text-center leading-8">
          {selectedItem.article}
        </CardBody>
      </Card>
    </div>
  );
};

export default RecruitingBoardDetail;
