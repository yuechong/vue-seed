<template>
  <div id="zapp">
    <!-- pc -->
    <template v-if="brower === 'pc'">
      <a-layout id="root-container" :style="{ 'padding-left': collapsed ? '80px' : '2.56rem' }">
        <!-- :class="{ 'nav-collapsed': collapsed }" -->
        <a-layout-sider class="root-asider" v-model="collapsed" :trigger="null" collapsible :width="'2.56rem'">
          <div class="logo-box">
            <img src="../../assets/images/logo.png" alt />
            <span v-show="!collapsed">杰牌传动</span>
          </div>
          <TheSiderMenu />
        </a-layout-sider>
        <a-layout>
          <TheHeader />
          <ZBreadcrumb />
          <a-layout-content class="root-content">
            <router-view></router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </template>
    <!-- ipad -->
    <template v-if="brower === 'ipad'">
      <a-layout v-bind:class="brower">
        <a-drawer placement="left" :closable="false" :visible="collapsed" @close="onClose">
          <div class="z-root-asider">
            <div class="logo-box">
              <img src="../../assets/images/logo.png" alt />
              <span>杰牌传动</span>
            </div>
            <TheSiderMenu />
          </div>
        </a-drawer>
        <a-layout>
          <TheHeader />
          <ZBreadcrumb />
          <a-layout-content class="z-root-content">
            <router-view></router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </template>
    <!-- phone -->
    <template v-if="brower === 'iphone'"></template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import ZBreadcrumb from '@/components/ZBreadcrumb';
import TheHeader from './TheHeader';
import TheSiderMenu from './TheSiderMenu';

const components = {
  TheHeader,
  TheSiderMenu,
  ZBreadcrumb
};

export default {
  name: 'Layout',
  components,
  data() {
    return {
      brower: 'pc',
      menu: [{}]
    };
  },
  computed: {
    ...mapGetters({
      collapsed: 'user/collapsed'
    })
  },
  mounted() {
    const clientWidth = document.getElementById('zapp').clientWidth;
    if (clientWidth > 1024) {
      this.brower = 'pc';
    } else if (clientWidth > 450) {
      this.brower = 'ipad';
    } else {
      this.brower = 'iphone';
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        // console.log(route);
        // const { matched } = route;
        // if (matched.length > 2) {
        // }
      }
    }
  },
  methods: {
    ...mapActions({
      storeCollapsed: 'user/storeCollapsed'
    }),
    onClose() {
      this.storeCollapsed(!this.collapsed);
    }
  }
};
</script>
<style lang="less">
#root-container {
  padding-left: 256px;
  min-height: 100vh;
  background: #212028;
  // ipad
  @media screen and (max-width: 1024px) {
    padding-left: 0px;
  }
  .root-asider {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    transform: translateZ(0);
    text-align: left;
    height: 100vh;
    min-height: 100%;
    .logo-box {
      width: 100%;
      height: 64px;
      line-height: 64px;
      box-sizing: border-box;
      background: #2a282f;
      box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
      border-bottom: 1px solid #1f1e23;
      border-right: 1px solid #1f1e23;
      img {
        display: inline-block;
        width: 63px;
        height: 41px;
        vertical-align: top;
        margin-left: 18px;
        margin-top: 14px;
      }
      span {
        padding-left: 28px;
        font-size: 0.28rem;
        color: #fff;
        font-weight: bold;
        padding-top: 20px;
        vertical-align: top;
      }
    }
    .logo {
      height: 32px;
      background: url(../../assets/images/logo.png) no-repeat left top;
      background-size: 100%;
      margin: 16px;
    }
    #root-asider-menu {
      overflow-y: auto;
      height: calc(100% - 64px);
    }
  }
  .root-content {
    padding: 10px 24px 24px;
    height: 100%;
    background: #000;
  }
}

#zapp {
  // pc
  // ipad
  // iphone
}
.ant-drawer-body {
  padding: 0;
  height: 100vh;
}
.z-root-asider {
  height: 100%;
  .logo-box {
    width: 100%;
    height: 64px;
    line-height: 64px;
    box-sizing: border-box;
    background: #2a282f;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
    border-bottom: 1px solid #1f1e23;
    border-right: 1px solid #1f1e23;
    img {
      display: inline-block;
      width: 63px;
      height: 41px;
      vertical-align: top;
      margin-left: 18px;
      margin-top: 14px;
    }
    span {
      padding-left: 28px;
      font-size: 0.28rem;
      color: #fff;
      font-weight: bold;
      padding-top: 20px;
      vertical-align: top;
    }
  }
  .logo {
    height: 32px;
    background: url(../../assets/images/logo.png) no-repeat left top;
    background-size: 100%;
    margin: 16px;
  }
  #root-asider-menu {
    overflow-y: auto;
    height: calc(100% - 64px);
  }
}
.z-root-content {
  padding: 10px 24px 24px;
  height: 100%;
  background: #000;
}
</style>
