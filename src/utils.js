
/**
 * Checks if a given value is an Number or not
 * @param {Any} val
 * @returns Boolean
 */
export function isPositiveNumber(val) {
  return typeof val == "number" && val >= 0;
}

/**
 * Checks if a given value is a String or not
 * @param {Any} val 
 * @returns Boolean
 */
export function isString(val){
    return typeof val === "string"
}
