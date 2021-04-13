/**
 * Created by zyc on 19/7/11.
 * 验证
 */
// password reg
export const SIMPLE_PASSWORDREG = /^\S{6,15}$/;
export const PASSWORDREG = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{6,15}$/;
export const PHONEREG = /^[0-9]\d{11}$/;
export const IdCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
export const CreditReg = /^([159Y]{1})([1239]{1})([0-9ABCDEFGHJKLMNPQRTUWXY]{6})([0-9ABCDEFGHJKLMNPQRTUWXY]{9})([0-90-9ABCDEFGHJKLMNPQRTUWXY])$/;
// email reg
// eslint-disable-next-line no-useless-escape
export const EAMILREG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor'];
  return valid_map.indexOf(str.trim()) >= 0;
}

/* 合法uri */
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 小写字母 */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母 */
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * 邮箱验证
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = EAMILREG;
  return re.test(email);
}

/**
 * 手机号验证
 * @param {*} phone 11位手机号
 */
export function validatePhone(phone) {
  const re = PHONEREG;
  return re.test(phone);
}

/**
 * 正整数和0
 * @param {*} value
 */
export function validateInteger(value) {
  if (isNaN(value)) {
    return false;
  }
  const re = /^\d+$/;
  return re.test(value);
}

/**
 * 正数验证
 */
export function validatePositiveNumber(value) {
  if (isNaN(value)) {
    return false;
  }
  const re = /^(0|[1-9][0-9]*)(\.\d+)?$/;
  return re.test(value);
}
/**
 *百分比验证
 * @param {*} value
 */
export function validatePercent(value) {
  if (isNaN(value)) {
    return false;
  }
  const re = /^(-?\d+)(\.\d+)?$/;
  return re.test(value);
}

export function validteFloat(value) {
  if (isNaN(value)) {
    return false;
  }
  const re = /^(-?\d+)(\.\d+)?$/;
  return re.test(value);
}

export function validateSellMoney(message) {
  return (rule, value, callback) => {
    if (!value) {
      return callback(new Error(message['requiredError']));
    }
    if (!validatePositiveNumber(value)) {
      return callback(new Error(message['regError']));
    }
    callback();
  };
}
