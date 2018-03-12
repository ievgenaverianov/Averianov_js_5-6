var oTimer = {

  iStartTime: 0,
  iTimeNow: 0,
  iPrintTime: 0,
  iStopTime: 0,
  iSplitTime: 0,
  timerId: 0,
  bActiveTimer: false,


  /**
   * sets timer's time of start
   */
  startTimer: function () {
    iStartTime = Date.now() - this.iPrintTime;
  },

  /**
   * sets time since timer was started
   * @returns {number} shows time since timer was started
   */
  getTime: function () {
    var iTimeNow = Date.now();
    return iTimeNow - iStartTime;
  },

  /**
   * prints time every 1 msec since timer was started
   */
  printTime: function () {
    this.startTimer();
    this.getTime();
    timerId = setInterval(function () {
      var mlsec = oTimer.getTime();
      var sec = new Date(mlsec);
      document.querySelector('.timestring').innerHTML = oTimer.checkTime((sec.getHours() - 2)) + ':' + oTimer.checkTime(sec.getMinutes()) + ':' + oTimer.checkTime(sec.getSeconds()) + '.' + oTimer.checkTimeMsec(sec.getMilliseconds());
    }, 1);
    this.bActiveTimer = true;
    document.querySelector('.startbtn').style.display = 'none';
    document.querySelector('.pausebtn').style.display = 'inline-block';
  },

  /**
   * pauses timer and prints to the new string below the time since timer's start till pause
   */
  pauseTimer: function () {
    clearInterval(timerId);
    this.iPrintTime = this.getTime();
    iPausedTime = document.createElement('li');
    var mlsec = oTimer.getTime() - this.iStopTime;
    var sec = new Date(mlsec);
    iPausedTime.innerHTML = 'Stop: ' + oTimer.checkTime((sec.getHours() - 2)) + ':' + oTimer.checkTime(sec.getMinutes()) + ':' + oTimer.checkTime(sec.getSeconds()) + '.' + oTimer.checkTimeMsec(sec.getMilliseconds());
    document.querySelector('.printedtime').appendChild(iPausedTime);
    this.iStopTime = this.getTime();
    this.iSplitTime = this.getTime();
    this.bActiveTimer = false;
    document.querySelector('.startbtn').style.display = 'inline-block';
    document.querySelector('.pausebtn').style.display = 'none';
  },

  /**
   * splits time while timer is running
   */
  splitTime: function () {
    if (this.bActiveTimer) {
      var iSplitedTime = document.createElement('li');
      var mlsec = oTimer.getTime() - this.iSplitTime;
      var sec = new Date(mlsec);
      iSplitedTime.innerHTML = 'Split: ' + oTimer.checkTime((sec.getHours() - 2)) + ':' + oTimer.checkTime(sec.getMinutes()) + ':' + oTimer.checkTime(sec.getSeconds()) + '.' + oTimer.checkTimeMsec(sec.getMilliseconds());
      document.querySelector('.printedtime').appendChild(iSplitedTime);
      this.iSplitTime = this.getTime();
    }
  },

  /**
   * resets timer, sets all variables to the start values
   */
  resetTimer: function () {
    clearInterval(timerId);
    this.iStartTime = 0;
    this.iTimeNow = 0;
    this.iPrintTime = 0;
    this.iStopTime = 0;
    this.iSplitTime = 0;
    this.bActiveTimer = false;
    document.querySelector('.timestring').innerHTML = "00:00:00.000";
    document.querySelector('.startbtn').style.display = 'inline-block';
    document.querySelector('.pausebtn').style.display = 'none';

    var sTimeList = document.querySelector('.printedtime');
    while (sTimeList.hasChildNodes()) {
      sTimeList.removeChild(sTimeList.firstChild);
    }
  },

  /**
   * sets hours, minutes and seconds with leading zero
   * @param i - counter
   * @returns {*} - hours, minutes and seconds
   */
  checkTime: function (i){
    if (i<10) {
      i="0" + i;
    }
    return i;
  },

  /**
   * sets miliseconds with leading zero
   * @param i - counter
   * @returns {*} - miliseconds
   */
  checkTimeMsec: function(i) {
    if (i<100 && i>10) {
      i="0" + i;
    } else if (i<10) {
      i="00" + i;
    }
    return i;
  }

}

document.querySelector('.startbtn').addEventListener('click', function () {
  oTimer.printTime();
});
document.querySelector('.pausebtn').addEventListener('click', function () {
  oTimer.pauseTimer();
});
document.querySelector('.resetbtn').addEventListener('click', function () {
  oTimer.resetTimer();
});
document.querySelector('.splitbtn').addEventListener('click', function () {
  oTimer.splitTime();
});