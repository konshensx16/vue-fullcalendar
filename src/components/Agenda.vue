<template>
    <div>
        <button @click="newEvent">New event</button>
        <Fullcalendar 
            :plugins="calendarPlugins" 
            :header="{
                left: 'title',
                center: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek',
                right: 'prev today next'
            }"
            :buttonText="{
                today: 'Aujourd\'hui',
                month: 'Mois',
                week: 'Semaine',
                day: 'Jour',
                list: 'Liste'
            }"
            :weekends="false"
            :selectable="true"
            :editable="true"
            :events="EVENTS"
            @select="handleSelect"
            @eventClick="handleEventClick"
            @eventResize="updateEvent"
            @eventDrop="updateEvent"
            @eventRender="renderEvent"
        />

        <modals-container />
    </div>
</template>

<script>

require('@fullcalendar/core/main.min.css')
require('@fullcalendar/daygrid/main.min.css')
require('@fullcalendar/timegrid/main.min.css')

import Fullcalendar from '@fullcalendar/vue'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'

import {mapGetters} from 'vuex'

import EventModal from './EventModal'
import CommentsModal from './CommentsModal'
import Modal from './Modal'

export default {
    data: () => ({
        calendarPlugins: [
            DayGridPlugin,
            TimeGridPlugin,
            InteractionPlugin,
            ListPlugin
        ]
    }),
    components: {Fullcalendar},
    computed: {
        ...mapGetters(["EVENTS"])
    },
    methods: {
        newEvent() {
            this.$modal.show(Modal, {
                text: "TExt", 
            })
            
        },
        renderEvent(arg) {
            let span = document.createElement('span')

            span.setAttribute('class', 'fa fa-comments')

            arg.el.appendChild(span)

            span.addEventListener('click', event => {
                event.stopPropagation(); 
                this.$modal.show(CommentsModal, {
                    text: "This is for the comments"
                })
            })
        },
        updateEvent (arg) {
            this.$store.commit("UPDATE_EVENT", arg.event)
        },
        handleSelect(arg) {
            this.$store.commit("ADD_EVENT", {
                id: (new Date()).getTime(),
                title: "Something",
                start: arg.start,
                end: arg.end,
                allDay: arg.allDay
            })
        },
        handleEventClick (arg) {
            console.log(arg)
            this.$modal.show(EventModal, {
                text: "This is from the component",
                event: arg.event
            })
        }
    }
};

</script>

<style>

</style>
