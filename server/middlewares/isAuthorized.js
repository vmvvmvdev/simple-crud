const isAuthorized = (req, res, next) => {
  if (!req.user) {
    const unauthorizedError = new Error('Unauthorized');
    unauthorizedError.status = 401;
    return next(unauthorizedError);
  } else {
    return next();
  }
}

module.exports = isAuthorized;