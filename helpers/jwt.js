const jwt = require("jsonwebtoken");
const key = require("../settings/key");
const hash = require("./hash");
class JWTClass {
  respondWithToken(user) {
    const TOKEN_WEB = process.env.TOKEN_WEB;
    const payload = user;
    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: TOKEN_WEB
    });
    return token;
  }
  async checkPassword(user_password, hash_password) {
    const validation = await hash.Compare(user_password, hash_password);
    return validation;
  }
}
module.exports = new JWTClass();
