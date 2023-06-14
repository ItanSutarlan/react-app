const { User, sequelize } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class AuthController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const result = await sequelize.transaction(async (t) => {
        const result = await User.create(
          {
            username,
            email,
            password,
            phoneNumber,
            address,
            role: 'Admin',
          },
          { transaction: t },
        );

        return result;
      });

      res.status(201).json({
        statusCode: 201,
        message: 'User created successfully',
        data: {
          id: result.id,
          email: result.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await sequelize.transaction(async (t) => {
        const result = await User.findOne({
          where: {
            email,
          },
          transaction: t,
        });

        return result;
      });

      if (!result) {
        throw { name: 'Invalid email/password' };
      }

      const isMatch = comparePassword(password, result.password);
      if (!isMatch) {
        throw { name: 'Invalid email/password' };
      }

      const access_token = generateToken({
        id: result.id,
        email: result.email,
      });

      res.status(200).json({
        statusCode: 200,
        message: 'Login succeed',
        data: {
          access_token,
          username: result.username,
          role: result.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
