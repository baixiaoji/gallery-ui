import Toast from './toast/toast.vue';

let currentToast;

function createToast({Vue, message, propsData}) {
  const constructor = Vue.extend(Toast);
  const toast = new constructor({
    propsData,
  });
  toast.$slots.default = [message];
  toast.$mount();
  document.body.appendChild(toast.$el);

  return toast;
}

export default {
  install(Vue) {
    Vue.prototype.$toast = function(message, toastOption) {
      if (currentToast) {
        currentToast.close();
      }
      currentToast = createToast({Vue, propsData: toastOption, message});

      currentToast.$on('close', () => {
        currentToast = null;
      })
    };
  },
};
