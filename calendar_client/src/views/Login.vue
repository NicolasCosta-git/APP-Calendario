<template>
  <div>
    <div>
      <TopMenu />
    </div>
    <div>
      <LoginPanel />
    </div>
    <div>
      <CalendarPanel :fake="true"/>
    </div>
  </div>
</template>

<script>
import CalendarPanel from "@/components/calendar/CalendarPanel.vue";
import LoginPanel from "@/components/login/LoginPanel.vue";
import TopMenu from "@/components/login/TopMenu.vue";

export default {
  name: CalendarPanel,
  components: {
    CalendarPanel,
    LoginPanel,
    TopMenu,
  },
};
</script>
i
