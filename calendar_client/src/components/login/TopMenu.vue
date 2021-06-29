<template>
  <div class="top-menu">
    <div class="float-icon">
      <h3><a href="#">Registre-se</a></h3>
      <div class="black-bar"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.top-menu {
  display: block; /*inline*/
  border: 1px solid rgba(0, 0, 0, 0.089);
  border-radius: 0px 0px 20px 20px;
  background-color: #b2dfdb;
  position: fixed;
  top: 0px;
  margin-left: 92%;
  padding-top: 5px;
  text-align: center;
  z-index: 2;
}

.float-icon h3 {
  padding: 0px 5px;
  color: rgba(0, 0, 0, 0.918);
  font-size: 1.15em;
}

.float-icon h3 a {
  text-decoration: none;
  padding-left: 10px;
  padding-right: 10px;
  color: rgba(0, 0, 0, 0.836);
}

.float-icon {
  display: block;
  opacity: 0.7;
}

.black-bar {
  height: 3px;
  border-radius: 50px;
  background-color: rgba(0, 0, 0, 0.836);
  margin-right: 7px;
  margin-left: 7px;
  margin-bottom: 10px;
}
</style>
