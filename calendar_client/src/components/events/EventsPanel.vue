<template>
  <div>
    <div class="event-panel">
      <a href="" class="exit-button"
        ><img src="../../assets/x-mark.png" alt=""
      /></a>
      <div class="event-header">
        <h1>Seus eventos</h1>
      </div>
      <div class="event-grid">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  </div>
</template>

<script>
import EventCard from "./EventCard.vue";
export default {
  name: "EventsPanel",
  components: {
    EventCard,
  },
};
</script>

<style scoped>
.event-panel {
  position: fixed;
  height: 100vh;
  width: 100%;
  display: block;
  justify-content: center;
  backdrop-filter: blur(80px);
  box-shadow: 0 0 3pt 2pt rgba(0, 0, 0, 0.7);
  padding: 5%;
  min-width: 540px;
  z-index: 1;
}

.event-header {
  display: block;
  border: 1px solid rgba(0, 0, 0, 0.185);
  background-color: #b2dfdb;
  border-radius: 12px 12px 0px 0px;
  padding-bottom: 30px;
  padding-left: 30px;
}

.event-grid {
  overflow-y: scroll;
  margin: auto;
  border: 1px solid rgba(0, 0, 0, 0.185);
  background: #e9e7e7;
  grid-template-columns: repeat(auto-fill, minmax(26%, 26%));
  display: inline-grid;
  gap: 0px 0px;
  width: 100%;
  float: right;
  height: 710px;
  justify-content: center;
  padding: 30px 0px 10px 0px;
}

.event-grid::-webkit-scrollbar-track {
  background: #e9e7e7;
}

.exit-button {
  position: relative;
  display: inline;
  width: 100%;
  text-align: right;
  top: 10px;
  right: 10px;
  float: right;
  opacity: 0.62;
}
</style>
