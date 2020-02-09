export const state = () => {
    return {
        jpy: {},
        btc: {},
        timeStamp: null,
        intervalTimer: null,
    };
};

export const getters = {
  getJpyRate(rate) {
    return rate.jpy;
  },
  getBtcRate(rate) {
    return rate.btc;
  },
  getIntervalStatus(rate) {
    return !!rate.intervalTimer;
  },
  getAllRate({ jpy, btc, timeStamp }) {
    return {
      jpy,
      btc,
      timeStamp
    };
  }
};

export const mutations = {
  jpy(state, payload) {
    state.jpy = payload;
  },
  btc(state, payload) {
    state.btc = payload;
  },
  timeStamp(state, payload) {
    state.timeStamp = payload;
  },
  intervalTimer(state, payload) {
    state.intervalTimer = payload;
  }
};

export const actions = {
  setJpyRate(context, { jpy, timeStamp }) {
    context.commit('jpy', jpy);
    context.commit('timeStamp', timeStamp);
  },
  setBtcRate(context, { btc, timeStamp }) {
    context.commit('btc', btc);
    context.commit('timeStamp', timeStamp);
  },
  stopintervalTimer(context) {
    clearInterval(context.state.intervalTimer);
    context.commit('intervalTimer', null);
  },
  infiniteRate(context) {
    if (this.getters['rate/getIntervalStatus']) {
        return;
    }
    const timer = setInterval(() => {
        console.log('infiniteRate');
        this.dispatch({ type: 'rate/fetchRate' });
    }, 10000);
    
    context.commit('intervalTimer', timer);
  },
  async fetchRate() {
    console.log('fetchRate');
    const { data } = await getRate(this.$axios);
    if (!data) return;
    const timeStamp = String(new Date());
    this.dispatch({ type: 'rate/setJpyRate', jpy: data.jpy, timeStamp });
    this.dispatch({ type: 'rate/setBtcRate', btc: data.btc, timeStamp });
  }
};

const getRate = ($axios) => {
    return $axios.get('/api/rate/all'); 
};