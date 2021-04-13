const addZero = item => {
  item = item < 10 ? '0' + item : item;
  return item;
};
/**
 * 时间格式化
 * @param {*} date 时间
 * @param {*} type 格式
 * @param {*} spilitLet 分隔符
 */
const dateFormat = (date, type = 'yyyy-MM-dd', spilitLet = '-') => {
  // console.log('date util',date);
  let newdate = date && date.replace ? date.replace(/-/g, '/') : date;
  const _date = new Date(newdate);
  let year = _date.getFullYear(),
    month = addZero(_date.getMonth() + 1),
    day = addZero(_date.getDate()),
    hour = addZero(_date.getHours()),
    minute = addZero(_date.getMinutes()),
    second = addZero(_date.getSeconds()),
    result = '';

  switch (type) {
    case 'yyyy':
      result = year + '';
      break;
    case 'MM':
      result = month + '';
      break;
    case 'yyyy-MM':
      result = year + spilitLet + month;
      break;
    case 'yyyy-MM-dd':
      result = year + spilitLet + month + spilitLet + day;
      break;
    case 'MM-dd':
      result = month + spilitLet + day;
      break;
    case 'yyyy-MM-dd HH':
      result = year + spilitLet + month + spilitLet + day + ' ' + hour;
      break;
    case 'MM-dd HH:mm':
      result = month + spilitLet + day + ' ' + hour + ':' + minute;
      break;
    case 'HH':
      result = hour;
      break;
    case 'HH:mm':
      result = hour + ':' + minute;
      break;
    case 'HH:mm:ss':
      result = hour + ':' + minute + ':' + second;
      break;
    case 'ss':
      result = second;
      break;
    case 'yyyy-MM-dd HH:mm':
      result = year + spilitLet + month + spilitLet + day + ' ' + hour + ':' + minute;
      break;
    case 'yyyy-MM-dd HH:mm:ss':
      result = year + spilitLet + month + spilitLet + day + ' ' + hour + ':' + minute + ':' + second;
      break;
  }
  return result;
};

/**
 * 去抖动
 * @param {*} fn
 * @param {*} delay
 */
const debounce = (fn, delay) => {
  let timeoutID = null;
  return function() {
    let context = this;
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn.apply(context, arguments);
    }, delay);
  };
};

/**
 * 节流函数
 * @param {*} fn
 * @param {*} wait
 */
const throttle = (fn, wait) => {
  let previous = 0;
  // eslint-disable-next-line func-names
  return function() {
    let now = new Date().getTime();
    if (now - previous > wait) {
      fn.apply(this, arguments);
      previous = now;
    }
  };
};

/**
 * 数字加逗号分隔
 * @param {*} money
 */
const formatNumNormal = num => {
  if (num == null) {
    return '--';
  }
  if (isNaN(num)) {
    return 0;
  }

  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
/**
 * 文件大小格式化
 * @param {*} value
 */
const formatFileSize = value => {
  const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let index = 0,
    srcsize = parseFloat(value);
  index = Math.floor(Math.log(srcsize) / Math.log(1024));
  // eslint-disable-next-line no-restricted-properties
  let size = srcsize / Math.pow(1024, index);
  size = size.toFixed(2); // 保留的小数位数
  return size + unitArr[index];
};

/**
 * 转义html
 * @param {*} html
 */
const encodeHtml = html => {
  if (html && html.replace) {
    return (
      html
        .replace(/&/g, '&amp;') // 转换&符号
        .replace(/ /g, '&nbsp;') // 转换空格
        .replace(/\b&nbsp;+/g, ' ') // 转换多个空格为单个空格
        .replace(/</g, '&lt;') // 转换小于符号
        .replace(/>/g, '&gt;') // 转换大于符号
        .replace(/\\/g, '&#92;') // 转换斜杠符号
        // eslint-disable-next-line no-useless-escape
        .replace(/\'/g, '&#39;') // 转换单引号
        // eslint-disable-next-line no-useless-escape
        .replace(/\"/g, '&quot;') // 转换双引号
        .replace(/\n/g, '<br/>') // 转换换行符号
        .replace(/\r/g, '')
    ); // 转换回车符号
  }
  return html;
};

/**
 * 深度拷贝
 * @param {*} data 数据
 */
const deepCopy = data => {
  let copyed_objs = []; // 此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
  function _deepCopy(target) {
    if (typeof target !== 'object' || !target) {
      return target;
    }
    for (let i = 0; i < copyed_objs.length; i++) {
      if (copyed_objs[i].target === target) {
        return copyed_objs[i].copyTarget;
      }
    }
    let obj = {};
    if (Array.isArray(target)) {
      obj = []; // 处理target是数组的情况
    }
    copyed_objs.push({ target, copyTarget: obj });
    Object.keys(target).forEach(key => {
      if (obj[key]) {
        return;
      }
      obj[key] = _deepCopy(target[key]);
    });
    return obj;
  }
  return _deepCopy(data);
};

/**
 * loadScript
 * @param {*} path
 * @param {*} callback
 */
const loadScript = (path, callback) => {
  let done = false,
    scr = document.createElement('script');

  scr.onload = handleLoad;
  scr.onreadystatechange = handleReadyStateChange;
  scr.onerror = handleError;
  scr.src = path;
  document.body.appendChild(scr);

  function handleLoad() {
    if (!done) {
      done = true;
      callback(path, 'ok');
    }
  }

  function handleReadyStateChange() {
    let state;

    if (!done) {
      state = scr.readyState;
      if (state === 'complete') {
        handleLoad();
      }
    }
  }
  function handleError() {
    if (!done) {
      done = true;
      callback(path, 'error');
    }
  }
};

/**
 * 数组里是否包含
 * @param {*} array
 * @param {*} b
 */
const isContainer = (array, b) => {
  // 数组
  if (b instanceof Array) {
    return b.every(item => array.includes(item));
  }
  if (array.includes(b)) {
    return true;
  }
  return false;
};

/**
 * 逗号分割数值
 * @param {*} num
 */
const toThousandFilter = num => {
  if (typeof num === 'undefined') {
    return '--';
  }
  if (isNaN(num)) {
    return 0;
  }
  return (num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
};

/** * 是否为mac系统（包含iphone手机） * */

const isMac = () => /macintosh|mac os x/i.test(navigator.userAgent);

/** * 是否为windows系统 * */
const isWindows = () => /windows|win32/i.test(navigator.userAgent);

const $alert = (that, title, subTitle) => {
  that.$alert(
    `
    <div class="error-icon-box">
      <i class="error-icon"></i>
    </div>
    <p class="title">${title}</p>
    <p class="sub-title">${subTitle}</p>
    `,
    '',
    {
      customClass: 'candy-alert-messagebox',
      dangerouslyUseHTMLString: true
    }
  );
};

const $success = (that, message) => {
  that.$message({
    type: 'success',
    message: message,
    offset: 274
  });
};

const randomItem = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

const getUUID = () =>
  randomItem() +
  randomItem() +
  '-' +
  randomItem() +
  '-' +
  randomItem() +
  '-' +
  randomItem() +
  '-' +
  randomItem() +
  randomItem() +
  randomItem();

/**
 * 用户登录
 * @param {*} token
 */
const userLogin = token => {
  window.localStorage.setItem('token', token);
};

/**
 * 用户退出
 */
const userLogout = ({ $router, $store }) => {
  window.localStorage.removeItem('token');
  $store.dispatch('clearAll');
  $router.push({ name: 'login' });
};

/**
 * base64 转file
 * @param {*} base64
 */
const baseToFile = (base64, fileName = '上传文件', fileType = '.png') => {
  //将base64转换为文件
  var arr = base64.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName + fileType, { type: mime });
};

/**
 * 获取滚动条的高度
 */
const getScrollTop = () => {
  var scroll_top = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scroll_top = document.documentElement.scrollTop;
  } else if (document.body) {
    scroll_top = document.body.scrollTop;
  }
  return scroll_top;
};

/**
 * diff
 * @param {*} self 自身数据object
 * @param {*} target 对比数据object
 * @param {*} whiteKey key 忽略
 * @returns 差异的数据object
 */
const diffParams = (self, target, whiteKey = []) => {
  let obj = {};
  for (let key in self) {
    if (whiteKey.length && whiteKey.includes(key)) {
      continue;
    }
    if (self[key] != target[key]) {
      obj[key] = self[key];
    }
  }
  return obj;
};
export default {
  dateFormat,
  formatNumNormal,
  debounce,
  throttle,
  encodeHtml,
  deepCopy,
  loadScript,
  formatFileSize,
  isContainer,
  toThousandFilter,
  isMac,
  isWindows,
  $alert,
  $success,
  getUUID,
  userLogout,
  baseToFile,
  getScrollTop,
  diffParams
};
