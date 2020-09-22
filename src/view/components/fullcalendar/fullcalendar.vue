<template>
  <div>
    <FullCalendar
      ref="fullCalendar"
      defaultView="dayGridMonth"
      locale="zh-cn"
      :header="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      }"
      :buttonText="buttonText"
      :plugins="calendarPlugins"
      :weekends="calendarWeekends"
      :events="getCalendarEvents"
      eventOrder="order"
      :eventLimit="true"
      eventLimitText="更多"
      @dateClick="handleDateClick"
      @eventClick="handleEventClick"
      />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { getDutyPlan } from '../../../api/duty/dutyPlan'

export default {
  name: 'fullcalendar_page',
  components: {
    FullCalendar
  },
  data () {
    return {
      buttonText: {
        today: '今天',
        month: '月',
        week: '周',
        day: '天',
        list: '列表'
      },
      calendarPlugins: [ // plugins must be defined in the JS
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin // needed for dateClick
      ],
      calendarWeekends: true,
      calendarEvents: [ // initial event data
      ],
      calendarApi: null
    }
  },
  methods: {
    initCalendarEvents () {
      getDutyPlan(new Date().getFullYear(), new Date().getMonth() + 1).then(res => {
        debugger
        // eslint-disable-next-line no-unused-vars
        const { code, status, message, data } = res.data
        if (status === 'success') {
          data.map(item => {
            if (item.classesCode === 'classes1') {
              item.color = '#9cd9ff'
              item.order = 1
            } else if (item.classesCode === 'classes2') {
              item.color = '#e7c191'
              item.order = 2
            } else if (item.classesCode === 'classes3') {
              item.color = '#33dbe7'
              item.order = 3
            } else {
              item.color = '#6ee74b'
              item.order = 4
            }
          })
          this.calendarEvents = data
          this.calendarApi.refetchEvents()
        }
      })
    },
    getCalendarEvents (info, successCallback, failureCallback) {
      debugger
      const events = [
        ...this.calendarEvents,
        {
          title: info.startStr,
          start: info.start.valueOf()
        }
      ]
      successCallback(events)
    },
    toggleWeekends () {
      this.calendarWeekends = !this.calendarWeekends // update a property
    },
    gotoPast () {
      // this.calendarApi.gotoDate('2019-08-01') // call a method on the Calendar object
    },
    handleDateClick (arg) {
    },
    handleEventClick (info) {
      alert('Event: ' + info.event.title)
    }
  },
  mounted () {
    this.calendarApi = this.$refs.fullCalendar.getApi()
    this.initCalendarEvents()
  }
}
</script>

<style lang='less'>
// you must include each plugins' css
// paths prefixed with ~ signify node_modules
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';
</style>
