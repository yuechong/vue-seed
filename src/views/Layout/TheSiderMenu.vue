<template>
  <a-menu
    id="root-asider-menu"
    theme="dark"
    mode="inline"
    :selected-keys="selectKeys"
    :default-open-keys="defaultOpenKeys"
    @click="menuClickFn"
  >
    <!-- for nav -->
    <template v-for="menu in navMenu">
      <TheSiderMenuItem v-if="menu['children']" :menu-info="menu" :key="menu.name" />
      <a-menu-item v-else :key="menu.name">
        <a-icon v-if="menu.meta.icon" :type="menu.meta.icon" />
        <span>{{ menu.meta.title }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script>
import { mapGetters } from 'vuex';
const TheSiderMenuItem = () => import('./TheSiderMenuItem');

export default {
  name: 'TheSiderMenu',
  components: { TheSiderMenuItem },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userRoutes: 'user/userRoutes'
    }),
    /**
     * menu array 菜单数组
     */
    navMenu() {
      if (this.userRoutes && this.userRoutes['children']) {
        const list = this.userRoutes.children;
        let array = [];
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          if (item.path === '*') {
            continue;
          }

          array.push(item);
        }
        // console.log('navMenu', array);
        return array;
      }
      return [];
    },
    /**
     * menu active 菜单active状态
     */
    selectKeys() {
      const { name, matched } = this.$route;
      if (matched.length > 2) {
        // console.log('selectKeys', [matched[1].name]);
        return [matched[2].name];
      }
      return [name];
    },
    /**
     * menu open 菜单打开状态
     */
    defaultOpenKeys() {
      const matched = this.$route.matched;
      // console.log('matched', matched);
      if (matched.length > 2) {
        // console.log([matched[1].name]);
        return [matched[1].name];
      }
      return [];
    }
  },
  methods: {
    /**
     * menu click 菜单点击跳转
     */
    menuClickFn(data) {
      // console.log('menuClickFn', data);
      // if(){}
      this.$router.push({ name: data.key }).catch(err => {});
    }
  }
};
</script>

<style lang="less"></style>
