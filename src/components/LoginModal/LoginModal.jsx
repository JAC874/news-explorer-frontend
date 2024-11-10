import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ onClose, isOpen, setActiveModal, isLoading }) {
  return (
    <ModalWithForm
      title="Sign in"
      buttonText={isLoading ? "Signing In" : "Sign in"}
      altButtonTxt={"Sign up"}
      onClose={onClose}
      isOpen={isOpen}
      altButtonClick={() => setActiveModal("register")}
    >
      <label htmlFor="email-login" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email-login"
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
          id="password-login"
          name="password"
          placeholder="Enter password"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
