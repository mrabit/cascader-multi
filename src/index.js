import cascaderMulti from "./lib/components";

const iViewCasMulti = {
  cascaderMulti
};

const install = function(Vue, opts = {}) {
  Vue.component(cascaderMulti.name, cascaderMulti);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default Object.assign(iViewCasMulti, { install });
