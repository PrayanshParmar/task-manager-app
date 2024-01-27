const JWT = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

interface userProps {
  id?: string;
  username: string;
  email: string;
}

export function createJwtToken(user: userProps) {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  const token = JWT.sign(payload, secret, {
    expiresIn: "48h",
  });
  return token;
}

export function verifyJwtToken(token: string) {
  const verifyed = JWT.verify(token, secret);
  return verifyed;
}
