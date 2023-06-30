import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarLink = useRef();

  const handleAvatarSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarLink.current.value,
    });
  };
  useEffect(() => {
    avatarLink.current.value = "";
  }, [isOpen]);
  
  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"avatar"}
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAvatarSubmit}
      children={
        <>
          <input
            className="popup__input"
            id="avatar-input"
            name="avatar"
            type="url"
            placeholder="Ссылка на аватар пользователя"
            minLength="2"
            maxLength="200"
            required
            ref={avatarLink}
          />
          <span className="popup__input-error avatar-input-error" />
        </>
      }
    />
  );
}

export default EditAvatarPopup;
