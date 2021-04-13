<template>
  <a-breadcrumb class="z-darke-breadcrumb">
    <template v-for="(item, index) in breadcrumb">
      <a-breadcrumb-item :key="item.name">
        <a href="javascript:;" @click="pageNavigator(item, index)">{{ item['title'] }}</a>
      </a-breadcrumb-item>
    </template>
    <a-breadcrumb-item>{{ title }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  name: 'ZBreadcrumb',
  data() {
    return {};
  },
  computed: {
    title() {
      return this.$route.meta['title'];
    },
    breadcrumb() {
      // console.log('breadcrumb', this.$route.meta['breadcrumb']);
      return this.$route.meta['breadcrumb'] ? this.$route.meta['breadcrumb'] : [];
    }
  },
  methods: {
    pageNavigator(route, index) {
      // console.log('pageNavigator', route);
      // console.log({ path: route.path || '/', params: { ...this.$route.params } });
      if (index === 0) {
        return;
      }
      this.$router.push({ name: route.name || 'Home', params: { ...this.$route.params } }).catch(err => {});
    }
  }
};
</script>

<style lang="less">
.z-darke-breadcrumb.ant-breadcrumb {
  // margin-bottom: 20px;
  // padding-bottom: 20px;
  background: #000;
  padding-left: 24px;
  padding-top: 10px;
  .ant-breadcrumb-separator {
    color: #75797c;
  }
  .ant-breadcrumb-link {
    color: #fff;
    a {
      color: #9b9c9e;
    }
  }
}
</style>
