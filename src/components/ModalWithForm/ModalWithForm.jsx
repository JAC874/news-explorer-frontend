import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, title, altButtonTxt }) {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close"></button>
        <form action="" className="modal__form">
          {children}

          <div className="modal__button-container">
            <button className="modal__submit-btn">{buttonText}</button>
            <div className="modal__text-btn-container">
              <button className="modal__text-btn">
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
