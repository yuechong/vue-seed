<template>
  <a-layout-header class="root-header">
    <div class="root-header-box">
      <a-icon class="trigger left" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="collapsedFn" />
      <div class="right-menu">
        <a-dropdown>
          <a href="javascript:;" class="user-dropdown" @click="e => e.preventDefault()">
            <img class="avdator-img" :src="avdatorUrl" alt="" width="20" height="20" />
            {{ user.username }}
          </a>
          <a-menu slot="overlay" @click="userMenuClick">
            <a-menu-item key="reset">重置密码</a-menu-item>
            <a-menu-item key="logout">退出</a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-dropdown overlayClassName="lang-menu">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            <a-icon type="global" style="font-size:18px;color:red;vertical-align:middle;" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;" v-bind:class="{ active: locale === 'zh-cn' }" @click="setLang('zh-cn')">中文</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" v-bind:class="{ active: locale === 'en' }" @click="setLang('en')">English</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div style="clear:both;"></div>
    </div>
  </a-layout-header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import personJpg from '../../assets/images/person.jpg';

export default {
  name: 'theHeader',
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      collapsed: 'user/collapsed',
      user: 'user/user'
    }),
    avdatorUrl() {
      return this.user['profile_photo_url']
        ? process.env.VUE_APP_IMAGE_URL + this.user['profile_photo_url']
        : personJpg;
    }
  },
  methods: {
    ...mapActions({
      storeCollapsed: 'user/storeCollapsed'
    }),
    /**
     * menu 菜单
     */
    collapsedFn() {
      // console.log(this.collapsed);
      this.storeCollapsed(!this.collapsed);
    },
    /**
     * 用户菜单
     */
    userMenuClick({ key }) {
      if (key === 'reset') {
        this.$router.push({ name: 'SystemUser' });
      } else if (key === 'logout') {
        // 登出
        this.$utils.userLogout(this);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.ant-layout-header.root-header {
  padding: 0 23px;
}
.root-header {
  background-color: #2a282f;
  color: #bdbdbd;
  .root-header-box {
    line-height: 64px;
    height: 64px;
    .right-menu {
      float: right;
      height: 100%;
      .avdator-img {
        margin-right: 4px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
    .trigger {
      font-size: 20px;
      margin-top: 22px;
    }
    .user-dropdown {
      color: #bdbdbd;
      font-size: 16px;
      margin-right: 26px;
    }
  }
}
</style>
