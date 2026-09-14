function errorHandler(err, req, res, next) {
  console.error('[Server Exception]', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
}

module.exports = { errorHandler };
