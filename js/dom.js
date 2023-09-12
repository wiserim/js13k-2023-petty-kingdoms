/**
 * @function
 * @name el
 * 
 * Select HTML element / elements by query selector.
 * @param {string} selector - Query selector
 * 
 * @param {bool|number} [all=0] - Select all flag
 * 
 * @return {HTMLElement|null} - Selected HTML element
 */
function el(selector, all) {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector)
}

/**
 * @function
 * @name c
 * 
 * Add / remove class from element.
 * 
 * @param {HTMLElement} el - HTML element
 * @param {string} className - Class to add / remove
 * @param {bool|number} [remove=0] - Remove class flag
 */
function c(el, className, remove) {
    remove ? el.classList.remove(className) : el.classList.add(className)
}

/**
 * @function
 * @name attr
 * 
 * Get / set attribute to HTML element.
 * 
 * @param {HTMLElement} el - HTML element
 * @param {string} attribute - Attribute name
 * @param {string} [value] - Attribute value to set
 * 
 * @return {string|undefined} - Attribute value (if value param not provided)
 */
function attr(el, attribute, value = null) {
    return value !== null ? el.setAttribute(attribute, value) : el.getAttribute(attribute)
}

/**
 * @function
 * @name txt
 * 
 * Set innerHTML value (el.innerHTML alias).
 * 
 * @param {HTMLElement} el - HTML element
 * @param {string} value - Text / HTML code to set
 */
function txt(el, value) {
    el.innerHTML = value
}

/**
 * @function
 * @name on
 * 
 * AddEventListener alias.
 * 
 * @param {HTMLElement} el - HTML element
 * @param {string} event - Event name
 * @param {function} callback - Event handler
 */
function on(el, event, callback) {
    el.addEventListener(event, callback)
}
