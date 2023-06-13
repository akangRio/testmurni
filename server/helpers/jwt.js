const jwt = require("jsonwebtoken");
const privateKey = "hehe";
const generateToken = (payload) => {
  return jwt.sign({ payload }, privateKey);
};
const verifyToken = (token) => {
  return jwt.verify(token, privateKey);
};
module.exports = { generateToken, verifyToken };
