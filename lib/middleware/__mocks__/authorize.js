// During testing, don't require a user to be logged in
module.exports = async (req, res, next) => { next(); };
