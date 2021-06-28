<template>
  <div>
    <div class="side-month-selector">
      <div>
        <div class="year-selector">
          <button href="#" @click="previousYear()" class="previous-year">
            <img src="../../assets/arrow.png" alt="" />
          </button>
          <div class="year" v-bind="currentYear">{{ currentYear }}</div>
          <button href="#" @click="nextYear()" class="next-year">
            <img src="../../assets/arrow.png" alt="" />
          </button>
        </div>
      </div>
      <div class="months">
        <ul>
          <li><button @click="changeMonth(0)" id="0">Janeiro</button></li>
          <li><button @click="changeMonth(1)" id="1">Fevereiro</button></li>
          <li><button @click="changeMonth(2)" id="2">Março</button></li>
          <li><button @click="changeMonth(3)" id="3">Abril</button></li>
          <li><button @click="changeMonth(4)" id="4">Maio</button></li>
          <li><button @click="changeMonth(5)" id="5">Junho</button></li>
          <li><button @click="changeMonth(6)" id="6">Julho</button></li>
          <li><button @click="changeMonth(7)" id="7">Agosto</button></li>
          <li><button @click="changeMonth(8)" id="8">Setembro</button></li>
          <li><button @click="changeMonth(9)" id="9">Outubro</button></li>
          <li><button @click="changeMonth(10)" id="10">Novembro</button></li>
          <li><button @click="changeMonth(11)" id="11">Dezembro</button></li>
        </ul>
      </div>
    </div>
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
      currentYear: null,
      currentMonth: null,
      currentMonthNumber: null,
    };
  },
  methods: {
    getCurrentYear: function() {
      return new Date().getFullYear();
    },
    nextYear: function() {
      this.currentYear += 1;
      this.$emit("update", {
        year: this.currentYear,
        month: this.currentMonthNumber,
      });
    },
    previousYear: function() {
      this.currentYear -= 1;
      this.$emit("update");
      this.$emit("update", {
        year: this.currentYear,
        month: this.currentMonthNumber,
      });
    },
    getCurrentMonth: function() {
      return new Date().getMonth();
    },
    changeMonth: function(month) {
      this.currentMonth = this.months[month];
      this.currentMonthNumber = month;
      for (var i = 0; i < 12; ++i) {
        document.getElementById(i.toString()).className =
          i == month ? "active-month" : "";
      }
      this.$emit("update", {
        year: this.currentYear,
        month: this.currentMonthNumber,
      });
    },
  },
  created() {
    this.currentYear = this.getCurrentYear();
    this.currentMonthNumber = this.getCurrentMonth();
    this.currentMonth = this.months[this.getCurrentMonth()];
  },
  mounted() {
    this.$nextTick(function() {
      document.getElementById(this.currentMonthNumber.toString()).className =
        "active-month";
    });
  },
};
</script>

<style>
.side-month-selector {
  float: left;
  background-color: #b2dfdb;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
  width: 15%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  text-align: center;
  padding: 19px 0px;
}

.side-month-selector::-webkit-scrollbar {
  width: 10px;
}

.side-month-selector::-webkit-scrollbar-track {
  background: #b2dfdb;
}

.side-month-selector::-webkit-scrollbar-thumb {
  background: #788c8a;
  border-radius: 20px;
}

.months {
  text-align: center;
  font-size: 1.8em;
  font-weight: 600;
}

.months ul li {
  padding: 0px;
}

.months ul li button {
  background-color: #b2dfdb;
  border: none;
  width: 100%;
  font-size: 1.05em;
  font-weight: 600;
  color: #2c3e50;
  padding: 17px 0px;
}

.months ul li button:hover {
  background-color: #e5ffff75;
}

.active-month {
  background-color: #5ca8a83b !important;
}

.year-selector {
  display: table;
  font-size: 3em;
  font-weight: 600;
  padding: 20px 0px;
  width: 100%;
}

.previous-year {
  display: table-cell;
  float: right;
  text-decoration: none;
  transition: transform 100ms ease-in-out;
  background-color: #b2dfdb;
  border: none;
}

.previous-year:active {
  transform: scale(0.9);
}

.previous-year img {
  opacity: 0.7;
}
.year {
  display: table-cell;
  width: 50%;
  padding: 0px 30px;
  text-align: center;
}

.next-year {
  display: table-cell;
  float: left;
  text-decoration: none;
  transition: transform 100ms ease-in-out;
  background-color: #b2dfdb;
  border: none;
}

.next-year:active {
  transform: scale(0.9);
}

.next-year img {
  opacity: 0.7;
  transform: scaleX(-1);
}

@media only screen and (max-width: 1733px) {
  .side-month-selector {
    display: none;
  }
}
</style>
