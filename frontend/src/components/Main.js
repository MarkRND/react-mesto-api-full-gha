import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onClose,
  onCardDelete,
  cards,
  onCardLike,
  email,
  onLogout,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header isWrappable={true}>
        <p className="header__menu-component">{email}</p>
        <button href="#" className="header__menu-component header__menu-component_exit" onClick={onLogout}>
          Выйти
        </button>
      </Header>
      <section className="profile">
        <div className="profile__user">
          <button
            className="profile__avatar"
            type="button"
            aria-label="Редактировать аватар"
            onClick={onEditAvatar}
          >
            <img
              className="profile__image"
              src={currentUser.avatar}
              alt="Изображение профиля"
            ></img>
          </button>
          <div className="profile__info">
            <div className="profile__editing">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button hover-button"
                type="button"
                aria-label="Редактировать профиль"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button hover-button"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {cards.map((cardData) => (
          <Card
            key={cardData._id}
            data={cardData}
            onCardClick={onCardClick}
            onClose={onClose}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </>
  );
}

export default Main;
