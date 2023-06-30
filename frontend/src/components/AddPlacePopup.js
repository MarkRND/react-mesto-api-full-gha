import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen])

  const handleAddSubmit = (evt) => {
    evt.preventDefault();
    onAddCard({
      name,
      link,
    });
  };

  const handleEditName = (evt) => {
    const text = evt.target.value;
    setName(text);
  };

  const handleEditLink = (evt) => {
    const text = evt.target.value;
    setLink(text);
  };


  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title={"Новое место"}
      name={"add"}
      buttonText={"Сохранить"}
      onSubmit={handleAddSubmit}
      children={
        <>
          <input
            className="popup__input"
            id="title-input"
            name="name"
            type="text"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
            onChange={handleEditName}
            value={name}
          />
          <span className="popup__input-error title-input-error" />

          <input
            className="popup__input"
            id="link-input"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            minLength="2"
            maxLength="200"
            required
            onChange={handleEditLink}
            value={link}
          />
          <span className="popup__input-error profession-input-error" />
        </>
      }
    />
  );
}

export default AddPlacePopup;
