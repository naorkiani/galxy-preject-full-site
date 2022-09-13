const jwt = require("jsonwebtoken");

const createToken = (data) => {
  return new Promise((res, rej) => {
    jwt.sign(
      data,
      "ka^jl#$hSK#JDF@(824A1!#@$HA",
      { expiresIn: "7d" },
      (err, token) => {
        if (err) rej(err);
        else res(token);
      }
    );
  });
};

const verifyToken = (token) => {
  return new Promise((res, rej) => {
    jwt.verify(token, "ka^jl#$hSK#JDF@(824A1!#@$HA", (err, decoded) => {
      if (err) rej(err);
      else res(decoded);
    });
  });
};

module.exports = {
  createToken,
  verifyToken,
};
