import { createStore } from "vuex";
import coachesModule from './modules/coaches/index.js';
import requestModule from './modules/request/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  modules:{
    coach: coachesModule,
    request: requestModule,
    auth : authModule
  },
});

export default store;