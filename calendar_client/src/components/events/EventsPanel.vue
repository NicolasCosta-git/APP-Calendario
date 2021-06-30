<template>
  <div>
    <div class="event-panel">
      <router-link :to="{ name: 'calendar' }" class="exit-button"
        ><img src="../../assets/x-mark.png" alt=""
      /></router-link>
      <div class="event-header">
        <h1>Seus eventos</h1>
      </div>
      <div class="event-grid">
        <div v-for="event in events" :key="event.id">
          <EventCard
            :day="event.day"
            :description="event.description"
            :endingTime="event.endingTime"
            :id="event.id"
            :month="event.month"
            :startingTime="event.startingTime"
            :title="event.title"
            :user_id="event.user_id"
            :year="event.year"
            @showEvent="showPopup($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventCard from "./EventCard.vue";
import axios from "axios";

export default {
  name: "EventsPanel",
  components: {
    EventCard,
  },
  data() {
    return {
      req: {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
      user_id: undefined,
      events: [],
    };
  },
  methods: {
    getUser: async function() {
      await axios
        .post("http://localhost:3030/validate", {}, this.req)
        .then((res) => {
          this.user_id = res.data.data.id;
        })
        .catch(() => {
          localStorage.removeItem("token");
          this.$router.push({ name: "login" });
        });
    },
    getEvents: async function() {
      await axios
        .get("http://localhost:3030/getall/" + this.user_id, this.req)
        .then((res) => {
          this.events = res.data.data;
        })
        .catch((err) => {
          console.log(err.params.error);
        });
    },
    showPopup: function(event) {
      this.$emit("showEvent", { event });
    },
    closePanel: function() {
      this.$router.push({ name: "calendar" });
    },
  },
  async created() {
    await this.getUser();
    await this.getEvents();
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
  display: inline-grid;
  gap: 0px 50px;
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

@media only screen and (min-width: 1733px) {
  .event-grid {
    grid-template-columns: repeat(auto-fill, minmax(26%, 26%));
  }
}

@media only screen and (max-width: 1733px) {
  .event-grid {
    grid-template-columns: repeat(auto-fill, minmax(40%, 40%));
  }
}

@media only screen and (max-width: 1233px) {
  .event-grid {
    grid-template-columns: repeat(auto-fill, minmax(90%, 90%));
  }
}
</style>
