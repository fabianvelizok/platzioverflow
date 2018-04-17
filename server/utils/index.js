export const handleError = (error, res, _message, _status) => {
  const message = _message || 'An error ocurred.';
  const status = _status || 500;

  return res.status(status).json({
    message,
    error
  });
}
