import PopupWithForm from "./PopupWithForm";

function DeletePopup({ isOpen, onClose, onDeleteCard }) {
  const handleBasketSubmit = (evt) => {
    evt.preventDefault();
    onDeleteCard(isOpen);
  };

  return (
    <PopupWithForm
      buttonText={"Да"}
      isOpen={isOpen}
      onClose={onClose}
      title={"Вы уверены?"}
      name={"delete"}
      onSubmit={handleBasketSubmit}
    />
  );
}

export default DeletePopup;
