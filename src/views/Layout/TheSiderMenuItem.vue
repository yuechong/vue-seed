<template>
  <a-sub-menu :key="menuInfo.name" v-bind="$props" v-on="$listeners">
    <span slot="title">
      <a-icon v-if="menuInfo.meta.icon" :type="menuInfo.meta.icon" />
      <span>{{ menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in menuInfo.children">
      <!-- no child or ignore-->
      <a-menu-item v-if="!item.children || item.meta.ignore" :key="item.name">
        <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <TheSiderMenuItem v-else :key="item.name" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script>
import { Menu } from 'ant-design-vue';

export default {
  name: 'TheSiderMenuItem',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style></style>
