import { useState } from 'react';
import datas from '../data/data.json';

function Card() {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = datas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-y-auto gap-2 h-full">
      {currentItems.map((item) => (
        <div key={item.id} className="border-2 w-11/12 m-auto" >
          <h1 className="text-[22px]">{item.title}</h1>
          <p>{item.place}</p>
          <p>{item.period}</p>
          <p>{item['meeting date']}</p>
          <p>{item.field}</p>
        </div>
      ))}
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
