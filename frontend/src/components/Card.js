import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ onCardClick, data, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = data.likes.some((id) => id === currentUser._id);
  const isOwn = data.owner === currentUser._id;
  const cardLikeButtonClassName = `element__button ${
    isLiked && "element__button_active"
  }`;

  const handleImageClick = () => onCardClick(data);
  const handleDeleteClick = () => onCardDelete(data);
  const handleCardLike = () => {
    onCardLike(data);
  };

  return (
    <div className="element">
      <img
        className="element__image"
        src={data.link}
        alt={data.name}
        onClick={handleImageClick}
      />

      {isOwn && (
        <button
          type="button"
          className="element__basket"
          aria-label="Корзина"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="element__caption">
        <h2 className="element__name">{data.name}</h2>
        <div className="element__like-place">
          <button
            className={cardLikeButtonClassName}
            aria-label="Понравилось"
            onClick={handleCardLike}
          ></button>
          <p className="element__like-quantity">{data.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
