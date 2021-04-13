<template>
  <div class="candy-chart-box">
    <div class="candy-chart-header" v-if="title">{{ title }}</div>
    <div class="candy-chart-contet">
      <div class="candy-chart-el" v-bind="$attrs" :id="elId"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'CandyChart',
  props: {
    title: String,
    elId: { type: String, default: 'candy-chart-el' },
    option: Object,
    loading: Boolean,
    minValue: Number,
    maxValue: Number
  },
  data() {
    return {
      chart: null
    };
  },
  methods: {},
  mounted() {
    const el = document.getElementById(this.elId);
    this.chart = echarts.init(el);
    this.$on('hook:beforeDestroy', () => {
      this.chart.dispose && this.chart.dispose();
    });
  },
  /**
   * 监听loading 值为true时加载loading状态，flase为加载完成状态
   */
  watch: {
    loading(bool) {
      if (!bool) {
        this.chart.clear();
        this.chart.setOption(this.option);
      }
    }
  }
};
</script>

<style lang="scss">
.candy-chart-box {
  width: 100%;
  height: 100%;
  .candy-chart-contet {
    height: 100%;
    .candy-chart-el {
      width: 100%;
      min-height: 250px;
      height: 100%;
    }
  }
}
</style>
