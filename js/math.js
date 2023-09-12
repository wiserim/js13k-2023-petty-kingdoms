/**
 * @function
 * @name rand
 * 
 * Generate a random number in provided scope.
 * 
 * @param {number} min - Minimal value
 * @param {number} max - Maximal value
 * 
 * @return {number} - Random number
 */
function rand(min, max) {
    return min + Math.floor(Math.random() * (max - min))
}

/**
 * @function
 * @name distance
 * 
 * Calculate distance between points.
 * 
 * @param {number} x1 - Point 1 x position
 * @param {number} y1 - Point 1 y position
 * @param {number} x2 - Point 2 x position
 * @param {number} y2 - Point 2 y position
 * 
 * @return {number} - Distance between points
 */
function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

/**
 * @function
 * @name shuffle
 * 
 * Returns array with elements in random order.
 * 
 * @param {array} min - array to shuffle
 * 
 * @return {array} - Array with elements in random order
 */
function shuffle(a) {
    return a.sort((a, b) => 0.5 - Math.random())
}
