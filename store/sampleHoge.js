export const state = () => {
  return {
    name: 'this is hoge.'
  }
  
};

export const getters = {
  getHoge(hoge) {
    return hoge.name;
  }
};

export const mutations = {
  hoge(state, payload) {
    state.name = payload;
  }
};

export const actions = {
  setHoge(context, { name }) {
    context.commit('hoge', name);
  }
};
