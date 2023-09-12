/**
 * @classdesc
 * @class Player
 * 
 * Player class
 * 
 * @constructor
 *
 * @param {number} id - Player's id
 * @param {string} name - Player's name
 * @param {string} color - Player's color: available formats: #rrggbb, rgb(), rgba()
 */
class Player {
    constructor(id, name, color) {
        let t = this;
        /**
        * @name Player#id
        * @type {number}
        * 
        * Player's id
        */
        t.id = id;
        /**
        * @name Player#name
        * @type {string}
        * 
        * Player's name
        */
        t.name = name;
        /**
        * @name Player#color
        * @type {string}
        * 
        * Player's color: available formats: #rrggbb, rgb(), rgba()
        */
        t.color = color;
        /**
        * @name Player#gold
        * @type {number}
        * 
        * Player's gold
        */
        t.gold = 10;
        /**
        * @name Player#regions
        * @type {array}
        * 
        * Array of player's regions
        */
        t.regions = [];
        /**
        * @name Player#active
        * @type {number}
        * 
        * Player's active flag.
        */
        t.active = 1;
        /**
        * @name Player#ai
        * @type {string}
        * 
        * Player's ai flag. If set 1, player is controlled by AI.
        */
        t.ai = 0;
    }

    /**
    * @name Player#income
    * @type {number}
    * @readonly
    * 
    * Player's income
    */
    get income() {
        let income = 0;

        for(let region of this.regions) {
           income += region.income;
        }
        return income;
    }
}
