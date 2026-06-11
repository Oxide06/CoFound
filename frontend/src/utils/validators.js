export const emailPattern = {
  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: "Enter a valid email"
};

export const required = (label) => ({
  required: `${label} is required`
});

export const minLength = (length) => ({
  minLength: {
    value: length,
    message: `Must be at least ${length} characters`
  }
});
