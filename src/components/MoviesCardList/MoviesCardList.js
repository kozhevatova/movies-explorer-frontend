import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

const MoviesCardList = ({cardList, isOnSavedPage}) => {
  return <ul className="movies-cardlist">
    {
      cardList.map((card) => {
        return <MoviesCard key={card._id} image={card.image} nameRU={card.nameRU} duration={card.duration} 
          isOnSavedPage={isOnSavedPage} />
      })
    }
  </ul>
}

export default MoviesCardList;