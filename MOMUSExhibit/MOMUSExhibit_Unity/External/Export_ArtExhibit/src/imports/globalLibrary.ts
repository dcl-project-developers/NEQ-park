
//return the normaliced direction vector from point1 to point2
function directionVectorBetweenTwoPoints(point1: Vector3, point2: Vector3) {
    return Vector3.Normalize(new Vector3(point2.x - point1.x, point2.y - point1.y, point2.z - point1.z));
}

function lerp (start: float, end: float, amt: float){
  return (1-amt)*start+amt*end
}

function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num;
}

function randomIntFromInterval(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function millisToMinutesAndSeconds(millis: number) {
  var minutes = Math.floor(millis / 60000)
  var seconds = ((millis % 60000) / 1000)
  var secondsString = seconds.toFixed(0)
  return (minutes < 10 ? '0' : '')+ minutes + ":" + (seconds < 10 ? '0' : '') + secondsString;
}
function millisToMinutesAndSecondsAndMilis(millis: number) {
  var minutes = Math.floor(millis / 60000)
  var seconds = ((millis % 60000) / 1000)
  var secondsString = seconds.toFixed(0)
  return (minutes < 10 ? '0' : '')+ minutes + ":" + (seconds < 10 ? '0' : '') + secondsString + ":" + (millis % 1000);
}

function millisToMillisAndSeconds(millis: number) {
  var seconds = Math.floor(millis / 1000)
  var secondsString = seconds.toFixed(0)
  return (seconds < 10 ? '0' : '') + secondsString + ":"+(millis % 1000);
}
function millisToSeconds(millis: number) {
  var seconds = Math.floor(millis / 1000)
  var secondsString = seconds.toFixed(0)
  return (seconds < 10 ? '0' : '') + secondsString;
}
