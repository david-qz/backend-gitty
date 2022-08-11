// Don't check for valid sessions during testing, just make us always appear as bob from the test sql script :)
module.exports = async (req, res, next) => {
  req.user = {
    id: '1',
    username: 'bob'
  };
  next();
};
