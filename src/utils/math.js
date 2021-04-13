/* eslint-disable no-restricted-properties */
// math 数字

/**
 * 获取小数点后的位数
 * @param value  number
 */
const getDigs = value => {
  const num = String(value);
  const index = num.indexOf('.');

  if (index === -1) {
    return 0;
  }

  return num.length - 1 - index;
};

/**
 * 小数点后补零
 * @param value number
 * @param digs number
 * @param byte 0 or any
 */
const padEnd = (value, digs, byte = '0') => {
  let num = String(value);
  const index = num.indexOf('.');
  if (index === -1) {
    if (digs > 0) {
      num += '.' + Array(digs + 1).join(byte);
    }
  } else {
    const len = digs - getDigs(value);
    if (len > 0) {
      num += Array(len + 1).join(byte);
    }
  }
  return num;
};
/**
 * 取值到小数位（四舍五入）
 * @param num number数值
 * @param digs (可选)保留的小数位数
 */
const toFixed = (num, digs = 0) => {
  if (isNaN(digs) || !isFinite(digs)) {
    return String(num);
  }

  const times = Math.pow(10, digs);

  let des = String(num * times + (Number(num) < 0 ? -0.5 : 0.5));

  const value = parseInt(des, 10) / times;

  // 补零
  des = padEnd(value, digs);

  return des;
};

/**
 * Math 加法
 * @param num1 number
 * @param num2 number
 * @param digs (可选)保留的小数位
 */
const add = (num1, num2, digs = 0) => {
  if (isNaN(num1) || isNaN(num2)) {
    return 0;
  }

  const maxDigs = Math.max(getDigs(num1), getDigs(num2));

  const times = Math.pow(10, maxDigs);

  const value = (num1 * times + num2 * times) / times;

  return toFixed(value, digs);
};

/**
 * Math 减法
 * @param num1 number
 * @param num2 number
 * @param digs (可选)保留的小数位
 */
const subtract = (num1, num2, digs = 0) => {
  const maxDigs = Math.max(getDigs(num1), getDigs(num2));

  const times = Math.pow(10, maxDigs);

  const value = (num1 * times - num2 * times) / times;

  return toFixed(value, digs);
};

/**
 * Math 乘法
 * @param num1 number
 * @param num2 number
 * @param digs (可选)保留的小数位
 */
const multiply = (num1, num2, digs = 0) => {
  const maxDigs = Math.max(getDigs(num1), getDigs(num2));

  const times = Math.pow(10, maxDigs);

  const value = (num1 * times * num2 * times) / times / times;

  return toFixed(value, digs);
};

/**
 * Math 除法
 * @param num1 number
 * @param num2 number
 * @param digs (可选)保留的小数位
 */
const divide = (num1, num2, digs = 0) => {
  // 分母不能为0
  if (num2 === 0) {
    return 0 + '';
  }

  const maxDigs = Math.max(getDigs(num1), getDigs(num2));

  const times = Math.pow(10, maxDigs);

  const value = (num1 * times) / (num2 * times);

  return toFixed(value, digs);
};

export default {
  padEnd,
  getDigs,
  toFixed,
  add,
  subtract,
  multiply,
  divide
};
