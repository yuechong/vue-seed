<template>
  <a-pagination
    class="table-box-pagination"
    :showQuickJumper="showQuickJumper"
    :hideOnSinglePage="hideOnSinglePage"
    :current="pagination.pageNumber"
    :pageSize="pagination.pageSize"
    :total="pagination.total"
    :showTotal="showTotalFn"
    @change="onPageChange"
    @showSizeChange="onShowSizeChange"
  />
</template>

<script>
export default {
  name: 'ZPagination',
  props: {
    showQuickJumper: { type: Boolean, default: true },
    hideOnSinglePage: { type: Boolean, default: true },
    showTotal: { type: Boolean, default: true },
    pagination: Object
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 页码改变的回调，参数是改变后的页码及每页条数
     */
    onPageChange(page, pageSize) {
      this.pagination.pageNumber = page;
      this.pagination.pageSize = pageSize;
      this.$emit('refresh');
    },
    /**
     * pageSize 变化的回调
     */
    onShowSizeChange(current, size) {
      this.$emit('refresh');
    },
    showTotalFn(total, range) {
      if (this.showTotal) {
        return `共${total}条`;
      } else {
        return;
      }
    }
  }
};
</script>

<style lang="less">
.table-box-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
