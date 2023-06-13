const { passValidator } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User, Data, Log } = require("../models/index");

class Controller {
  static async register(req, res) {
    try {
      const { Username, Password, Age } = req.body;
      const createNewUser = await User.create({ Username, Password, Age });
      const createLog = await Log.create({
        activity: `New User Created - ${Username}`,
      });
      res.status(201).json({
        message: "new User has been created",
      });
    } catch (err) {
      let message;
      if (err.name === "SequelizeValidationError") {
        message = err.errors.map((e) => e.message);
      }
      res.status(400).json({
        message: message.join(", "),
      });
    }
  }

  static async login(req, res) {
    try {
      const { Username, Password } = req.body;
      const findUser = await User.findOne({
        where: { Username },
      });
      if (!findUser) throw new Error("user not found");
      if (!passValidator(Password, findUser.Password))
        throw new Error("password incorrect");
      const access_token = generateToken({ Username: findUser.Username });
      const createLog = await Log.create({
        activity: `User Login - ${Username}`,
      });
      res.status(200).json({ access_token });
    } catch (err) {
      res.status(403).json({ message: err.message });
    }
  }
  static async viewData(req, res, next) {
    try {
      const data = await Data.findAll();

      let FinalResults = {};
      const query = [
        "CALL calculate_average_score();",
        "CALL calculate_modus_emotion();",
        "CALL calculate_average_score_and_mode_emotion();",
      ];

      for (let i = 0; i < query.length; i++) {
        const [results] = await Data.sequelize.query(query[i]);
        if (results) {
          Object.keys(results).forEach((key) => {
            FinalResults[key] = results[key];
          });
        }
      }

      res.json({ data, FinalResults });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
