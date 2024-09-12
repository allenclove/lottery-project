// longpress.js
export default {
  install: (app, options) => {
    app.directive('longpress1', {
      bind: function (el, binding, vNode) {
        console.log('123123')
        // // Make sure expression provided is a function
        // if (typeof binding.value !== 'function') {
        //   const compName = vNode.context.name;
        //   let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be`;
        //   if (compName) {
        //     warn += `Found in component '${compName}' `;
        //   }
        //   console.warn(warn);
        // }

        // let pressTimer = null;
        // let isCancelled = false;

        // const start = (e) => {
        //   if (e.type === 'click' && e.button !== 0) {
        //     return;
        //   }

        //   if (pressTimer === null) {
        //     pressTimer = setTimeout(() => {
        //       if (!isCancelled) {
        //         handler(e);
        //       }
        //     }, 1000);
        //   }
        //   isCancelled = false;
        // };

        // const cancel = (e) => {
        //   if (pressTimer !== null) {
        //     isCancelled = true;
        //     clearTimeout(pressTimer);
        //     pressTimer = null;
        //   }
        // };

        // const handler = (e) => {
        //   binding.value(e);
        // };

        // // 添加事件监听器
        // el.addEventListener("mousedown", start);
        // el.addEventListener("touchstart", start);
        // el.addEventListener("mouseup", cancel);
        // el.addEventListener("touchend", cancel);
        // el.addEventListener("mouseout", cancel);
        // el.addEventListener("touchcancel", cancel);
        // el.addEventListener("click", cancel); // 保留 click 事件用于取消长按

        // // 清理事件监听器
        // const cleanup = () => {
        //   el.removeEventListener("mousedown", start);
        //   el.removeEventListener("touchstart", start);
        //   el.removeEventListener("mouseup", cancel);
        //   el.removeEventListener("touchend", cancel);
        //   el.removeEventListener("mouseout", cancel);
        //   el.removeEventListener("touchcancel", cancel);
        //   el.removeEventListener("click", cancel);
        // };

        // // 添加卸载钩子
        // vNode.component?.onUnmounted(cleanup);
      },
    });
  },
};