<template>
  <div class="day-indicator">
    <span>Dom</span>

    <span>Seg</span>

    <span>Ter</span>

    <span>Quar</span>

    <span>Quin</span>

    <span>Sex</span>

    <span>Sáb</span>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.day-indicator {
  grid-template-columns: repeat(auto-fill, minmax(14%, 14%));
  display: inline-grid;
  gap: 0px;
  width: 85%;
  float: right;
  justify-content: center;
  padding: 25px 0px 30px 20px;
  font-size: 2.4em;
  font-weight: 600;
  margin-bottom: 10px;
  background-color: #e1e2e1;
  border-bottom: 3px dotted grey;
}

@media only screen and (max-width: 1733px) {
  .day-indicator {
    width: 100%;
  }
}
</style>
