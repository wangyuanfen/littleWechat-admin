const jwt = require('jsonwebtoken');
const secret = 'SLDLKKDS323ssdd@#@@gf';

/**
 * 根据header中的X-Yanxuan-Token值获取用户id
 */
const getUserId = async function (token) {
  if (!token) {
    return 0;
  }
  const result = await parse(token);
  if (!result || result.user_id <= 0) {
    return 0;
  }
  return result.user_id;
}

const create = async function (userInfo) {
  const token = jwt.sign(userInfo, secret);
  return token;
}

const parse = async function (token) {
  if (token) {
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      return null;
    }
  }
  return null;
}

const verify = async function (token) {
  const result = await parse(token);
  if (!result) {
    return false;
  }
  return true;
}

module.exports = {
  getUserId: getUserId,
  create: create
};
