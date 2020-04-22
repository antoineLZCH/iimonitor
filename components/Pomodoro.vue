<template>
  <v-card>
    <v-card-title>
      <div id="timer" class="flex text-center">
        <span id="minutes">{{ minutes }}</span>
        <span id="middle">:</span>
        <span id="seconds">{{ seconds }}</span>
      </div>
    </v-card-title>
    <v-card-actions class="justify-center">
      <v-btn v-if="!timer" @click="startTimer">GO</v-btn>
      <v-btn v-if="timer" @click="stopTimer">
        <v-icon>pause</v-icon>
      </v-btn>
      <v-btn v-if="resetButton" @click="resetTimer">
        <v-icon>replay</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      totalTime: 25 * 60,
      resetButton: false
    };
  },
  computed: {
    minutes: function() {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds: function() {
      const seconds = this.totalTime - this.minutes * 60;
      return this.padTime(seconds);
    }
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => this.countdown(), 1000);
      this.resetButton = true;
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
    },
    resetTimer() {
      this.totalTime = 25 * 60;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
    },
    padTime(time) {
      return (time < 10 ? "0" : "") + time;
    },
    countdown() {
      if (this.totalTime >= 1) this.totalTime--;
      else {
        this.totalTime = 0;
        this.resetTimer();
      }
    }
  }
};
</script>
