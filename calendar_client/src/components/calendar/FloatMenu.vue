<template>
  <div class="dots-menu">
    <div class="float-icon">
      <img src="../../assets/dots.png" alt="(...)" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.dots-menu {
  display: none; /*inline*/
  border: 1px solid;
  position: fixed;
  top: 85%;
  left: 90%;
  float: right;
}

.float-icon {
  display: inline;
}
</style>
