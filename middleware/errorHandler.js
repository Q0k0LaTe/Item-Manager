export const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        // Development error response
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            res.status(err.statusCode).json({
                status: err.status,
                error: err,
                message: err.message,
                stack: err.stack
            });
        } else {
            res.status(err.statusCode).render('error', {
                title: 'Error',
                message: err.message,
                error: err
            });
        }
    } else {
        // Production error response
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        } else {
            res.status(err.statusCode).render('error', {
                title: 'Error',
                message: 'Something went wrong!',
                error: {}
            });
        }
    }
};
