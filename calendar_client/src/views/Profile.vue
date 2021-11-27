<template>
  <div>
    <div>
     <ProfilePanel />
    </div>
    <div>
      <CalendarPanel/>
    </div>
  </div>
</template>

<script>
import CalendarPanel from "@/components/calendar/CalendarPanel.vue";
import ProfilePanel from "@/components/profile/ProfilePanel.vue";

export default {
  name: CalendarPanel,
  components: {
    CalendarPanel,
    ProfilePanel,
  },
};
</script>
