class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  getTimeToTargetDate() {
    const currentDate = Date.now();
    const targetDate = this.targetDate.getTime();
    const difference = targetDate - currentDate;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((difference % (1000 * 60)) / 1000);

    const result = {
      days,
      hours,
      mins,
      secs,
    };
    this.renderTime(result);
  }

  renderTime({ days, hours, mins, secs }) {
    const container = document.querySelector(this.selector);
    const daysSelector = container.querySelector('[data-value="days"]');
    const hoursSelector = container.querySelector('[data-value="hours"]');
    const minsSelector = container.querySelector('[data-value="mins"]');
    const secsSelector = container.querySelector('[data-value="secs"]');

    daysSelector.textContent = days;
    hoursSelector.textContent = hours;
    minsSelector.textContent = mins;
    secsSelector.textContent = secs;
  }

  init() {
    setInterval(this.getTimeToTargetDate.bind(this), 1000);
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("12/31/2021"),
});

timer.init();
