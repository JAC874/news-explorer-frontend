import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  altButtonTxt,
  onClose,
  isOpen,
  altButtonClick,
  formValid,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        ></button>
        <form action="" className="modal__form">
          {children}

          <div className="modal__button-container">
            <button
              className={`modal__submit-btn  ${
                !formValid ? "modal__submit-btn_disabled" : ""
              }`}
              type="submit"
              disabled={`${!formValid ? "disabled" : ""}`}
            >
              {buttonText}
            </button>
            <div className="modal__text-btn-container">
              <button
                className="modal__text-btn"
                type="button"
                onClick={altButtonClick}
              >
                <span className="modal__or-txt">or </span>
                {altButtonTxt}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
