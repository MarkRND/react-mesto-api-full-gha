function ImagePopup({ onClose, card }) {
  return (
    <div className={`popup popup_mode_image ${card.isOpen && "popup_opened"}`}>
      <div className="popup__content">
        <button
          className="popup__close-button popup__close-button_mode_image hover-button"
          type="button"
          aria-label="закрыть форму"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__caption">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
