export const problemMap = {
  currentTemperature: '温度超过阀值',
  currentHumidity: '湿度超过阀值',
  gas: '气压超过阀值',
  accelerometerMean: '抖动均值超过阀值',
  accelerometerMaxMin: '抖动峰峰值超过阀值',
  accelerometerKurtosis: '抖动峭度超过阀值'
};

export const problemType = {
  其他: '其他',
  松动: '松动',
  漏油: '漏油',
  不对中: '不对中',
  齿轮: '齿轮',
  轴承: '轴承',
  偏心: '偏心'
};

/**
 * 折线图option
 */
export const LineCommOption = () => {
  return Object.freeze({
    color: ['#F5523E', '#A41B08'],
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: 80,
      right: 80,
      top: 30,
      bottom: 80
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
        zoomOnMouseWheel: false,
        moveOnMouseMove: false
      },
      {
        start: 0,
        end: 100
      }
    ],
    legend: {
      textStyle: { color: '#fff' }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      // axisLine: { onZero: false },
      axisLabel: {
        color: '#fff'
      },
      splitLine: { show: false },
      data: []
    },
    yAxis: {
      type: 'value',
      splitNumber: 4,
      splitLine: { show: true },
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        onZero: true
      }
    }
  });
};

/**
 * 分区
 */
export const BLOCKADDRESS = [
  { text: '东部大区', value: '东部大区' },
  { text: '南部大区', value: '南部大区' },
  { text: '西部大区', value: '西部大区' },
  { text: '北部大区', value: '北部大区' },
  { text: '中部大区', value: '中部大区' },
  { text: '欧洲区', value: '欧洲区' },
  { text: '南美区', value: '南美区' },
  { text: '北美区', value: '北美区' },
  { text: '亚太区', value: '亚太区' },
  { text: '中东区', value: '中东区' },
  { text: '非洲区', value: '非洲区' }
];

/**
 * 销售层级
 */
export const LEVEL = [
  { text: '经销商', value: 2 },
  { text: '主机厂', value: 3 },
  { text: '终端客户', value: 4 }
];
export const LEVELMAP = {
  '2': '经销商',
  '3': '主机厂',
  '4': '终端客户'
};

/**
 * 国家
 */
export const COUNTRY = [
  { country: '德国', countryCode: '+49', initial: 'D', remark: null },
  { country: '俄罗斯', countryCode: '+7', initial: 'E', remark: null },
  { country: '法国', countryCode: '+33', initial: 'F', remark: null },
  { country: '韩国', countryCode: '+82', initial: 'H', remark: null },
  { country: '加拿大', countryCode: '+1', initial: 'J', remark: null },
  { country: '美国', countryCode: '+1', initial: 'M', remark: null },
  { country: '日本', countryCode: '+81', initial: 'R', remark: null },
  { country: '新加坡', countryCode: '+65', initial: 'X', remark: null },
  { country: '意大利', countryCode: '+39', initial: 'Y', remark: null },
  { country: '英国', countryCode: '+44', initial: 'Y', remark: null },
  { country: '中国大陆', countryCode: '+86', initial: 'Z', remark: null },
  { country: '中国香港', countryCode: '+852', initial: 'Z', remark: null },
  { country: '中国澳门', countryCode: '+853', initial: 'Z', remark: null },
  { country: '中国台湾', countryCode: '+886', initial: 'Z', remark: null }
];
/**
 * 手机号前缀
 */
export const PHONEPREX = [
  { text: '+1', value: '东部大区' },
  { text: '+33', value: '南部大区' },
  { text: '+39', value: '西部大区' },
  { text: '+44', value: '北部大区' },
  { text: '+49', value: '中部大区' },
  { text: '+65', value: '欧洲区' },
  { text: '+7', value: '南美区' },
  { text: '+81', value: '北美区' },
  { text: '+82', value: '亚太区' },
  { text: '+852', value: '中东区' },
  { text: '+853', value: '非洲区' },
  { text: '+86', value: '非洲区' },
  { text: '+886', value: '非洲区' }
];
