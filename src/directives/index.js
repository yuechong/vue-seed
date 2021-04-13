import { LEVELMAP } from '@/utils/comm.data';
import Store from '../store';
export default {
  install(Vue, option = {}) {
    // 权限
    Vue.prototype.$permission = key => {
      const pathIds = Store.getters['user/pathIds'];
      // console.log('pathKes', pathKes);
      if (pathIds.includes(key)) {
        return true;
      }
      return false;
    };
    Vue.directive('permission', {
      inserted: (el, binding) => {
        const pathIds = Store.getters['user/pathIds'];
        if (!pathIds.includes(binding.value)) {
          el.remove();
        }
      }
    });

    /**
     * 销售层级
     */
    Vue.directive('level', {
      inserted: (el, binding) => {
        if (binding.value) {
          el.innerHTML = LEVELMAP[binding.value] || '';
        } else {
          el.innerHTML = '';
        }
      },
      componentUpdated: (el, binding) => {
        if (binding.value) {
          el.innerHTML = LEVELMAP[binding.value] || '';
        } else {
          el.innerHTML = '';
        }
      }
    });
    /**
     * 获取滚动条的高度
     * @returns
     */
    const getScrollTop = () => {
      var scroll_top = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scroll_top = document.documentElement.scrollTop;
      } else if (document.body) {
        scroll_top = document.body.scrollTop;
      }
      return scroll_top;
    };

    /**
     * 拖动
     */
    Vue.directive('drag', {
      bind(el, binding) {
        /**
         * mouseDown
         * @param {*} e
         */
        el.__dragMouseDownFn = e => {
          e = e || window.event;
          const targetId = binding.value;
          const parentPointBox = document.getElementById(targetId);
          const boundRect = parentPointBox.getBoundingClientRect();
          el.dataset.parentX = boundRect.x;
          el.dataset.parentY = boundRect.y + getScrollTop();
          el.dataset.parentW = boundRect.width;
          el.dataset.parentH = boundRect.height;
          el.dataset.maxX = boundRect.width - el.getBoundingClientRect().width;
          el.dataset.maxY = boundRect.height - el.getBoundingClientRect().height;
          el.dataset.offsetX = e.offsetX;
          el.dataset.offsetY = e.offsetY;
          document.body.addEventListener('mousemove', el.__dragBodyMoveFn);
          e.preventDefault();
          e.stopPropagation();
          return false;
        };
        /**
         * body move
         * @param {*} e
         */
        el.__dragBodyMoveFn = e => {
          e = e || window.event;
          const { pageX, pageY } = e;
          const left = pageX - el.dataset.offsetX - el.dataset.parentX;
          const top = pageY - el.dataset.offsetY - el.dataset.parentY;
          // 处理边界
          if (left < 0 || left > el.dataset.maxX || top < 0 || top > el.dataset.maxY) {
            // 取消监听
            document.body.removeEventListener('mousemove', el.__dragBodyMoveFn);
            el.dataset.pecentX = (left / el.dataset.parentW) * 100 + '%';
            el.dataset.pecentY = (top / el.dataset.parentH) * 100 + '%';
          }

          el.style.left = left + 'px';
          el.style.top = top + 'px';
        };
        /**
         * mouseup
         * @param {*} e
         */
        el.__dragMouseUpFn = e => {
          e = e || window.event;
          el.dataset.pecentX = (parseFloat(el.style.left) / el.dataset.parentW) * 100 + '%';
          el.dataset.pecentY = (parseFloat(el.style.top) / el.dataset.parentH) * 100 + '%';
          // 取消监听
          document.body.removeEventListener('mousemove', el.__dragBodyMoveFn);
          e.preventDefault();
          e.stopPropagation();
        };
      },
      inserted: (el, binding) => {
        const disabled = el.dataset.disabled;
        // console.log('inserted', disabled);

        if (disabled) {
          /**
           * 处理数据
           */
          el.dataset.pecentX = el.style.left;
          el.dataset.pecentY = el.style.top;
          return;
        }
        // console.log('addEventListener');
        el.addEventListener('mousedown', el.__dragMouseDownFn);
        el.addEventListener('mouseup', el.__dragMouseUpFn);
      },
      componentUpdated: (el, binding) => {
        const disabled = el.dataset.disabled;
        // console.log('inserted', disabled);

        if (disabled) {
          return;
        }
        // console.log('addEventListener');
        el.addEventListener('mousedown', el.__dragMouseDownFn);
        el.addEventListener('mouseup', el.__dragMouseUpFn);
      },
      unbind(el) {
        el.removeEventListener('mousedown', el.__dragMouseDownFn);
        el.removeEventListener('mouseup', el.__dragMouseUpFn);
        el.__dragMouseDownFn = null;
        el.__dragBodyMoveFn = null;
        el.__dragMouseUpFn = null;
      }
    });
  }
};
