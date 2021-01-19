
function middleware(req, res, next) {
    console.log('hello from middleware');

    console.log(req.params);

    if (req.params.catId) {
        next();
        return;
    }

    res.status(403).send('You need to specify catId');
}

module.exports = middleware;