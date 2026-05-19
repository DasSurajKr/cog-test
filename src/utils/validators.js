export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validateLogin = ({ email, password }) => {
  const errors = {};
  if (!email) errors.email = 'Email is required';
  else if (!isValidEmail(email)) errors.email = 'Invalid email address';
  if (!password) errors.password = 'Password is required';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
  return errors;
};

export const validateRegister = ({ name, email, password, confirmPassword }) => {
  const errors = validateLogin({ email, password });
  if (!name?.trim()) errors.name = 'Name is required';
  if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
  return errors;
};
