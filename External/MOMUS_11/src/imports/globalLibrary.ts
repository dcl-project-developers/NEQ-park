
//return the normaliced direction vector from point1 to point2
function directionVectorBetweenTwoPoints(point1: Vector3, point2: Vector3) {
    return Vector3.Normalize(new Vector3(point2.x - point1.x, point2.y - point1.y, point2.z - point1.z));
}

function lerp (start: float, end: float, amt: float){
  return (1-amt)*start+amt*end
}

function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
