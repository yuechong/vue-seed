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
      //   path: '/report',
      //   name: 'Report',
      //   meta: { title: '首页', icon: 'home' },
      //   component: () => import(/* webpackChunkName: "Home"*/ '@/views/Report/index')
      // },
      // {
      //   path: '/demo',
      //   name: 'demo',
      //   meta: { title: 'demo', icon: 'home' },
      //   component: () => import('@/views/Demo/index')
      // },
      /**
       * 首页
       */
      {
        path: '/home',
        name: 'Home',
        pathId: 1,
        meta: { title: '首页', icon: 'home' },
        component: () => import(/* webpackChunkName: "Home"*/ '@/views/Home/index')
      },
      /**
       * CEO驾驶舱
       */
      {
        path: '/ceo',
        name: 'CEO',
        meta: { title: 'CEO驾驶舱', icon: 'fund' },
        component: () => import(/* webpackChunkName: "Home"*/ '@/views/CEO/index')
      },
      /**
       * 数据监控
       */
      {
        path: '/datamonitor',
        name: 'DataMonitor',
        pathId: 2,
        meta: { title: '数据监控', icon: 'pie-chart' },
        component: () => import(/* webpackChunkName: "DataMonitor"*/ '@/views/DataMonitor/index'),
        redirect: '/datamonitor/reducer',
        children: [
          {
            path: 'scene',
            name: 'DataMonitorScene',
            pathId: 7,
            meta: { title: '场景监控', ignore: true },
            redirect: '/datamonitor/scene/list',
            component: () => import(/* webpackChunkName: "DataMonitor"*/ '@/views/DataMonitor/Scene/index'),
            children: [
              {
                path: 'list',
                name: 'DataMonitorSceneList',
                meta: { title: '场景列表', breadcrumb: [DataMonitorLevel] },
                component: () => import(/* webpackChunkName: "DataMonitor"*/ '@/views/DataMonitor/Scene/List/index')
              },
              {
                path: 'list/:id',
                name: 'DataMonitorSceneListDetail',
                props: true,
                pathId: 23,
                meta: {
                  title: '场景监控详情页',
                  breadcrumb: [DataMonitorLevel, { title: '场景列表', name: 'DataMonitorSceneList' }]
                },
                component: () => import(/* webpackChunkName: "DataMonitor"*/ '@/views/DataMonitor/Scene/Detail/index')
              },
              {
                path: 'list/:id/:sid',
                props: true,
                name: 'DataMonitorSceneReducerDetail',
                meta: {
                  title: '减速机监控详情',
                  breadcrumb: [
                    DataMonitorLevel,
                    { title: '场景列表', name: 'DataMonitorSceneList' },
                    { title: '场景监控详情页', name: 'DataMonitorSceneListDetail' }
                  ]
                },
                component: () => import(/* webpackChunkName: "Comm"*/ '@/views/Comm/Reducer/ReducerInfoView/index')
              },
              {
                path: 'list/:id/:sid/analy',
                name: 'DataMonitorSceneReducerDetailHistory',
                props: true,
                meta: {
                  title: '减速机故障页',
                  breadcrumb: [
                    DataMonitorLevel,
                    { title: '场景列表', name: 'DataMonitorSceneList' },
                    { title: '场景监控详情页', name: 'DataMonitorSceneListDetail' }
                  ]
                },
                component: () => import(/* webpackChunkName: "Comm"*/ '@/views/Comm/Reducer/ReducerStatusAnaly/index')
              }
            ]
          },
          {
            path: 'reducer',
            name: 'DataMonitorReducer',
            pathId: 8,
            meta: { title: '减速机监控', ignore: true },
            redirect: '/datamonitor/reducer/list',
            component: () => import(/* webpackChunkName: "DataMonitor"*/ '@/views/DataMonitor/Reducer/index'),
            children: [
              {
                path: 'list',
                name: 'DataMonitorReducerList',
                meta: { title: '减速机监控', breadcrumb: [DataMonitorLevel] },
                component: () => import(/* webpackChunkName: "DataMonitor"*/ '@/views/DataMonitor/Reducer/List/index')
              },
              {
                path: 'list/:sid',
                props: true,
                pathId: 25,
                name: 'DataMonitorReducerListDetail',
                meta: {
                  title: '减速机监控详情',
                  breadcrumb: [DataMonitorLevel, { title: '减速机监控', name: 'DataMonitorReducerList' }]
                },
                component: () => import(/* webpackChunkName: "Comm"*/ '@/views/Comm/Reducer/ReducerInfoView/index')
              },
              {
                path: 'list/:sid/history',
                props: true,
                name: 'DataMonitorReducerListDetailHistory',
                meta: {
                  title: '历史数据',
                  breadcrumb: [
                    DataMonitorLevel,
                    { title: '减速机监控', name: 'DataMonitorReducerList' },
                    { title: '减速机监控详情', name: 'DataMonitorReducerListDetail' }
                  ]
                },
                component: () => import(/* webpackChunkName: "Comm"*/ '@/views/Comm/Reducer/ReducerStatusAnaly/index')
              },
              {
                path: 'report',
                props: true,
                name: 'DataMonitorReducerReport',
                meta: { title: '汇总报表', level: '1-3' },
                component: () => import(/* webpackChunkName: "DataMonitor"*/ '@/views/DataMonitor/Reducer/Report/index')
              }
            ]
          }
        ]
      },
      /**
       * 健康管理
       */
      {
        path: '/healthy',
        name: 'Healthy',
        meta: { title: '健康管理', icon: 'safety' },
        component: () => import(/* webpackChunkName: "Healthy"*/ '@/views/ManageHealthy/index'),
        redirect: '/healthy/warn',
        children: [
          {
            path: 'warn',
            name: 'HealthyWarn',
            meta: { title: '预警管理', breadcrumb: [HealthyLevel] },
            component: () => import(/* webpackChunkName: "Healthy"*/ '@/views/ManageHealthy/Warn/index')
          },
          {
            path: 'error',
            name: 'HealthyError',
            meta: { title: '告警管理', breadcrumb: [HealthyLevel] },
            component: () => import(/* webpackChunkName: "Healthy"*/ '@/views/ManageHealthy/Error/index')
          }
        ]
      },
      /**
       * 设备管理
       */
      {
        path: '/device',
        name: 'Device',
        pathId: 3,
        meta: { title: '设备管理', icon: 'desktop' },
        component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/index'),
        redirect: '/device/reducer/list',
        children: [
          {
            path: 'network',
            name: 'DeviceNetwork',
            pathId: 9,
            meta: { title: '网关管理', ignore: true },
            redirect: '/device/network/list', //重定向至第一个子路由
            component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/Network/index'),
            children: [
              {
                path: 'list',
                name: 'DeviceNetworkList',
                meta: { title: '网关管理', breadcrumb: [DeviceLevel] },
                component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/Network/List/index')
              },
              {
                path: 'insert',
                name: 'DeviceNetworkInsert',
                pathId: 27,
                meta: { title: '新增', breadcrumb: [DeviceLevel, { title: '网关管理', name: 'DeviceNetworkList' }] },
                component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/Network/Insert/index')
              },
              {
                path: 'list/:id',
                props: true,
                name: 'DeviceNetworkListDetail',
                pathId: 28,
                meta: {
                  title: '网关详情',
                  breadcrumb: [DeviceLevel, { title: '网关管理', name: 'DeviceNetworkList' }]
                },
                component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/Network/Insert/index')
              }
            ]
          },
          {
            path: 'bearing',
            name: 'Bearing',
            pathId: 10,
            meta: { title: '轴承管理', breadcrumb: [DeviceLevel] },
            component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/Bearing/index')
          },
          {
            path: 'reducer-type',
            name: 'DeviceReducerType',
            pathId: 11,
            meta: { title: '减速机类型管理', ignore: true },
            redirect: '/device/reducer-type/list',
            component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/ReducerType/index'),
            children: [
              {
                path: 'list',
                name: 'DeviceReducerTypeList',
                meta: { title: '减速机类型管理', breadcrumb: [DeviceLevel] },
                component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/ReducerType/List/index')
              },
              {
                path: 'insert',
                name: 'DeviceReducerTypeInsert',
                pathId: 36,
                meta: {
                  title: '新增',
                  breadcrumb: [DeviceLevel, { title: '减速机类型管理', name: 'DeviceReducerTypeList' }]
                },
                component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/ReducerType/Insert/index')
              },
              {
                path: 'list/:id',
                props: true,
                name: 'DeviceReducerTypeDetail',
                pathId: 37,
                meta: {
                  title: '减速机类型详情',
                  breadcrumb: [DeviceLevel, { title: '减速机类型管理', name: 'DeviceReducerTypeList' }]
                },
                component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/ReducerType/Insert/index')
              }
            ]
          },
          {
            path: 'reducer-model',
            name: 'DeviceReducerModel',
            pathId: 12,
            meta: { title: '减速机型号管理', ignore: true },
            redirect: '/device/reducer-model/list',
            component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/ReducerModel/index'),
            children: [
              {
                path: 'list',
                name: 'DeviceReducerModelList',
                meta: { title: '减速机型号管理', breadcrumb: [DeviceLevel] },
                component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/ReducerModel/List/index')
              },
              {
                path: 'insert',
                name: 'DeviceReducerModelInsert',
                pathId: 40,
                meta: {
                  title: '新增',
                  breadcrumb: [DeviceLevel, { title: '减速机型号管理', name: 'DeviceReducerModelList' }]
                },
                component: () =>
                  import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/ReducerModel/Insert/index')
              },
              {
                path: 'list/:id',
                props: true,
                name: 'DeviceReducerModelDetail',
                pathId: 41,
                meta: {
                  title: '减速机型号详情',
                  breadcrumb: [DeviceLevel, { title: '减速机型号管理', name: 'DeviceReducerModelList' }]
                },
                component: () =>
                  import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/ReducerModel/Insert/index')
              }
            ]
          },
          {
            path: 'reducer',
            name: 'DeviceReducer',
            pathId: 13,
            meta: { title: '减速机管理', ignore: true },
            redirect: '/device/reducer/list',
            component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/Reducer/index'),
            children: [
              {
                path: 'list',
                name: 'DeviceReducerList',
                meta: { title: '减速机管理', breadcrumb: [DeviceLevel] },
                component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/Reducer/List/index')
              },
              {
                path: 'insert',
                name: 'DeviceReducerInsert',
                pathId: 44,
                meta: {
                  title: '减速机新增',
                  breadcrumb: [DeviceLevel, { title: '减速机管理', name: 'DeviceReducerList' }]
                },
                component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/Reducer/Insert/index')
              },
              {
                path: 'list/:id',
                props: true,
                name: 'DeviceReducerListDetail',
                pathId: 45,
                meta: {
                  title: '减速机详情页',
                  breadcrumb: [DeviceLevel, { title: '减速机管理', name: 'DeviceReducerList' }]
                },
                component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/Reducer/Insert/index')
              }
            ]
          },
          {
            path: 'scene',
            name: 'DeviceScene',
            pathId: 14,
            meta: { title: '场景管理', ignore: true },
            redirect: '/device/scene/list',
            component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/Scene/index'),
            children: [
              {
                path: 'list',
                name: 'DeviceSceneList',
                meta: { title: '场景管理', breadcrumb: [DeviceLevel] },
                component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/Scene/List/index')
              },
              {
                path: 'insert',
                name: 'DeviceSceneInsert',
                pathId: 50,
                meta: { title: '场景新增', breadcrumb: [DeviceLevel, { title: '场景管理', name: 'DeviceSceneList' }] },
                component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/Scene/Insert/index')
              },
              {
                path: 'list/:id',
                name: 'DeviceSceneListDetail',
                props: true,
                pathId: 51,
                meta: {
                  title: '场景详情页',
                  breadcrumb: [DeviceLevel, { title: '场景管理', name: 'DeviceSceneList' }]
                },
                component: () => import(/* webpackChunkName: "Device"*/ '@/views/ManageDevice/Scene/Insert/index')
              }
            ]
          }
        ]
      },
      /**
       * 市场管理
       */
      {
        path: '/market',
        name: 'Market',
        pathId: 4,
        meta: { title: '市场管理', icon: 'team' },
        component: () => import(/* webpackChunkName: "Market"*/ '@/views/ManageMarket/index'),
        children: [
          {
            path: 'customer',
            name: 'MarketCustomer',
            pathId: 15,
            meta: { title: '客户管理', ignore: true },
            redirect: '/market/customer/list',
            component: () => import(/* webpackChunkName: "Market"*/ '@/views/ManageMarket/Customer/index'),
            children: [
              {
                path: 'list',
                name: 'MarketCustomerList',
                meta: { title: '客户管理', breadcrumb: [MarketLevel] },
                component: () => import(/* webpackChunkName: "Market"*/ '@/views/ManageMarket/Customer/List/index')
              },
              {
                path: 'insert',
                name: 'MarketCustomerInsert',
                pathId: 55,
                meta: { title: '新增', breadcrumb: [MarketLevel, { title: '客户管理', name: 'MarketCustomerList' }] },
                component: () => import(/* webpackChunkName: "Market"*/ '@/views/ManageMarket/Customer/Insert/index')
              },
              {
                path: ':id',
                props: true,
                name: 'MarketCustomerDetail',
                pathId: 56,
                meta: { title: '详情', breadcrumb: [MarketLevel, { title: '客户管理', name: 'MarketCustomerList' }] },
                component: () => import(/* webpackChunkName: "Market"*/ '@/views/ManageMarket/Customer/Insert/index')
              }
            ]
          },
          {
            path: 'industry',
            name: 'MarketIndustryr',
            pathId: 16,
            meta: { title: '行业分类管理', breadcrumb: [MarketLevel] },
            component: () => import(/* webpackChunkName: "Market"*/ '@/views/ManageMarket/Industry/index')
          }
        ]
      },
      /**
       * 系统管理
       */
      {
        path: '/sys',
        name: 'System',
        pathId: 5,
        meta: { title: '系统管理', icon: 'setting' },
        redirect: { name: 'SystemRole' },
        component: () => import(/* webpackChunkName: "System"*/ '@/views/ManageSystem/index'),
        children: [
          {
            path: 'role',
            name: 'SystemRole',
            pathId: 17,
            meta: { title: '角色管理', breadcrumb: [SystemLevel], ignore: true },
            component: () => import(/* webpackChunkName: "System"*/ '@/views/ManageSystem/Role/index'),
            redirect: { name: 'SystemRoleList' },
            children: [
              {
                path: 'list',
                name: 'SystemRoleList',
                meta: { title: '角色管理', breadcrumb: [SystemLevel] },
                component: () => import(/* webpackChunkName: "System"*/ '@/views/ManageSystem/Role/List/index')
              },
              {
                path: 'insert',
                name: 'SystemRoleInsert',
                pathId: 65,
                meta: { title: '新增', breadcrumb: [SystemLevel, { title: '角色管理', name: 'SystemRoleList' }] },
                component: () => import(/* webpackChunkName: "System"*/ '@/views/ManageSystem/Role/Insert/index')
              },
              {
                path: ':id',
                props: true,
                name: 'SystemRoleDetail',
                pathId: 66,
                meta: { title: '详情', breadcrumb: [SystemLevel, { title: '角色管理', name: 'SystemRoleList' }] },
                component: () => import(/* webpackChunkName: "System"*/ '@/views/ManageSystem/Role/Insert/index')
              }
            ]
          },
          {
            path: 'user',
            name: 'SystemCustomers',
            pathId: 18,
            meta: { title: '用户管理', breadcrumb: [SystemLevel], ignore: true },
            component: () => import(/* webpackChunkName: "System"*/ '@/views/ManageSystem/Customers/index'),
            redirect: { name: 'SystemCustomersList' },
            children: [
              {
                path: 'list',
                name: 'SystemCustomersList',
                meta: { title: '用户管理', breadcrumb: [SystemLevel] },
                component: () => import(/* webpackChunkName: "System"*/ '@/views/ManageSystem/Customers/List/index')
              },
              {
                path: 'insert',
                name: 'SystemCustomersInsert',
                pathId: 70,
                meta: {
                  title: '新增',
                  pageName: 'user',
                  breadcrumb: [SystemLevel, { title: '用户管理', name: 'SystemCustomersList' }]
                },
                component: () => import(/* webpackChunkName: "System"*/ '@/views/ManageSystem/Comm/UserInfoTemp.vue')
              },
              {
                path: ':id',
                props: true,
                name: 'SystemCustomersDetail',
                pathId: 71,
                meta: {
                  title: '详情',
                  pageName: 'user',
                  breadcrumb: [SystemLevel, { title: '用户管理', name: 'SystemCustomersList' }]
                },
                component: () => import(/* webpackChunkName: "System"*/ '@/views/ManageSystem/Comm/UserInfoTemp.vue')
              }
            ]
          },
          {
            path: 'person',
            name: 'SystemUser',
            pathId: 19,
            meta: { title: '个人中心', breadcrumb: [SystemLevel], pageName: 'person' },
            component: () => import(/* webpackChunkName: "System"*/ '@/views/ManageSystem/Comm/UserInfoTemp.vue')
          }
        ]
      }
      // {
      //   path: '*',
      //   redirect: '/home'
      // }
    ]
  };
};

export default init;
