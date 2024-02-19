import Cards from '../Card/Cards.jsx';

const Decks = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-8 mx-2">
      <Cards title="Voltee01" due="2024.09.23 ~ 2024.11.24" location="seoul" img="src/assets/CardImg/Vol01.png" />
      <Cards title="Voltee02" due="2024.07.11 ~ 2025.02.08" location="Dague" img="src/assets/CardImg/VOl01.png" />
      <Cards/>
      <Cards/>
      <Cards/>
    </div>
  );
}

export default Decks;