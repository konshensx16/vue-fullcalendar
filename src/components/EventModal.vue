<template>
  <div>
    <fieldset>
      <legend>Event details</legend>
      <b>Title:</b>  {{ event.title }} <br/>
      <b>Start:</b>  {{ event.start }} <br/>
      <b>End:</b>  {{ event.end }} <br/>
      <b>ID:</b>  {{ event.id }} <br/>
    </fieldset>

    <fieldset>
        <legend>Edit event</legend>
        <input type="text" v-model="title">
        <input type="date" v-model="start">
        <input type="date" v-model="end">

        <button @click="updateEvent">Save</button>
    </fieldset>
  </div>
</template>

<script>

export default {
    data: () => ({
        title: "",
        start: {},
        end: {}
    }),
    methods: {
        updateEvent () {
            this.$store.commit("UPDATE_EVENT", {
                id: this.event.id,
                title: this.title,
                start: this.start,
                end: this.end,
            })
        }
    },
  props: {
    text: String,
    event: Object
  },mounted() {
      this.title = this.event.title;
      this.start = formatDate(this.event.start);
      this.end = formatDate(this.event.end);
  }
};

function formatDate(date) {
    // YYYY-MM-DD 
    var options = {year: "numeric", month: '2-digit', day: "2-digit"};
    let string = date.toLocaleDateString("ko-KR", options).replace(/\. /g, "-")

    return string.substr(0, string.length - 1)
}
</script>

<style>
</style>
