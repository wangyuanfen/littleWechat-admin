const {jsonResult} = require('../config/http');
const { login } = require('../service/weixin');
const { create } = require('../service/token');

const { 
  category: categoryModel,
  user: userModel
} = require('../models');

const loginByWeixin = async function (ctx) {
  const code = ctx.request.body.code;
  const fullUserInfo = ctx.request.body.userInfo;
  const clientIp = ctx.ip;

  // 解释用户数据
  const wechatUserInfo = await login(code, fullUserInfo);
  if (!wechatUserInfo) {
    ctx.body = jsonResult(401, {}, '登录失败');
    return;
  }
  // 根据openid查找用户是否已经注册
  let userInfo = await userModel.findOne({ where : {weixin_openid: wechatUserInfo.openId}, attributes: ['id']});
  let userId = userInfo ? userInfo.id : '';
  if (!userId) {
    // 注册
    userInfo = await userModel.create({
      username: '微信用户' + wechatUserInfo.openId,
      password: '',
      register_time: parseInt(new Date().getTime() / 1000),
      register_ip: clientIp,
      mobile: '',
      weixin_openid: wechatUserInfo.openId,
      avatar: wechatUserInfo.avatarUrl || '',
      gender: wechatUserInfo.gender || 1, // 性别 0：未知、1：男、2：女
      nickname: wechatUserInfo.nickName
    });
    userId = userInfo ? userInfo.id : '';
  }

  // 查询用户信息
  const newUserInfo = await userModel.findOne({where: {id: userId}, attributes: ['id', 'username', 'nickname', 'gender', 'avatar', 'birthday']});

  // 更新登录信息
  await userModel.update({
    last_login_time: parseInt(new Date().getTime() / 1000),
    last_login_ip: clientIp
  }, {where: {id: userId}});


  const sessionKey = await create({ user_id: userId });

  if (!newUserInfo || !sessionKey) {
    ctx.body = jsonResult(401, {}, '登录失败');
    return;
  }
  
  ctx.body = jsonResult(0, { 
    token: sessionKey,
    userInfo: newUserInfo 
  });
};

module.exports = {
  loginByWeixin: loginByWeixin
}