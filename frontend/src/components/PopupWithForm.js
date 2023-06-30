const PopupWithForm = ({
  name,
  title,
  children,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) => {
  return (
    <div className={`popup popup_mode_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__profile">
        <h2 className="popup__edit">{title}</h2>
        <button
          onClick={onClose}
          className="popup__close-button"
          type="button"
        ></button>
        <form
          className={`popup__form popup__form_${name}`}
          name={`popup${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__save-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
