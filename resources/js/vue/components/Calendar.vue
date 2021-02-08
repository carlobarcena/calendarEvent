<template>
    <div>
        <div class="container-fluid">
            <div class="card mt-5">
                <div class="row mt-3">
                    <h3 class="card-title ml-3 col-sm-4">Calendar</h3>
                    <div v-if="showAlert === true" class="alert alert-success event-alert mt-3 mr-3" role="alert">
                        Event Successfully Updated!
                    </div>
                </div>
                <hr>
            <div class="row ml-1 mt-3 mx-2">
                <div class="col-sm-3">
                    <div class="row my-3">
                        <div class="col-sm-12">
                            <label class="mx-1">Event</label>
                            <input type="text" class="form-control mx-auto" v-model="eventMessage"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="mx-1">From</label>
                            <datepicker @closed="handleDisable(startDate)" :open-date="checkOpenDate()" input-class="form-control mx-auto" :typeable="true" placeholder="Select Date" v-model="startDate" :format="'yyyy-MM-dd'"></datepicker>
                        </div>
                        <div class="col-sm-6">
                            <label class="mx-1">To</label>
                            <datepicker :disabledDates="disable.disabledDates" :open-date="checkOpenDate()" input-class="form-control mx-auto" :typeable="true" placeholder="Select Date" v-model="endDate" :format="'yyyy-MM-dd'"></datepicker>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-12">
                            <div v-for="(d, i) in day" :key="i" class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" :value="d" v-model="checkedDays">
                                <label class="form-check-label">{{d}}</label>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <button class="btn btn-primary mt-4 px-4" @click="handleSave" :disabled="checkFields()">Save</button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-9">
                    <h3>{{displayMonth}} {{displayYear}}</h3>
                    <hr>
                    <div v-for="(d, i) in numDay" :key="i" :class="checkDay(d.day, d.num, 'class')">
                        <div class="py-3 ml-3 row"> 
                            <div class="col-sm-3">{{d.num}} {{d.day}}</div> 
                            <div class="col-sm-9">{{checkDay(d.day, d.num, 'message')}}</div>
                        </div>
                        <hr>
                    </div>
                </div>
            </div>
        </div>
        
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getNumberofDaysInMonth, showMonth, compareDate, formatDate, setStartTime } from '../utils/calendarUtil';

import Datepicker from 'vuejs-datepicker';

export default {
    data () {
        const year = this.$route.params.year;
        const month = this.$route.params.month;
        return {
            numDay: getNumberofDaysInMonth(year, month),
            displayYear: year,
            displayMonth: showMonth(year, month),
            setDate: {year: year, month: month},
            day: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
            checkedDays: [],
            eventMessage: '',
            startDate: '',
            endDate: '',
            eventId: '',
            showAlert: false,
            disable: {}
        }
    },
    mounted() {
        this.$store.dispatch("calendar/getDays");
    },
    components: {
        Datepicker
    },
    computed: {
        proxyCheckedDate: {
            get() {
                this.endDate = this.$store.state.calendar.endDate;
                this.startDate = this.$store.state.calendar.startDate;
                this.eventMessage = this.$store.state.calendar.eventMessage;
                this.checkedDays = this.$store.state.calendar.checkedDays;
                this.eventId = this.$store.state.calendar.eventId;
                this.handleDisable(this.$store.state.calendar.startDate);
                return this.$store.state.calendar.checkedDays;
            }
        }
    },
    methods: {
        ...mapActions({ 
            saveEvent: "calendar/saveEvent"
         }),
        checkDay(day, num, type) {
            let setDate = `${this.setDate.year}/${this.setDate.month}/${num}`;
            let text = (type === 'class') ? 'background-green' : this.$store.state.calendar.eventMessage;
            if (this.proxyCheckedDate.includes(day) && compareDate(setDate, this.$store.state.calendar.startDate, this.$store.state.calendar.endDate)) {
                return text;
            }
            return '';
        },
        checkOpenDate() {
            if (!this.startDate || !this.endDate) {
                return new Date(`${this.displayYear}-${this.setDate.month}`);
            } else {
                return new Date(this.startDate);
            }
        },
        handleDisable(date) {
            this.disable = {
                disabledDates: {
                    to: new Date(setStartTime(date))
                }
            }
        },
        async handleSave() {
            const data = {
                event_message: this.eventMessage,
                start_date: formatDate(this.startDate),
                end_date: formatDate(this.endDate),
                checked_dates: this.checkedDays,
                event_id: this.eventId
            }
            let result = await this.saveEvent(data);
            if (result) {
                this.showAlert = true;
                let alert = this;
                setTimeout(function() {
                    alert.showAlert = false;
                }, 2500)
            }    
        },
        checkFields() {
            if (this.eventMessage === '' || this.startDate === '' || this.endDate === '') {
                return true;
            }
            return false;
        }
    },
}
</script>

<style scoped>
    hr {
        padding: 0px;
        margin: 0px;    
    }
    .background-green {
        background-color: #ccffdd;
    }
    .event-alert {
        position: fixed;
        top: 0;
        right: 0;
        width: 50;
        z-index: 100;
    }
</style>
