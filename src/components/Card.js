import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ name, link, likes, onCardClick, onCardLike, onCardDelete, card }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = currentUser._id === card.owner._id;
  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  function handleClick() {
    onCardClick(name, link);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      {isOwn && (
        <button
          className="card__delete-btn opacity-on-hover"
          type="button"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img className="card__image" src={link} alt={name} onClick={handleClick} />
      <div className="card__info">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-container">
          <button
            className={`card__like opacity-on-hover ${isLiked && 'card__like_active'}`}
            onClick={handleLikeClick}
            type="button"
            aria-label="Лайк"
          ></button>
          <span className="card__like-count">{likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
