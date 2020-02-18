function onClickDocument(e) {
  const {target} = e;
  callback.forEach(item => {
    if (item.el === target || item.el.contains(target)) {
      return;
    }
    item.binding.value();
  })
}

document.addEventListener('click', onClickDocument);

const callback = [];
export default {
  bind(el, binding) {
    callback.push({
      el,
      binding,
    })
  },
}

const removeOnClickDocument = () => {
  document.removeEventListener('click', onClickDocument);
}

export {removeOnClickDocument};
