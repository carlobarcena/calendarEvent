const API_URL = 'http://127.0.0.1:8000';
const eventUrl = `${API_URL}/api/event`;

export default {
    namespaced: true,
    state: {
        eventId: '',
        startDate: '',
        endDate: '',
        eventMessage: '',
        checkedDays: []
    },
    mutations: {
        setEvent(state, eventData) {
            state.startDate = eventData.start_date;
            state.endDate = eventData.end_date;
            state.eventMessage = eventData.event_message;
            state.eventId = eventData.event_id;
            state.checkedDays = JSON.parse(eventData.checked_dates);
        }
    },
    actions: {
        async getDays(context) {
            await axios.get(eventUrl).then((res) => {
                if (res.data.length > 0) {
                    context.commit('setEvent', res.data[0]);
                }
            }).catch((err) => {
                console.log(err.response);
            });
        },
        async saveEvent(context, data) {
            let result = false;
            await axios.post(eventUrl, data).then((res) => {
                result = true;
            }).catch((err) => {
                console.log(err.response);
            });
            context.commit("setEvent", (await axios.get(eventUrl)).data[0]);
            return result;
        },
    }
}
