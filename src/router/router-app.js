const DataMonitorLevel = { title: '数据监控', name: 'DataMonitor' };
const HealthyLevel = { title: '健康管理', name: 'Healthy' };
const DeviceLevel = { title: '设备管理', name: 'Device' };
const MarketLevel = { title: '市场管理', name: 'Market' };
const SystemLevel = { title: '系统管理', name: 'System' };

const init = () => {
  return {
    path: '/',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/Layout/index'),
    children: [
     
      // {
      //   path: '*',
      //   redirect: '/home'
      // }
    ]
  };
};

export default init;
