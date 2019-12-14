import Toast from './toast.vue';

let currentToast;

function createToast({Vue, toastOption, message}) {
  const constructor = Vue.extend(Toast);
  const toast = new constructor({
    propsData: toastOption,
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
      currentToast = createToast({Vue, toastOption, message});

      currentToast.$on('close', () => {
        currentToast = null;
      })
    };
  },
};
