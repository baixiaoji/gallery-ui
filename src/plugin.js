import Toast from './toast.vue';

export default {
  install(Vue, options) {
    Vue.prototype.$toast = function(message, toastOption) {
      const constructor = Vue.extend(Toast);
      const toast = new constructor({
        propsData: toastOption,
      });
      toast.$slots.default = [message];
      toast.$mount();
      document.body.appendChild(toast.$el);
    }
  },
}
