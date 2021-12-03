<template>
  <div>
    <div>
      <EventsPanel @showEvent="showPopup($event)" />
    </div>
    <div>
      <CalendarPanel :fake="true" />
    </div>
    <div v-if="showPopupCard">
      <SeeEventCard
        :Pid="popupData.Pid"
        :Puser_id="popupData.Puser_id"
        :Pday="popupData.Pday"
        :Pyear="popupData.Pyear"
        :Pmonth="popupData.Pmonth"
        :Ptitle="popupData.Ptitle"
        :PstartingTime="popupData.PstartingTime"
        :PendingTime="popupData.PendingTime"
        :Pdescription="popupData.Pdescription"
        :Pdimage="popupData.Pimage"
        @hidePopup="closePopup()"
      />
    </div>
  </div>
</template>

<script>
import EventsPanel from "@/components/events/EventsPanel.vue";
import CalendarPanel from "@/components/calendar/CalendarPanel.vue";
import SeeEventCard from "@/components/events/SeeEventCard.vue";

export default {
  name: EventsPanel,
  components: {
    EventsPanel,
    CalendarPanel,
    SeeEventCard,
  },
  data() {
    return {
      showPopupCard: false,
      popupData: {
        Pid: null,
        Puser_id: null,
        Pday: null,
        Pyear: null,
        Pmonth: null,
        Ptitle: null,
        PstartingTime: null,
        Pdescription: null,
        PendingTime: null,
        Pimage: null,
      },
    };
  },
  methods: {
    showPopup: function (data) {
      this.popupData.Pid = data.event.id;
      this.popupData.Puser_id = data.event.user_id;
      this.popupData.Pday = data.event.day;
      this.popupData.Pyear = data.event.year;
      this.popupData.Pmonth = data.event.month;
      this.popupData.Ptitle = data.event.title;
      this.popupData.PstartingTime = data.event.startingTime;
      this.popupData.Pdescription = data.event.description;
      this.popupData.PendingTime = data.event.endingTime;
      this.popupData.Pimage = data.event.image;
      this.showPopupCard = true;
    },
    closePopup: function () {
      this.showPopupCard = false;
    },
  },
};
</script>
i
