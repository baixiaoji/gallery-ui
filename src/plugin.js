import Toast from './toast.vue';

export default {
  install(Vue, options) {
    Vue.prototype.$toast = function(message, toastOption) {
      const constructor = Vue.extend(Toast);
      const toast = new constructor();
      toast.$slots.default = [message];
      toast.$mount();
      console.log('invoke');
      document.body.appendChild(toast.$el);
    }
  },
}
