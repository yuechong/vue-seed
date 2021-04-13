<script>
export default {
  name: 'ZTable',
  props: {
    size: { type: String, default: 'middle' },
    rowKey: String,
    loading: Boolean,
    columns: Array,
    dataSource: Array,
    pagination: { type: Object | Boolean, default: false }
  },
  render(h) {
    return h('a-table', {
      props: {
        ...this.$props
      },
      attrs: {
        ...this.$attrs,
        class: 'table-box z-dark-table'
      },
      slots: this.$slots,
      scopedSlots: this.$scopedSlots,
      on: {
        ...this.$listeners
      }
    });
  }
};

// <template>
//   <a-table
//     class="table-box z-dark-table"
//     :size="size"
//     :rowKey="rowKey"
//     :loading="loading"
//     :columns="columns"
//     :data-source="dataSource"
//     :pagination="pagination"
//     v-on="$listeners"
//   >
//     <!-- cloumn -->
//     <template v-for="(index, name) in $slots" :slot="name">
//       <slot :name="name" />
//     </template>
//     <!-- cloumn content -->
//     <template v-for="(fn,name) in $scopedSlots" v-slot:[name]="slotProps">
//       {{name}} {{slotProps}}
//       <slot :name="name" v-bind:item="{slotProps}"></slot>
//     </template>
//   </a-table>
// </template>
</script>

<style lang="less"></style>
