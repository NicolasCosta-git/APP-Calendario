<template>
  <div>
    <div>
      <TopMenu />
    </div>
    <div>
      <RegisterPanel />
    </div>
    <div>
      <CalendarPanel :fake="true"/>
    </div>
  </div>
</template>

<script>
import CalendarPanel from "@/components/calendar/CalendarPanel.vue";
import RegisterPanel from "@/components/register/RegisterPanel.vue";
import TopMenu from "@/components/register/TopMenu.vue";

export default {
  name: CalendarPanel,
  components: {
    CalendarPanel,
    RegisterPanel,
    TopMenu,
  },
};
</script>
i
