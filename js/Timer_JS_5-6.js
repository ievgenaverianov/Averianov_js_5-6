var oTimer = {

  iStartTime: 0,
  iTimeNow: 0,
  iPrintTime: 0,
  iStopTime: 0,
  iSplitTime: 0,
  iTimerId: 0,
  bActiveTimer: false,

  /**
   * sets timer's time of start
   */
  startTimer: function () {
    this.iStartTime = Date.now() - this.iPrintTime;
  },

  /**
   * sets time since timer was started
   * @returns {number} shows time since timer was started
   */
  getTime: function () {
    var iTimeNow = Date.now();
    return iTimeNow - this.iStartTime;
  },

  /**
   * formats date to hours : minutes : seconds . miliseconds
   * @param oDate - date to format
   * @returns {string} - formats date to hours : minutes : seconds . miliseconds string
   */
  formatTime: function (oDate) {
    return this.ensureLeadingZeros(oDate.getUTCHours(), 2) + ':' + this.ensureLeadingZeros(oDate.getMinutes(), 2) + ':'
      + this.ensureLeadingZeros(oDate.getSeconds(), 2) + '.' + this.ensureLeadingZeros(oDate.getMilliseconds(), 3);
  },

  /**
   * prints time every 1 msec since timer was started
   */
  printTime: function () {
    this.startTimer();
    this.iTimerId = setInterval(function () {
      this.iPrintTime = this.getTime();
      var iMlsec = this.iPrintTime;
      var oDateToPrint = new Date(iMlsec);
      document.querySelector('.timeString').innerHTML = this.formatTime(oDateToPrint);
    }.bind(this), 1);
    this.bActiveTimer = true;
    document.querySelector('.startBtn').style.display = 'none';
    document.querySelector('.pauseBtn').style.display = 'inline-block';
  },

  /**
   * pauses timer and prints to the new string below the time since timer's start till pause
   */
  pauseTimer: function () {
    clearInterval(this.iTimerId);
    iPausedTime = document.createElement('li');
    var iMlsec = this.iPrintTime - this.iStopTime;
    var oDateToPrint = new Date(iMlsec);
    iPausedTime.innerHTML = 'Stop: ' + this.formatTime(oDateToPrint);
    document.querySelector('.printedTime').appendChild(iPausedTime);
    this.iStopTime = this.iPrintTime;
    this.iSplitTime = this.iPrintTime;
    this.bActiveTimer = false;
    document.querySelector('.startBtn').style.display = 'inline-block';
    document.querySelector('.pauseBtn').style.display = 'none';
  },

  /**
   * splits time while timer is running and prints splited time to the new string below
   */
  splitTime: function () {
    if (this.bActiveTimer) {
      var oSplitedTimeLine = document.createElement('li');
      var iMlsec = this.getTime() - this.iSplitTime;
      var oDateToPrint = new Date(iMlsec);
      this.formatTime(oDateToPrint);
      oSplitedTimeLine.innerHTML = 'Split: ' + this.formatTime(oDateToPrint);
      document.querySelector('.printedTime').appendChild(oSplitedTimeLine);
      this.iSplitTime = this.getTime();
    }
  },

  /**
   * resets timer, sets all variables to the start values
   */
  resetTimer: function () {
    clearInterval(this.iTimerId);
    this.iStartTime = 0;
    this.iTimeNow = 0;
    this.iPrintTime = 0;
    this.iStopTime = 0;
    this.iSplitTime = 0;
    this.bActiveTimer = false;

    document.querySelector('.timeString').innerHTML = "00:00:00.000";
    document.querySelector('.startBtn').style.display = 'inline-block';
    document.querySelector('.pauseBtn').style.display = 'none';

    var sTimeList = document.querySelector('.printedTime');
    while (sTimeList.hasChildNodes()) {
      sTimeList.removeChild(sTimeList.firstChild);
    }
  },

  /**
   * sets hours, minutes, seconds and milliseconds with leading zeros
   * @param iValue - number to format
   * @param iNumberOfDigits - resulting number of digits including leading zeros
   * @returns {string} - hours, minutes, seconds and milliseconds with leading zeros
   */
  ensureLeadingZeros: function (iValue, iNumberOfDigits){
    var sValue = '' + iValue;
    var aLeadingZeros = [];
    for (var i = 0; i < (iNumberOfDigits - sValue.length); i++) {
      aLeadingZeros.push('0');
    }
    var sLeadingZeros = aLeadingZeros.join('');
    return sLeadingZeros + sValue;
  }
}

document.querySelector('.startBtn').addEventListener('click', function () {
  oTimer.printTime();
});
document.querySelector('.pauseBtn').addEventListener('click', function () {
  oTimer.pauseTimer();
});
document.querySelector('.resetBtn').addEventListener('click', function () {
  oTimer.resetTimer();
});
document.querySelector('.splitBtn').addEventListener('click', function () {
  oTimer.splitTime();
});