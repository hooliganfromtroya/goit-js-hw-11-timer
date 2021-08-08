class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = document.querySelector(selector);
    this.daysSelector = this.selector.querySelector('[data-value="days"]');
    this.hoursSelector = this.selector.querySelector('[data-value="hours"]');
    this.minsSelector = this.selector.querySelector('[data-value="mins"]');
    this.secsSelector = this.selector.querySelector('[data-value="secs"]');

    this.interval = null;
    this.targetDate = targetDate;
  }

  nonZeroValue(value) {
    return value <= 0 ? 0 : value
  }

  getTimeToTargetDate() {
    const currentDate = Date.now();
    const targetDate = this.targetDate.getTime();
    const diff = targetDate - currentDate;

    const date = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      secs: Math.floor((diff % (1000 * 60)) / 1000)
    }

    this.renderTime(date);

    if (Object.keys(date).every(val => date[val] <= 0)) {
      clearInterval(this.interval);
    }
  }

  renderTime({ days, hours, mins, secs }) {
    this.daysSelector.textContent = this.nonZeroValue(days);
    this.hoursSelector.textContent = this.nonZeroValue(hours);
    this.minsSelector.textContent = this.nonZeroValue(mins);
    this.secsSelector.textContent = this.nonZeroValue(secs);
  }

  init() {
    this.interval = setInterval(this.getTimeToTargetDate.bind(this), 1000);
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("08/21/2021"),
});

timer.init();
