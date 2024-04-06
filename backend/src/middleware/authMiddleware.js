const passport = require('passport');

const authenticateJWT = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
      if (error) {
        return res.status(500).json({ message: 'Internal server error.' });
      }
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
  
  module.exports = {
    authenticateJWT
  };
  