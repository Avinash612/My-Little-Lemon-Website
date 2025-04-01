
const FormField = ({ children, label, htmlFor, hasError, errorMessage }) => (
  <div className="form-field">
    <label htmlFor={htmlFor}>{label}</label>
    {children}
    {hasError && errorMessage && (
      <p data-testid="error-message">{errorMessage}</p>
    )}
  </div>
);

export default FormField;
