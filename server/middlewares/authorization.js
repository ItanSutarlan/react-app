module.exports = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === 'Admin') {
      next();
    } else {
      throw { name: 'You are not authorized' };
    }
  } catch (error) {
    next(error);
  }
};
