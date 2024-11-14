import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormValidation } from "../../utils/useFormValidation";

function RegisterModal({
  onClose,
  isOpen,
  setActiveModal,
  isLoading,
  handleRegistration,
}) {
  const { values, handleChange, isValid, resetForm, errors } =
    useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure handleRegistration is called with correct data
    handleRegistration(
      {
        email: values.email,
        password: values.password,
        username: values.username,
      },
      resetCurrentForm
    );
  };

  const resetCurrentForm = () => {
    resetForm({ email: "", password: "", username: "" });
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText={isLoading ? "Signing up" : "Sign up"}
      altButtonTxt={"Sign in"}
      onClose={onClose}
      isOpen={isOpen}
      altButtonClick={() => setActiveModal("login")}
      onSubmit={handleSubmit}
      formValid={isValid}
    >
      <label htmlFor="email-login" className="modal__label">
        Email{" "}
      </label>

      <input
        type="email"
        className="modal__input"
        id="email-register"
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
        id="password-register"
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

      <label htmlFor="username-login" className="modal__label">
        Username{" "}
      </label>

      <input
        type="text"
        className="modal__input"
        id="username-register"
        name="username"
        placeholder="Enter your username"
        minLength="4"
        maxLength="24"
        onChange={handleChange}
        required
      />

      <span
        className={`modal__input-error ${
          errors.username ? "modal__input-error_visible" : ""
        }`}
        id="username-error"
      >
        {errors.username}
      </span>
    </ModalWithForm>
  );
}

export default RegisterModal;
