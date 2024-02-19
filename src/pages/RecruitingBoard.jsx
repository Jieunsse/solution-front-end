import { useState } from 'react';
import { Link } from 'react-router-dom'; // Link import 추가
import datas from '../data/data.json';

function Card() {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = datas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-y-auto">
      <div className="flex flex-col gap-2 pt-10">
        {currentItems.map((item) => (
          <Link
            key={item.id}
            to={`/recruit/detail/${item.id}`}
            className="w-11/12 m-auto p-2 rounded-md block"
            style={{ backgroundColor: '#E4E4E4', textDecoration: 'none' }}
          >
            <ul id={item.id}>
              <li className="text-[18px]">{item.title}</li>
              <li className="text-[12px]">{item.place}</li>
              <li className="text-[12px]">{item.period}</li>
              <li className="text-[12px]"> {item['meeting date']}</li>
              <li className="text-[12px]">{item.field}</li>
            </ul>
          </Link>
        ))}
      </div>
      <ul className="flex justify-center gap-2">
        {Array.from({ length: Math.round(datas.length / itemsPerPage) }).map(
          (_, index) => (
            <li
              key={index}
              onClick={() => paginate(index + 1)}
              className="cursor-pointer"
            >
              {index + 1}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

export default Card;
