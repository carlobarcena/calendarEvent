import Vue from "vue";
import Vuex from "vuex";

import CalendarModule from './calendar';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        calendar: CalendarModule
    },
});