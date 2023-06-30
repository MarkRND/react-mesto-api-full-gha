import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onEditUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);
  const handleEditName = (evt) => {
    const text = evt.target.value;
    setName(text);
  };
  const handleEditSubmit = (evt) => {
    evt.preventDefault();
    onEditUser({
      name,
      about: description,
    });
  };

  const handleEditDescription = (evt) => {
    const text = evt.target.value;
    setDescription(text);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title={"Редактировать профиль"}
      name={"edit"}
      buttonText={"Сохранить"}
      onSubmit={handleEditSubmit}
      children={
        <>
          <input
            className="popup__input"
            id="name-input"
            name="name"
            type="text"
            placeholder="Имя пользователя"
            minLength="2"
            maxLength="40"
            required
            onChange={handleEditName}
            value={name ?? ""}
          />
          <span className="popup__input-error name-input-error" />

          <input
            className="popup__input"
            id="profession-input"
            name="profession"
            type="text"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
            onChange={handleEditDescription}
            value={description ?? ""}
          />
          <span className="popup__input-error profession-input-error" />
        </>
      }
    />
  );
}

export default EditProfilePopup;
