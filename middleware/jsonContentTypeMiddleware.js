// jsonContentTypeMiddleware.js

const jsonContentTypeMiddleware = (req, res, next) => {
  const contentType = req.headers['content-type'];

  if (!contentType || !contentType.includes('application/json')) {
    return res.status(400).json({ message: 'Invalid content type. Only JSON is accepted.' });
  }

  next();
};
 module.exports = jsonContentTypeMiddleware;