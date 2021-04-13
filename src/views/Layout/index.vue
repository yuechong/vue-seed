<template>
  <div v-bind:class="{ 'z-theme-root': true, [brower]: true, collapsed: collapsed }">
    <template v-if="brower === 'z-pc'">
      <a-layout-sider class="z-root-asider" v-model="collapsed" :trigger="null" collapsible width="256px">
        <div class="ignore-z-logo-box">
          <img src="../../assets/images/logo.png" width="63" alt />
          <span v-show="!collapsed">杰牌传动</span>
        </div>
        <TheSiderMenu />
      </a-layout-sider>
    </template>
    <template v-else>
      <a-drawer placement="left" :closable="false" wrapClassName="z-drawer" :visible="collapsed" @close="onClose">
        <a-layout-sider class="z-root-asider" :trigger="null" width="256px">
          <div class="ignore-z-logo-box">
            <img src="../../assets/images/logo.png" width="63" alt />
            <span>杰牌传动</span>
          </div>
          <TheSiderMenu />
        </a-layout-sider>
      </a-drawer>
    </template>

    <a-layout class="ignore-z-root-body z-root-body">
      <TheHeader />
      <!-- <a-layout-content> -->
      <ZBreadcrumb />
      <div class="z-root-content">
        <router-view></router-view>
      </div>
      <a-back-top />

      <!-- </a-layout-content> -->
      <!-- <a-layout-footer>Footer</a-layout-footer> -->
    </a-layout>
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
      brower: 'z-pc'
    };
  },
  computed: {
    ...mapGetters({
      collapsed: 'user/collapsed'
    })
  },
  mounted() {
    const clientWidth = document.body.clientWidth;
    if (clientWidth > 1024) {
      this.brower = 'z-pc';
    } else if (clientWidth > 450) {
      this.brower = 'z-ipad';
    } else {
      this.brower = 'z-iphone';
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
@red: #c73531;
.z-drawer {
  .ant-drawer-body {
    padding: 0;
    .z-root-asider {
      height: 100vh;
      .ignore-z-logo-box {
        width: 100%;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        background: #2a282f;
        box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14),
          0 1px 18px 0 rgba(0, 0, 0, 0.12);
        border-bottom: 1px solid #1f1e23;
        border-right: 1px solid #1f1e23;
        img {
          display: inline-block;
          width: 56px;
          height: 36px;
          vertical-align: top;
          margin-left: 20px;
          margin-top: 4px;
        }
        span {
          padding-left: 18px;
          font-size: 30px;
          color: #fff;
          font-weight: bold;
          padding-top: 20px;
          vertical-align: top;
        }
      }
    }
  }
}

.z-theme-root {
  width: 100%;
  height: 100%;
  .z-root-asider {
    .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected,
    .ant-menu.ant-menu-dark .ant-menu-item-selected {
      background-color: @red;
    }
    .ant-menu-dark,
    .ant-menu-dark .ant-menu-sub {
      background: #2a282f;
      color: #bdbdbd;
    }
    .ant-menu-dark .ant-menu-inline.ant-menu-sub {
      background: #212121;
    }
  }
  .ant-layout-header {
    height: 64px;
    line-height: 64px;
  }
  #root-asider-menu {
    overflow-y: auto;
    height: calc(100% - 64px);
  }
  .ignore-z-logo-box {
    width: 100%;
    height: 64px;
    line-height: 64px;
    overflow: hidden;
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
      margin-left: 20px;
      margin-top: 14px;
    }
    span {
      padding-left: 18px;
      font-size: 0.28rem;
      color: #fff;
      font-weight: bold;
      padding-top: 20px;
      vertical-align: top;
    }
  }
  .z-root-body {
    min-height: 100vh;
    height: 100%;
    background: #000;
    .z-root-content {
      padding: 25px 24px 24px;
      height: 100%;
    }
  }
}

// pc
.z-theme-root.z-pc {
  .z-root-asider {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    transform: translateZ(0);
    text-align: left;
    height: 100vh;
    min-height: 100%;
  }
  .ignore-z-root-body {
    padding-left: 256px;
  }
}
.z-theme-root.z-pc.collapsed {
  .ignore-z-logo-box img {
    margin-left: 10px;
  }
  .ignore-z-root-body {
    padding-left: 80px;
  }
}
// ipad
.z-theme-root.z-ipad {
  .z-root-asider {
    height: 100vh;
  }
  .ant-layout-header {
    height: 80px;
    line-height: 80px;
  }
  #root-asider-menu {
    overflow-y: auto;
    height: calc(100% - 80px);
  }
}
</style>
