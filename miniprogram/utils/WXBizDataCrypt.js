var Crypto = require('../modules/cryptojs/cryptojs').Crypto;

function WXBizDataCrypt(appId, sessionKey) {
  this.appId = appId
  this.sessionKey = sessionKey
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
  // 使用 CryptoJS 中 Crypto.util.base64ToBytes()进行 base64解码
  var key = Crypto.util.base64ToBytes(this.sessionKey);
  var iv = Crypto.util.base64ToBytes(iv);
  var encryptedData = Crypto.util.base64ToBytes(encryptedData);  
 
  // 对称解密使用的算法为 AES-128-CBC，数据采用PKCS#7填充
  var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);
 
  try {
    // 解密
    var bytes = Crypto.AES.decrypt(encryptedData, key, {
      asBpytes: true,
      iv: iv,
      mode: mode
    });
 
    var decoded = JSON.parse(bytes); 
  } catch (err) {
    console.log(err)
    throw new Error('decrypt fail')
  }

  if (decoded.watermark.appid !== this.appId) {
    console.log('appid not match')
    throw new Error('appid not match')
  }

  return decoded
}

module.exports = WXBizDataCrypt
