export default {
  namespace: "user",

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      console.log("user subscriptions");
    },
  },

  effects: {
    // *fetch({ payload }, { call, put }) {
    //   // eslint-disable-line
    //   yield put({ type: "save" });
    // },
  },

  reducers: {
    // save(state, action) {
    //   return { ...state, ...action.payload };
    // },
  },
};
