function InfoTooltip({ message, onClose }) {
  return (
    <div className={`popup popup_type_info` + (message ? " popup_opened" : "")}>
      <div className="popup__profile">
        <p
          className={
            " popup__info-message" +
            (message
              ? message.isSuccess
                ? " popup__info-message_ok"
                : " popup__info-message_bad"
              : "")
          }
        >
          {message ? message.text : ""}
        </p>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
