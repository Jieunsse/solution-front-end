import { useParams } from 'react-router-dom';
import datas from '../data/data.json';

const RecruitingBoardDetail = () => {
  const { id } = useParams();

  const selectedItem = datas.find((item) => item.id === id);

  if (!selectedItem) return <div>Item not found</div>;

  return (
    <div>
      <h1 className="text-[24px]">{selectedItem.title}</h1>
      <p>Activity Period: {selectedItem.period}</p>
      <p>Activity Area: {selectedItem.field}</p>
      <p>{selectedItem.place}</p>
      <p>{selectedItem['meeting date']}</p>
    </div>
  );
};

export default RecruitingBoardDetail;
