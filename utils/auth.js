import { hash, compare, genSalt } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

const hashAuthCode = async (code) => {
  const salt = await genSalt(10);
  const hashedCode = await hash(code, salt);
  return hashedCode;
};

const verifyAuthCode = async (code, hashedCode) => {
  const isValid = await compare(code, hashedCode);
  return isValid;
};

const generateAccessToken = (data) => {
  const token = sign({ ...data }, process.env.AccessTokenSecretKey, {
    expiresIn: "1h",
  });
  return token;
};

const verifyAccessToken = (token) => {
  try {
    const tokenPayload = verify(token, process.env.AccessTokenSecretKey);
    return tokenPayload;
  } catch (err) {
    console.log("Verify Access Token Error ->", err);
    return false;
  }
};

const generateRefreshToken = (data) => {
  const token = sign({ ...data }, process.env.RefreshTokenSecretKey, {
    expiresIn: "7d",
  });
  return token;
};

const generateAuthCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const validateEmail = (email) => {
  const pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(email);
};

const validatePhone = (phone) => {
  const pattern = /^(\+98|0)?9\d{9}$/;
  return pattern.test(phone.replace(/\s+/g, ""));
};

const validatePassword = (password) => {
  const pattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
  return pattern.test(password);
};

const validateUsername = (username) => {
  return username && username.length >= 3 && username.length <= 30;
};

export {
  hashPassword,
  verifyPassword,
  hashAuthCode,
  verifyAuthCode,
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePhone,
  validatePassword,
  validateUsername,
  generateAuthCode,
};
