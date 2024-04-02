/**
 * Error handling middleware to catch and handle errors in the application.
 * @module middlewares/errorHandler
 */
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
}

module.exports = errorHandler;
