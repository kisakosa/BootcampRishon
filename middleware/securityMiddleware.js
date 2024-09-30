class SecurityMiddleware {
    static secure() {
        return (req, res, next) => {
            try {
                this.checkInjections(req, next);
            } catch (e) {
                return res.send('Invalid request');
            }
        }
    }

    static checkInjections(req, next) {
        for (let param in req.params) {
            if (req.params[param].indexOf('..') > -1 || req.params[param].indexOf('/') > -1 || req.params[param].indexOf('\\') > -1) {
                throw new Error('Invalid Request')
            }
        }
        for (let query in req.query) {
            if (req.query[query].indexOf('..') > -1 || req.query[query].indexOf('/') > -1 || req.query[query].indexOf('\\') > -1) {
                throw new Error('Invalid Request')
            }
        }
        if (req.body) {
            for (let body in req.body) {
                if (req.body[body].indexOf('..') > -1 || req.body[body].indexOf('/') > -1 || req.body[body].indexOf('\\') > -1) {
                    throw new Error('Invalid Request')
                }
            }
        }
        
        return next();
    }
}

module.exports = SecurityMiddleware;