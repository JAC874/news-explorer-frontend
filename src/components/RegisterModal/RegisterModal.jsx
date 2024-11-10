import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ onClose, isOpen, setActiveModal, isLoading }) {
  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isLoading ? "Signing up" : "Sign up"}
      altButtonTxt={"Sign in"}
      onClose={onClose}
      isOpen={isOpen}
      altButtonClick={() => setActiveModal("login")}
    >
      <label htmlFor="email-login" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email-register"
          name="email"
          placeholder="Enter email"
          minLength="4"
          maxLength="64"
          required
        />
      </label>
      <label htmlFor="password-login" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password-register"
          name="password"
          placeholder="Enter password"
          required
        />
      </label>
      <label htmlFor="username-login" className="modal__label">
        Username{" "}
        <input
          type="text"
          className="modal__input"
          id="username-register"
          name="password"
          placeholder="Enter your username"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
