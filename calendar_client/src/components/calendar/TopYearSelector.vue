<template>
  <div class="top-year-selector">
    <button href="#" @click="previousYear()" class="previous-year">
      <img src="../../assets/arrow.png" alt="" />
    </button>
    <div class="year" v-bind="currentYear">{{ currentYear }}</div>
    <button href="#" @click="nextYear()" class="next-year">
      <img src="../../assets/arrow.png" alt="" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentYear: null,
    };
  },
  methods: {
    // retorna o ano atual
    getCurrentYear: function() {
      return new Date().getFullYear();
    },
    // retorna o próximo ano
    nextYear: function() {
      this.currentYear += 1;
      this.$emit("update", {
        year: this.currentYear,
        month: null,
      });
    },
    // retorna o ano anterior
    previousYear: function() {
      this.currentYear -= 1;
      this.$emit("update", {
        year: this.currentYear,
        month: null,
      });
    },
  },
  created: function() {
    this.currentYear = this.getCurrentYear();
  },
};
</script>

<style scoped>
.top-year-selector {
  display: table;
  float: right;
  width: 50%;
  font-size: 50px;
  padding: 10px 0px;
  background-color: #b2dfdb;
  color: #2c3e50;
}

.previous-year {
  display: table-cell;
  float: right;
  text-decoration: none;
  background-color: #b2dfdb;
  border: none;
}

.year {
  display: table-cell;
  width: 50%;
  text-align: center;
}

.next-year {
  float: left;
  display: table-cell;
  text-decoration: none;
  background-color: #b2dfdb;
  border: none;
}

.next-year img {
  opacity: 0.7;
  transform: scaleX(-1);
}

@media only screen and (min-width: 1733px) {
  .top-year-selector {
    display: none;
  }
}
</style>
