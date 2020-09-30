<template>
  <div>
    <FullCalendar
      ref="fullCalendar"
      defaultView="dayGridMonth"
      locale="zh-cn"
      :header="{
        left: 'prev,next',
        center: 'title',
        right: 'today personType classes'
      }"
      :customButtons="{
        prev: {
          click: prevView
        },
        personType: {
          text: '人员类型',
          click: personChoose
        },
        classes: {
          text: '值班班次',
          click: classesChoose
        }
      }"
      :buttonText="buttonText"
      :plugins="calendarPlugins"
      :weekends="calendarWeekends"
      :events="getCalendarEvents"
      :first-day="1"
      :eventLimit="true"
      :displayEventTime="false"
      eventOrder="order"
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
import { getDutyPlan } from '@/api/duty/dutyPlan'

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
    prevView () {
      alert(this.calendarApi.getDate().getFullYear() + '-' + this.calendarApi.getDate().getMonth() + '-' + this.calendarApi.getDate().getDate())
      this.calendarApi.prev()
    },
    personChoose () {
      alert('personChoose')
    },
    classesChoose () {
      alert('classesChoose')
    },
    changeMonth (start, end, currentMonthStartDate) {
      console.log(currentMonthStartDate)
    },
    initCalendarEvents (year, month) {
      getDutyPlan(year, month).then(res => {
        res.data.map(item => {
          item.color = '#55dece'
          if (item.classesCode === 'classes1') {
            item.order = 1
          } else if (item.classesCode === 'classes2') {
            item.order = 2
          } else if (item.classesCode === 'classes3') {
            item.order = 3
          } else {
            item.order = 4
          }
        })
        this.calendarEvents = res.data
        this.calendarApi.refetchEvents()
      })
    },
    getCalendarEvents (info, successCallback, failureCallback) {
      const events = [
        ...this.calendarEvents
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
    this.initCalendarEvents(new Date().getFullYear(), new Date().getMonth() + 1)
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
