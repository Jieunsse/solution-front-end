import { useParams } from 'react-router-dom';
import data from '../data/data.json';
import { Card, CardBody, CardFooter, Divider} from '@nextui-org/react';

const RecruitingBoardDetail = () => {
  const { id } = useParams();

  const selectedItem = data.find((item) => item.id === id);

  if (!selectedItem) return <div>Item not found</div>;

  return (
    <div>
      <Card className="text-lg mb-20 text-center p-4 mt-20">
        {selectedItem.title}
      </Card>

      <Card>
        <CardBody>
          <p className="mt-2 mb-4">Place : {selectedItem.place}</p>
          <p className="mb-2">Activity Period: {selectedItem.period}</p>
          <p className="mt-2 mb-4">Date : {selectedItem['meeting date']}</p>
          <p className="mb-2">Activity Area: {selectedItem.field}</p>
          <p className="mt-2 mb-2">Required : {selectedItem.required}</p>
        </CardBody>

        <Divider />

        <CardFooter className="mt-4 mb-4">
        </CardFooter>

      </Card>
    </div>
  );
};

export default RecruitingBoardDetail;
