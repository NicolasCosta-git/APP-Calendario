<template>
  <div class="event-card">
    <div class="event-header">
      <h2>Titulo - data</h2>
    </div>
    <div class="event-body">
      <div class="starting-time">
        começa: ......
      </div>
      <div class="ending-time">
        termina ......
      </div>
      <div class="description">descricao</div>
    </div>
    <div class="button-container">
      <button class="see-button">Ver</button>
      <button class="delete-button">Deletar</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.event-card {
  border-radius: 8px;
  height: 200px;
  margin: 10px;
  background-color: #fafafae7;
  color: #2c3e50;
  min-width: 270px;
}

.event-card:hover {
  box-shadow: 0 0 3pt 2pt rgba(0, 0, 0, 0.05);
}

.event-header {
  background-color: #b2dfdb;
  line-height: 40px;
  border-radius: 8px 8px 0px 0px;
  padding-left: 20px;
}

.starting-time {
  display: inline-block;
  width: 50%;
  padding: 10px 0px 10px 10px;
  font-size: 1.3em;
}

.ending-time {
  display: inline-block;
  width: 50%;
  padding: 10px 0px 10px 10px;
  font-size: 1.3em;
}

.description {
  white-space: pre;
  padding: 5px 10px;
  font-size: 1.1em;
}

.event-card button {
  border: none;
  display: block;
}

.button-container {
  display: flex;
  justify-content: center;
}

.button-container button {
  line-height: 30px;
  width: 40%;
  display: inline-block;
  border-radius: 7px;
  margin-top: 35px;
  font-size: 1.1em;
}

.delete-button {
  width: 40%;
  margin-left: 8px;
  background-color: #ff6152de;
  color: #532020c7;
}

.see-button {
  background-color: #5eb9ffd0;
  margin-right: 8px;
  color: #254257e5;
}
</style>
