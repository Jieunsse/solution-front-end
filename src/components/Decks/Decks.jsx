import Cards from '../Card/Cards.jsx';
import { useState } from 'react';
import data from '../../data/data.json';
// import { CardsInfo } from '../../data/CardsData.js'

const Decks = () => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const cardsPerPage = 6; // 페이지 당 카드 수
  const totalCards = 15; // 전체 카드 수

  // 현재 페이지의 첫 번째 카드 인덱스
  const indexOfFirstCard = (currentPage - 1) * cardsPerPage;
  // 현재 페이지의 마지막 카드 인덱스
  const indexOfLastCard = Math.min(indexOfFirstCard + cardsPerPage, totalCards);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-4 mx-2">
      <div className="grid grid-cols-2 gap-4">
        {data.slice(indexOfFirstCard, indexOfLastCard).map((data, index) => (
          <Cards
            key={index}
            id={data.id} // id prop 전달
            title={data.title}
            period={data.period}
            place={data.place}
            img={data.img}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <div className="absolute bottom-24">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 mx-1 ${currentPage === pageNumber ? 'bg-2583db text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Decks;