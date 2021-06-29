<template>
  <div>
    <div>
      <EventsPanel />
    </div>
    <div>
      <CalendarPanel :fake="true" />
    </div>
    <div>
      <SeeEventCard />
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
};
</script>
i
