import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormValidation } from "../../utils/useFormValidation";

function LoginModal({ onClose, isOpen, setActiveModal, isLoading }) {
  const { values, handleChange, isValid, resetForm, errors } =
    useFormValidation();
  const handleSubmit = () => {
    handleLogin(values, resetCurrentForm);
  };

  const resetCurrentForm = () => {
    resetForm({ email: "", password: "" });
  };

  return (
    <ModalWithForm
      title="Sign in"
      buttonText={isLoading ? "Signing In" : "Sign in"}
      altButtonTxt={"Sign up"}
      onClose={onClose}
      isOpen={isOpen}
      altButtonClick={() => setActiveModal("register")}
      onSubmit={handleSubmit}
      formValid={isValid}
    >
      <label htmlFor="email-login" className="modal__label">
        Email{" "}
      </label>

      <input
        type="email"
        className="modal__input"
        id="email-login"
        name="email"
        placeholder="Enter email"
        minLength="4"
        maxLength="64"
        onChange={handleChange}
        required
      />

      <span
        className={`modal__input-error ${
          errors.email ? "modal__input-error_visible" : ""
        }`}
        id="email-error"
      >
        {errors.email}
      </span>

      <label htmlFor="password-login" className="modal__label">
        Password{" "}
      </label>

      <input
        type="password"
        className="modal__input"
        id="password-login"
        name="password"
        placeholder="Enter password"
        onChange={handleChange}
        required
      />
      <span
        className={`modal__input-error ${
          errors.password ? "modal__input-error_visible" : ""
        }`}
        id="password-error"
      >
        {errors.password}
      </span>
    </ModalWithForm>
  );
}

export default LoginModal;
