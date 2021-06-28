<template>
  <div class="top-month-selector">
    <button href="#" @click="previousMonth()" class="previous-month">
      <img src="../../assets/arrow.png" alt=">" />
    </button>
    <div class="month">{{ currentMonth }}</div>
    <button href="#" class="next-month">
      <img @click="nextMonth()" src="../../assets/arrow.png" alt="<" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      months: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      currentMonth: null,
      currentMonthNumber: null,
    };
  },
  methods: {
    getCurrentMonth: function() {
      return new Date().getMonth();
    },
    nextMonth: function() {
      if (this.currentMonthNumber < 12) {
        this.currentMonth = this.months[this.currentMonthNumber + 1];
        this.currentMonthNumber = this.currentMonthNumber + 1;
      } else {
        this.currentMonth = this.months[0];
        this.currentMonthNumber = 0;
      }
      this.$emit("update", {
        year: null,
        month: this.currentMonthNumber,
      });
    },
    previousMonth: function() {
      if (this.currentMonthNumber == -1) {
        this.currentMonth = this.months[11];
        this.currentMonthNumber = 11;
      } else {
        this.currentMonth = this.months[this.currentMonthNumber - 1];
        this.currentMonthNumber = this.currentMonthNumber - 1;
      }
      this.$emit("update", {
        year: null,
        month: this.currentMonthNumber,
      });
    },
  },
  created: function() {
    this.currentMonthNumber = this.getCurrentMonth();
    this.currentMonth = this.months[this.getCurrentMonth()];
  },
};
</script>

<style scoped>
.top-month-selector {
  display: table;
  float: right;
  width: 50%;
  font-size: 50px;
  padding: 10px 0px;
  background-color: #b2dfdb;
  color: #2c3e50;
}

.top-month-selector a {
  color: #ffffff;
}

.previous-month {
  display: table-cell;
  float: right;
  text-decoration: none;
  transition: transform 100ms ease-in-out;
  opacity: 0.7;
  background-color: #b2dfdb;
  border: none;
}

.previous-month:active {
  transform: scale(0.9);
}

.month {
  display: table-cell;
  width: 50%;
  text-align: center;
}

.next-month {
  display: table-cell;
  text-decoration: none;
  transition: transform 100ms ease-in-out;
  background-color: #b2dfdb;
  border: none;
  float: left;
}

.next-month img {
  opacity: 0.7;
  transform: scaleX(-1);
}

.next-month:active {
  transform: scale(0.9);
}

@media only screen and (min-width: 1733px) {
  .top-month-selector {
    display: none;
  }
}
</style>
