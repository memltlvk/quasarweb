export function functionExec (functionName, paramsArray, baseParameter) {
  if (functionName === "linear") {
    return linear.apply(baseParameter,paramsArray);
  }

  if (functionName === "stringval") {
    return stringval.apply(baseParameter,paramsArray);
  }
}

function linear(x1,y1,x2,y2,unit) {
  // Linear function
  let fslope = (y2 - y1) / (x2 - x1);
  let fconstant = y1 - fslope * x1;

  let y = fslope * this + fconstant;

  return y.toString() + unit;
}

function stringval(val) {
  // String function
  return val;
}
