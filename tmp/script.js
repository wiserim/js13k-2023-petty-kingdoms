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
/**
 * @function
 * @name toggleFullScreen
 * 
 * Toggle fullscreen mode.
 */
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.body.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

/**
 * @function
 * @name updateGameOptionsPlayerBtn
 * 
 * Update game options player button.
 */
function updateGameOptionsPlayerBtn(el) {
    let value = (attr(el, 'data-player') + 1) % 3;
    attr(el, 'data-player', value);

    switch(value) {
        case 0:
            txt(el, 'Disabled');
            break;
        case 1:
            txt(el, 'Player');
            break;
        case 2:
            txt(el, 'CPU');
    }    
}

/**
 * @function
 * @name updateGameOptionsMapBtn
 * 
 * Update game options player button.
 */
function updateGameOptionsMapBtn(el) {
    let value = attr(el, 'data-map-size') % 3 + 1;
    attr(el, 'data-map-size', value);

    switch(value) {
        case 1:
            txt(el, '10 regions');
            break;
        case 2:
            txt(el, '16 regions');
            break;
        case 3:
            txt(el, '36 regions');
    }    
}

/**
 * @function
 * @name updatePlayerUi
 * 
 * Update player UI.
 */
function updatePlayerUi() {
    txt(playerName, activePlayer.name);
    txt(turnCount, turn);
    attr(playerShield, 'fill', activePlayer.color)

    updateResourcesUi();
}

/**
 * @function
 * @name updateResourcesUi
 * 
 * Update resources UI.
 */
function updateResourcesUi() {
    txt(gold, activePlayer.gold);
    txt(goldIncome, activePlayer.income);
}

/**
 * @function
 * @name updateRegionUi
 * 
 * Update region UI.
 */
function updateRegionUi() {
    txt(regionName, activeRegion ? activeRegion.name : '');
    txt(regionArmy, activeRegion ? activeRegion.army: '');
    txt(regionActiveArmy, activeRegion ? activeRegion.activeArmy: '');
    attr(regionBuyArmyInput, 'max', activeRegion ? activePlayer.gold : 0);
    txt(regionSendArmyMax, activeRegion ? activeRegion.activeArmy : 0);
    attr(regionSendArmyInput, 'max', activeRegion ? activeRegion.activeArmy : 0);
}

/**
 * @function
 * @name enableSendArmy
 * 
 * Enable send army mode. Allows to send army from active region to it's regions.
 */
function enableSendArmy() {
    if(regionSendArmyInput.value <= 0)
        return;
    
    sendArmyFlag = 1;
    attr(map, 'data-send-army', 1);
    c(regionSendArmyCancelBtn, 'd-none', 1);
    for(let region of regions) {
        region === activeRegion || activeRegion.neighbours.has(region) ? attr(region.territory, 'data-target', 1) : 0
    }
}

/**
 * @function
 * @name disableSendArmy
 * 
 * Disable send army mode.
 */
function disableSendArmy() {
    sendArmyFlag = 0;
    attr(map, 'data-send-army', 0);
    c(regionSendArmyCancelBtn, 'd-none');
    for(let region of regions) {
        attr(region.territory, 'data-target', 0)
    }
}

/**
 * @function
 * @name openModal
 * 
 * Open modal.
 * 
 * @param {HTMLElement} modal - modal HTML element
 * @param {string} content - modal content
 */
function openModal(modal, content) {
    if(content)
        modal.querySelector('.modal-content').innerHTML = content;
    c(container, 'disabled')
    c(modal, 'open');
}

/**
 * @function
 * @name closeModal
 * 
 * Close modal.
 * 
 * @param {HTMLElement} modal - modal HTML element
 */
function closeModal(modal) {
    c(container, 'disabled', 1)
    c(modal, 'open', 1)
}

/**
 * @function
 * @name openBattleModal
 * 
 * Open battle modal.
 * 
 * @param {Player} attacker - Attacking player
 * @param {Player|null} defender - Defending player
 * @param {number} attackerArmy - Attacking army size
 * @param {Region} region - Target region
 */
function openBattleModal(attacker, defender, attackerArmy, region) {
    txt(battleRegion, region.name)
    txt(attName, attacker.name)
    txt(attArmy, attackerArmy)
    txt(defName, defender ? defender.name : 'Neutral')
    txt(defArmy, region.army)
    txt(attAdvantage, '\u00A0')
    txt(defAdvantage, '\u00A0')
    txt(battleResult, '\u00A0')
    openModal(battleModal)
}

/**
 * @function
 * @name closeBattleModal
 * 
 * Close battle modal.
 */
function closeBattleModal() {
    closeModal(battleModal)
    checkWinCondition();

    if(activePlayer.ai) {
        setTimeout(() => {
                aiEnd();
        }, 500);
    }
}
/**
 * @classdesc
 * @class Region
 * 
 * Region class
 * 
 * @constructor
 *
 * @param {number} id - Region's id
 */
class Region {
    constructor(id) {
        let t = this;
        /**
        * @name Region#_id
        * @type {number}
        * @private
        * 
        * Region's id
        */
        t._id;
        /**
        * @name Region#name
        * @type {string}
        * 
        * Region's name
        */
        t.name = 'city '+id;
        /**
        * @name Region#territory
        * @type {HTMLElement}
        * 
        * Region's path element used to display region on map
        */
        t.territory = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        /**
        * @name Region#city
        * @type {HTMLElement}
        * 
        * Element used to display region's army size
        */
        t.city = document.createElement('div');
        /**
        * @name Region#player
        * @type {Player|null}
        * 
        * Player owning region
        */
        t.player = null;
        /**
        * @name Region#color
        * @type {string}
        * 
        * Region's territory fill color
        */
        t.color = 'transparent';
        /**
        * @name Region#_army
        * @type {number}
        * @private
        * 
        * Region's army
        */
        t._army;
        /**
        * @name Region#army
        * @type {number}
        * 
        * Region's army
        */
        t.army = 5;
        /**
        * @name Region#army
        * @type {number}
        * 
        * Region's blocked army (unavailable to send to neighbouring region)
        */
        t.blockedArmy = 0;
        /**
        * @name Region#income
        * @type {number}
        * 
        * Region's gold income per turn
        */
        t.income = 3;
        /**
        * @name Region#neighbours
        * @type {Set}
        * 
        * Set of region's neighbours
        */
        t.neighbours = new Set();
        t.borders = [];

        /**
        * @name Region#id
        * @type {number}
        * 
        * Region's id
        */
        t.id = id;

        attr(t.territory, 'class', 'region');
        attr(t.territory, 'fill', 'transparent');
        c(t.city, 'city');

        on(t.territory, 'click', () => sendArmyFlag ? sendArmy(t) : selectRegion(t))
    }

    set id(id) {
        this._id = id;
        attr(this.territory, 'id', 'r'+id);
    }

    get id() {
        return this._id;
    }

    /**
    * @name Region#activeArmy
    * @type {number}
    * @readonly
    * 
    * Region's active army (available to send to neighbouring region)
    */
    get activeArmy() {
        return this.army - this.blockedArmy;
    }

    /**
    * @name Region#owner
    * @type {Player|null}
    * 
    * Region's owner
    */
    set owner(player) {
        let t = this;
        if(t.player)
            t.player.regions = t.player.regions.filter((el) => el !== t);
        t.player = player;
        player ? player.regions.push(t) : 0;
        attr(t.territory, 'fill', player ? player.color : 'transparent');
        attr(t.territory, 'data-player', player ? player.id : 0);
    }

    get owner() {
        return this.player
    }

    set army(army) {
        this._army = army;
        txt(this.city, army);
    }

    get army() {
        return this._army
    }

    /**
    * @method Region#generate
    * @memberof Region
    * 
    * Generate region's territory path based on mapArray.
    */
    generate() {
        let t = this,
            x1,
            x2,
            y1,
            y2,
            py1,
            py2,
            minY,
            maxY,
            mapTx = 10,
            mapTy = 10,
            tmpPath = '',
            tmpPath2 = '',
            topPath = '',
            bottomPath = '',
            leftPath = '',
            rightPath = '',
            path = '',
            column;
        
        t.borders = [];

        //map t.borders
        for(let x = 0; x < mapSize.x; x++) {
            let y1 = mapArray[x].indexOf(t.id),
                y2 = mapArray[x].lastIndexOf(t.id);

            if(y1 == -1)
                continue;

            t.borders.push({x: x, y1: y1, y2: y2});
        }

        minY = py1 = t.borders[0].y1;
        maxY = py2 = t.borders[0].y2;


        //generate path segments
        for(column of t.borders) {
            x1 = column.x * 10,
            x2 = x1 + 10,
            y1 = column.y1 * 10,
            y2 = (column.y2 + 1) * 10,
            tmpPath = '';

            //set min and max position
            minY = Math.min(minY, column.y1);
            maxY = Math.max(maxY, column.y2)
            
            //top path variation
            let increment = py1 - column.y1 < 0 ? 1 : -1;
            if(py1 - column.y1 != 0) {
                let tmpy1 = py1;

                while(tmpy1 != column.y1) {
                    let ty1 = tmpy1 * 10;

                    tmpPath += `L${x1+mapTx},${ty1+mapTy}L${x1 - 1 + mapTx},${ty1 + increment * 5 + mapTy}`;

                    tmpy1 += increment;
                }
            }

            topPath += `${tmpPath}L${x1+mapTx},${y1+mapTy}L${x1 + 5 + mapTx},${y1 + 1 + mapTy}L${x2 + mapTx},${y1 + mapTy}`;
            
            //bottom path variation
            tmpPath = '';
            increment = py2 - column.y2 < 0 ? 1 : -1;
            let i = 0;

            if(py2 - column.y2 != 0) {
                let tmpy2 = py2;

                while(tmpy2 != column.y2 && i < 10) {
                    let ty2 = tmpy2 * 10 + (increment > 0 ? 20 : 0);

                    tmpPath = ` L${x1+mapTx},${ty2+mapTy}L${x1 - 1 + mapTx},${ty2 - increment * 5 + mapTy} ` + tmpPath;

                    tmpy2 += increment;
                    i++;
                }
            }

            bottomPath = `L${x2+mapTx},${y2+mapTy}L${x2 - 5+mapTx},${y2 + 1+mapTy}L${x1+mapTx},${y2+mapTy}${tmpPath}` + bottomPath;

            py1 = column.y1;
            py2 = column.y2;
        }

        column = t.borders[0];
        x1 = column.x * 10;
        
        //left path
        for(let i = 0; i <= column.y2 - column.y1; i++) {
            y1 = (column.y2 - i) * 10;
            leftPath += `L${x1 - 1+mapTx},${y1 + 5+mapTy}L${x1+mapTx},${y1+mapTy}`;
        }

        //right path
        column = t.borders.slice(-1)[0];
        x2 = column.x * 10 + 10;

        for(let i = 0; i <= column.y2 - column.y1; i++) {
            y1 = (column.y1 + i) * 10;
            rightPath += `L${x2+mapTx},${y1+mapTy}L${x2 - 1+mapTx},${y1 + 5+mapTy}`;
        }

        path = `M${t.borders[0].x*10+mapTx},${t.borders[0].y1*10+mapTy}` + topPath + rightPath + bottomPath + leftPath + 'Z';
        
        attr(t.territory, 'd', path);

        //set city position
        t.city.style.left = ((t.borders[0].x + (t.borders.length-1) / 2 + 1) * 3.125) + '%';
        t.city.style.top = 'calc(10px + ' + ((minY + (maxY - minY) / 2 + 1) * 3.125) + '%)';
    }

    /**
    * @method Region#setNeighbours
    * @memberof Region
    * 
    * Update region's neighbours list
    */
    setNeighbours() {
        let t = this,
        i,
        column = t.borders[0];

        t.neighbours.clear();

        if(column.x > 0) {
            column.y1 > 0 ? t.neighbours.add(findRegion(mapArray[column.x - 1][column.y1 - 1])) : 0;
            column.y2 < mapArray[0].length - 1 ? t.neighbours.add(findRegion(mapArray[column.x - 1][column.y2 + 1])) : 0;

            for(i = column.y1; i <= column.y2; i++) {
                t.neighbours.add(findRegion(mapArray[column.x - 1][i]));
            }
        }

        for(column of t.borders) {
            column.y1 > 0 ? t.neighbours.add(findRegion(mapArray[column.x][column.y1 - 1])) : 0;
            column.y2 < mapArray[0].length - 1 ? t.neighbours.add(findRegion(mapArray[column.x][column.y2 + 1])) : 0;
        }

        if(column.x < mapArray.length - 1) {
            column.y1 > 0 ? t.neighbours.add(findRegion(mapArray[column.x + 1][column.y1 - 1])) : 0;
            column.y2 < mapArray[0].length - 1 ? t.neighbours.add(findRegion(mapArray[column.x + 1][column.y2 + 1])) : 0;

            for(i = column.y1; i <= column.y2; i++) {
                t.neighbours.add(findRegion(mapArray[column.x + 1][i]));
            }
        }
    }

    /**
    * @method Region#append
    * @memberof Region
    * 
    * Appends region to map (territory and city)
    */
    append() {
        map.prepend(this.territory);
        mapContainer.append(this.city);
    }

    /**
    * @method Region#remove
    * @memberof Region
    * 
    * Removes region from map (territory and city)
    */
    remove() {
        this.territory.remove();
        this.city.remove();
    }
}
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
/**
 * @function
 * @name aiStart
 * 
 * Start AI control for computer player. Invoked on start of turn.
 */
function aiStart() {
    let p = activePlayer,
        regions = shuffle(p.regions);

    //disable ui
    c(sidePanel, 'disabled');

    for(let region of regions) {
        let neighbours = region.neighbours.values();
        selectRegion(region)

        for(let neighbour of neighbours) {
            if(neighbour.player === p) {
                continue;
            }

            //recruit
            if(neighbour.army >= region.activeArmy) {
                regionBuyArmyInput.value = Math.min(region.army - neighbour.army + 1, p.gold);
                recruit();
                continue;
            }

            //attack
            let army = Math.min(Math.max(neighbour.army + 10, neighbour.army * 1.3), region.activeArmy);
            if(neighbour.player && !neighbour.player.ai) {
                regionSendArmyInput.value = army
                sendArmy(neighbour);
                return;
            }

            setTimeout(() => {
                aiAttack(neighbour, army);
            }, 500);
            return;
        }
    }

    aiEnd()
}

/**
 * @function
 * @name aiEnd
 * 
 * End AI control for computer player.
 */
function aiEnd() {
    let p = activePlayer,
        regions = shuffle(p.regions)

    if(p.gold) {
        for(let region of regions) {
            let neighbours = region.neighbours.values();

            for(let neighbour of neighbours) {
                if(neighbour.player !== p) {
                    regionBuyArmyInput.value = p.gold;
                    recruit();
                    //enable ui
                    c(sidePanel, 'disabled', 1);
                    endTurn();
                    return;
                }
            }
        }
    }
    
    //enable ui
    c(sidePanel, 'disabled', 1);
    endTurn();
}

/**
 * @function
 * @name aiAttack
 * 
 * Attack region without openning battle modal. Invoked when AI decide to attack region that doesn't belong to human player.
 * 
 * @param {Region} region - Target region
 * @param {number} army - Attacking army size
 */
function aiAttack(region, army) {
    let defArmy = region.army,
    defPlayer = region.player,
    attFactor = rand(1, 6),
    defFactor = rand(1, 6),
    attAdvantageMultiplier = Math.max(attFactor - defFactor, 0),
    defAdvantageMultiplier = Math.max(defFactor - attFactor, 0),
    result = calculateBattle(army, defArmy, attAdvantageMultiplier/10, defAdvantageMultiplier/10);

    region.army = result.defArmy;
    //activeRegion.army -= result.attArmy;

    if(region.army < 1 && army > 0) {
        region.owner = activePlayer;
        region.army = result.attArmy;
        region.blockedArmy = result.attArmy;

        activeRegion.army -= result.attArmy;

        if(defPlayer) {
            defPlayer.active = defPlayer.regions.length ? 1 : 0
            checkWinCondition();
        }
    }
    else {
        activeRegion.army -= result.attArmy;
        activeRegion.blockedArmy -= result.attArmy;
    }

    updateRegionUi();

    aiEnd();
}
/**
 * @function
 * @name genetateMap
 * 
 * Generates new map according to options set in menu screen.
 * Fills mapArray by finding closest region's seed.
 */
function genetateMap() {
    let seeds = [],
        regionsCount = 0,
        names = [];

    //clear map
    for(let region of regions) {
        region.remove();
    }
    //move regions to regions pool
    regionsPool = regionsPool.concat(regions);
    //clear regions array
    regions.splice(0,regions.length);
    //sort regions pool
    regionsPool.sort((a,b) => a.id < b.id)

    mapArray = Array(mapSize.x);
    for (let i = 0; i < mapArray.length; i++) {
        mapArray[i] = new Array(mapSize.y);
    }

    //set regions seeds
    switch(parseInt(attr(gameOptionsMapBtn, 'data-map-size'))) {
        //10 regions
        case 1:
            regionsCount = 10;
            seeds = [
                {id: 1, x: rand(1,4), y: rand(1,4)},
                {id: 2, x: rand(25,28), y: rand(1,4)},
                {id: 3, x: rand(1,4), y: rand(25,28)},
                {id: 4, x: rand(25,28), y: rand(25,28)},
                {id: 5, x: rand(1,4), y: rand(6,23)},
                {id: 6, x: rand(6,23), y: rand(1,4)},
                {id: 7, x: rand(25,28), y: rand(6,23)},
                {id: 8, x: rand(6,23), y: rand(25,28)},
                {id: 9, x: rand(6,23), y: rand(6,13)},
                {id: 10, x: rand(6,23), y: rand(13,23)}
            ];
            break;
        //16 regions
        case 2:
            regionsCount = 16;
            seeds = generateSeeds(
                regionsCount, 
                [
                    [1,4],
                    [6,13],
                    [16,23],
                    [25,28]
                ],
                [
                    [0,0],
                    [3,0],
                    [0,3],
                    [3,3]
                ]);
            break;
        //36 regions
        case 3:
            regionsCount = 36;
            seeds = generateSeeds(
                regionsCount, 
                [
                    [1,4],
                    [6,9],
                    [11,14],
                    [16,19],
                    [21,24],
                    [26,28]
                ],
                [
                    [0,0],
                    [5,0],
                    [0,5],
                    [5,5]
                ]);
            break;
    }

    names = shuffle(regionNames);

    //generate regions
    for(let i = 0; i < regionsCount; i++) {
        let region;
        if(regionsPool.length) {
            region = regionsPool.shift();
        }
        else {
            region = new Region(i + 1);
        }

        region.name = names[i];
        region.append();
        regions.push(region);
    }

    //Fill mapArray, by finding closest region's seed.
    for(let x = 0; x < mapSize.x; x++) {
        for(let y = 0; y < mapSize.y; y++) {
            let distances = [];
            for(let seed of seeds) {
                distances.push(distance(seed.x, seed.y, x, y));
            }

            let closest = seeds[distances.indexOf(Math.min(...distances))];
            mapArray[x][y] = closest.id;
        }
    }
}

/**
 * @function
 * @name genetateSeeds
 * 
 * Generates seeds for each region.
 * 
 * @param {number} regionsCount - Number of regions
 * @param {array} scopes - array of scopes defining min. and max. coordinates of seeds
 * @param {array} excludedCoords - array of exluded (already taken) pairs of scopes
 * 
 * @return {array} - Array of seeds for generated regions
 */
function generateSeeds(regionsCount, scopes, excludedCoords) {
    let seeds = [
            {id: 1, x: rand(1,4), y: rand(1,4)},
            {id: 2, x: rand(25,28), y: rand(1,4)},
            {id: 3, x: rand(1,4), y: rand(25,28)},
            {id: 4, x: rand(25,28), y: rand(25,28)}
        ],
        coords = [1,0];

    for(let i = 5; i <= regionsCount; i++) {
        if(excludedCoords.some(r=> r[0] === coords[0] && r[1] === coords[1])) {
            let x = (coords[0] + 1) % scopes.length,
                y = coords[0] > scopes.length - 2 ? coords[1] + 1 : coords[1]
            coords = [x,y];
        }

        seeds.push({
            id: i,
            x: rand(scopes[coords[0]][0], scopes[coords[0]][1]),
            y: rand(scopes[coords[1]][0], scopes[coords[1]][1])
        });

        let x = (coords[0] + 1) % scopes.length,
            y = coords[0] > scopes.length - 2 ? coords[1] + 1 : coords[1]
        coords = [x,y];
    }


    return seeds;
}

/**
 * @function
 * @name generateRegionNames
 * 
 * Generates set of region names.
 */
function generateRegionNames() {
    let namePrefixes = [
        'Wheat',
        'Barley',
        'Bread',
        'Cheese',
        'Beet',
        'Turnip',
        'Bean',
        'Cow',
        'Sheep',
        'Chicken',
        'Apple',
        'Pear',
        'Cherry'
    ],
    nameSuffixes = [
        '',
        'town',
        'field',
        'ford',
        'shire',
        'borough',
        ' Castle',
    ];

    for(let namePrefix of namePrefixes) {
        for(let nameSuffix of nameSuffixes) {
            regionNames.push(namePrefix+nameSuffix);
        }
    }
}
/**
 * @function
 * @name findRegion
 * 
 * Get region by id.
 * 
 * @param {number} id - Region's id
 * 
 * @return {Region|null}
 */
function findRegion(id) {
    return regions.find((region) => region.id === id);
}

/**
 * @function
 * @name selectRegion
 * 
 * Set region as selected and active.
 * 
 * @param {Region} region - Selected region
 */
function selectRegion(region) {
    if(!activePlayer.regions.includes(region))
        return;

    activeRegion ? attr(activeRegion.territory, 'class', 'region') : 0;
    activeRegion = region;
    attr(activeRegion.territory, 'class', 'region active');
    
    //reset inputs
    regionBuyArmyInput.value = 0;
    txt(regionBuyArmyAmount, 0);

    regionSendArmyInput.value = 0;
    txt(regionSendArmyAmount, 0)

    //put region on top
    attr(mapActiveRegion, 'xlink:href', '#r'+activeRegion.id);

    updateRegionUi()
}

/**
 * @function
 * @name recruit
 * 
 * Recruit army for a region. Increase region's army for gold.
 */
function recruit() {
    if(!activePlayer || !activeRegion)
        return;

    let recruit = Math.min(regionBuyArmyInput.value, activePlayer.gold);
    activePlayer.gold -= recruit;
    activeRegion.army += recruit;
    activeRegion.blockedArmy += recruit;

    //reset inputs
    regionBuyArmyInput.value = 0;
    txt(regionBuyArmyAmount, 0);

    updateRegionUi()
    updateResourcesUi()
}

/**
 * @function
 * @name sendArmy
 * 
 * Send army to a region. Attacks region if it's not belong to active player.
 * 
 * @param {Region} region - Target region
 */
function sendArmy(region) {
    if(activeRegion === region) {
        disableSendArmy();
        return;
    }

    if(!activeRegion.neighbours.has(region))
        return;

    disableSendArmy();

    if(!activePlayer || !activeRegion)
        return;

    let army = Math.min(regionSendArmyInput.value, activeRegion.activeArmy);
    activeRegion.army -= army;

    if(region.player === activeRegion.player) {
        region.army += army;
        region.blockedArmy += army;
    }
    else {
        attack(region, army)
    }

    //reset inputs
    regionSendArmyInput.value = 0;
    txt(regionSendArmyAmount, 0);
    updateRegionUi()
}

/**
 * @function
 * @name attack
 * 
 * Attack region. Shows battle modal. 
 * 
 * @param {Region} region - Target region
 * @param {number} attackerArmy - Attacking army size
 */
function attack(region, army) {
    let defArmy = region.army,
    defPlayer = region.player;

    openBattleModal(activePlayer, defPlayer, army, region)

    for(let i = 1; i < 5; i++) {
        setTimeout(() => {
            attFactor = rand(1, 6)
            defFactor = rand(1, 6)
            attr(attDice, 'data-value', attFactor)
            attr(defDice, 'data-value', defFactor)

            if(i > 3) {
                let attAdvantageMultiplier = Math.max(attFactor - defFactor, 0),
                    defAdvantageMultiplier = Math.max(defFactor - attFactor, 0),
                    result = calculateBattle(army, defArmy, attAdvantageMultiplier/10, defAdvantageMultiplier/10);
                txt(attAdvantage, attAdvantageMultiplier > 0 ? `<b>Advantage:</b> +${attAdvantageMultiplier * 10}%` : '&nbsp;');
                txt(defAdvantage, defAdvantageMultiplier > 0 ? `<b>Advantage:</b> +${defAdvantageMultiplier * 10}%` : '&nbsp;');

                region.army = result.defArmy;
                army = result.attArmy;

                if(region.army < 1 && army > 0) {
                    txt(battleResult, `${activePlayer.name} won!`)
                    region.owner = activePlayer;
                    region.army = army;
                    region.blockedArmy = army;

                    if(defPlayer) {
                        defPlayer.active = defPlayer.regions.length ? 1 : 0
                    }
                }
                else {
                    txt(battleResult, `${defPlayer ? defPlayer.name : 'Neutral'} won!`)
                    activeRegion.army += army;
                    activeRegion.blockedArmy += army;
                }

                updateRegionUi();
            }
        }, 500 + 200 * i);
    }
}

/**
 * @function
 * @name startGame
 * 
 * Start game based on game options set in menu screen.
 */
function startGame() {
    c(menuScreen, 'd-none');
    c(gameScreen, 'd-none', 1);
    
    //generate map
    genetateMap();

    for(let region of regions) {
        region.army = 5;
        region.generate();
        region.setNeighbours();
        region.owner = null;
    }

    for(let i = 0, iLenght = players.length; i < iLenght; i++) {
        let option = attr(gameOptionsPlayerBtns[i], 'data-player');
        players[i].active = option > 0;
        players[i].ai = option > 1;

        if(option > 0) {
            regions[i].owner = players[i];
            regions[i].army = 10;
        }
    }

    playerIndex = 0;
    activePlayer = players[0];
    turn = 1;
    attr(map, 'data-player', activePlayer.id)
    updatePlayerUi();

    if(activePlayer.ai) {
        aiStart();
    }
}

/**
 * @function
 * @name endTurn
 * 
 * Ends players turn and set next active player.
 */
function endTurn() {
    do {
        playerIndex = playerIndex < players.length - 1 ? ++playerIndex : 0;

        if(!playerIndex) {
            turn++;

            for(let player of players) {
                player.gold += player.income;
            }

            for(let region of regions) {
                region.blockedArmy = 0;
            }
        }
    } while(!players[playerIndex].active)

    activePlayer = players[playerIndex];
    activeRegion ? attr(activeRegion.territory, 'class', 'region') : 0;
    activeRegion = null;
    attr(map, 'data-player', activePlayer.id)
    updatePlayerUi();
    updateRegionUi();

    if(activePlayer.ai && players.filter(player => player.active).length > 1) {
        aiStart();
    }
}

/**
 * @function
 * @name calculateBattle
 * 
 * Calculate result of battle.
 * Returns sizes of both armies after battle.
 * 
 * @param {number} attArmy - Size o attacking army
 * @param {number} defArmy - Size of defending army
 * @param {number} attAdvantage - attacking army advatage
 * @param {number} defAdvantage - defending army advatage
 * 
 * @return {object} - Size of armies after battle
 */
function calculateBattle(attArmy, defArmy, attAdvantage, defAdvantage) {
    let attStrength = attArmy + attArmy * attAdvantage,
        defStrength = defArmy + defArmy * defAdvantage;

    return {
        attArmy: attStrength ? Math.round(attArmy * Math.max(attStrength - defStrength, 0) / attStrength) : 0,
        defArmy: defStrength ? Math.round(defArmy * Math.max(defStrength - attStrength, 0) / defStrength) : 0
    }
}


/**
 * @function
 * @name checkWinCondition
 * 
 * Checks if win condition is met (only one player is left with any regions).
 * If condition is met displays game end modal.
 */
function checkWinCondition() {
    let activePlayers = players.filter(player => player.active);
    
    if(activePlayers.length > 1)
        return;

    openModal(gameEndModal, `<h3 class=t-center>${activePlayers[0].name} wins!</h3>`)
}

/**
 * @function
 * @name endGame
 * 
 * Ends game and shows menu screen.
 */
function endGame() {
    closeModal(gameEndModal)
    c(menuScreen, 'd-none', 1)
    c(gameScreen, 'd-none')
}
//selectors
let /**
    * @name container
    * @type {HTMLElement}
    * 
    * Main container
    */
    container = el('#container'),
    /**
    * @name menuScreen
    * @type {HTMLElement}
    * 
    * Menu screen
    */
    menuScreen = el('#menu-screen'),
    /**
    * @name gameScreen
    * @type {HTMLElement}
    * 
    * Game screen element
    */
    gameScreen = el('#game-screen'),
    /**
    * @name mapContainer
    * @type {HTMLElement}
    * 
    * Map container
    */
    mapContainer = el('#map-container'),
    /**
    * @name startGameBtn
    * @type {HTMLElement}
    * 
    * Start game button
    */
    startGameBtn = el('#start-game-btn'),
    /**
    * @name gameOptionsPlayerBtns
    * @type {array}
    * 
    * Player options buttons
    */
    gameOptionsPlayerBtns = [
        el('#go-p1-btn'),
        el('#go-p2-btn'),
        el('#go-p3-btn'),
        el('#go-p4-btn')
    ],
    /**
    * @name gameOptionsMapBtn
    * @type {HTMLElement}
    * 
    * Map size option button
    */
    gameOptionsMapBtn = el('#go-map-btn'),
    /**
    * @name map
    * @type {HTMLElement}
    * 
    * Map svg element
    */
    map = el('#map'),
    /**
    * @name mapActiveRegion
    * @type {HTMLElement}
    * 
    * Map's active region (used to put region's territory above other)
    */
    mapActiveRegion = el('#map-active-region'),
    /**
    * @name sidePanel
    * @type {HTMLElement}
    * 
    * Game screen's side control panel
    */
    sidePanel = el('#side-panel'),
    /**
    * @name turnCount
    * @type {HTMLElement}
    * 
    * Displays current turn on side panel
    */
    turnCount = el('#turn'),
    /**
    * @name endTurnBtn
    * @type {HTMLElement}
    * 
    * End turn button
    */
    endTurnBtn = el('#end-turn'),
    /**
    * @name playerName
    * @type {HTMLElement}
    * 
    * Displays current active player's name
    */
    playerName = el('#player-name'),
    /**
    * @name playerShield
    * @type {HTMLElement}
    * 
    * Player's shield dosplaying current player's color
    */
    playerShield = el('#player-shield'),
    /**
    * @name gold
    * @type {HTMLElement}
    * 
    * Displays current active player's gold
    */
    gold = el('#gold'),
    /**
    * @name goldIncome
    * @type {HTMLElement}
    * 
    * Displays current active player's gold income
    */
    goldIncome = el('#gold-income'),                
    /**
    * @name regionName
    * @type {HTMLElement}
    * 
    * Displays current active region's name
    */
    regionName = el('#region-name'),
    /**
    * @name regionArmy
    * @type {HTMLElement}
    * 
    * Displays current active region's army
    */
    regionArmy = el('#region-army'),
    /**
    * @name regionActiveArmy
    * @type {HTMLElement}
    * 
    * Displays current active region's active army
    */
    regionActiveArmy = el('#region-army-active'),
    /**
    * @name regionBuyArmyAmount
    * @type {HTMLElement}
    * 
    * Displays selected number of army units to buy
    */
    regionBuyArmyAmount = el('#region-buy-army-amount'),
    /**
    * @name regionBuyArmyInput
    * @type {HTMLElement}
    * 
    * Input element to select number of army units to buy
    */
    regionBuyArmyInput = el('#region-buy-army-input'),
    /**
    * @name regionBuyArmyBtn
    * @type {HTMLElement}
    * 
    * Buy army button
    */
    regionBuyArmyBtn = el('#region-buy-army-btn'),
    /**
    * @name regionSendArmyAmount
    * @type {HTMLElement}
    * 
    * Displays selected number of army units to send
    */
    regionSendArmyAmount = el('#region-send-army-amount'),
    /**
    * @name regionSendArmyMax
    * @type {HTMLElement}
    * 
    * Displays max. number of army units to send
    */
    regionSendArmyMax = el('#region-send-army-max'),
    /**
    * @name regionSendArmyInput
    * @type {HTMLElement}
    * 
    * Input element to select number of army units to send
    */
    regionSendArmyInput = el('#region-send-army-input'),
    /**
    * @name regionSendArmyBtn
    * @type {HTMLElement}
    * 
    * Send army button
    */
    regionSendArmyBtn = el('#region-send-army-btn'),
    /**
    * @name regionSendArmyCancelBtn
    * @type {HTMLElement}
    * 
    * Cancel send army button
    */
    regionSendArmyCancelBtn = el('#region-send-army-cancel-btn'),
    /**
    * @name fullscreenBtn
    * @type {HTMLElement}
    * 
    * Fullscreen mode toggle button
    */
    fullscreenBtn = el('#toggle-fullscreen'),
    /**
    * @name gameEndModal
    * @type {HTMLElement}
    * 
    * Game end modal
    */
    gameEndModal =  el('#game-end-modal'),
    /**
    * @name gameEndBtn
    * @type {HTMLElement}
    * 
    * Game end modal button
    */
    gameEndBtn = el('#game-end-btn'),
    /**
    * @name battleModal
    * @type {HTMLElement}
    * 
    * Battle modal
    */
    battleModal = el('#battle-modal'),
    /**
    * @name battleRegion
    * @type {HTMLElement}
    * 
    * Displays attacked region in battle modal
    */
    battleRegion = el('#battle-region'),
    /**
    * @name attName
    * @type {HTMLElement}
    * 
    * Displays attacking player's name
    */
    attName = el('#att-name'),
    /**
    * @name attArmy
    * @type {HTMLElement}
    * 
    * Displays attacking army
    */
    attArmy = el('#att-army'),
    /**
    * @name attDice
    * @type {HTMLElement}
    * 
    * Attacking army dice
    */
    attDice = el('#att-dice'),
    /**
    * @name attAdvantage
    * @type {HTMLElement}
    * 
    * Displays attacking army's advantage
    */
    attAdvantage = el('#att-advantage'),
    /**
    * @name defName
    * @type {HTMLElement}
    * 
    * Displays defending player's name
    */
    defName = el('#def-name'),
    /**
    * @name defArmy
    * @type {HTMLElement}
    * 
    * Displays defending army
    */
    defArmy = el('#def-army'),
    /**
    * @name defDice
    * @type {HTMLElement}
    * 
    * DEfending army dice
    */
    defDice = el('#def-dice'),
    /**
    * @name defAdvantage
    * @type {HTMLElement}
    * 
    * Displays defending army's advantage
    */
    defAdvantage = el('#def-advantage'),
    /**
    * @name battleResult
    * @type {HTMLElement}
    * 
    * Displays battle result
    */
    battleResult = el('#battle-result'),
    battleModalCloseBtn = el('#battle-modal-close-btn'),
    /**
    * @name mapsize
    * @type {Object}
    * 
    * mapArray size
    */
    mapSize = {x:30, y:30},
    /**
    * @name mapArray
    * @type {array}
    * 
    * Array used for map generation
    */
    mapArray,
    /**
    * @name regions
    * @type {array}
    * 
    * Array map regions
    */
    regions = [],
    /**
    * @name regionsPool
    * @type {array}
    * 
    * Pool of unused regions
    */
    regionsPool = [],
    /**
    * @name regionNames
    * @type {array}
    * 
    * Pool of generated region names to pick
    */
    regionNames = [],
    /**
    * @name players
    * @type {array}
    * 
    * Array of players
    */
    players = [
        new Player(1, 'Red Kingdom', '#AA0000'),
        new Player(2, 'Green Kingdom', '#00AA00'),
        new Player(3, 'Blue Kigdom', '#0000AA'),
        new Player(4, 'Yellow Kingdom', '#FFFF00')
    ],
    /**
    * @name activePlayer
    * @type {Player|null}
    * 
    * Current active player
    */
    activePlayer,
    /**
    * @name activePlayer
    * @type {number}
    * 
    * Current active player's index in players array
    */
    playerIndex = 0,
    /**
    * @name turn
    * @type {number}
    * 
    * Current turn
    */
    turn = 1,
    /**
    * @name activeRegion
    * @type {Region|null}
    * 
    * Current active region
    */
    activeRegion,
    /**
    * @name turn
    * @type {bool}
    * 
    * Flag informing that player is choosing where to send army
    */
    sendArmyFlag = 0;
/**
 * @function
 * @name Init
 * 
 * Initiate game.
 */ 
function init() {
    //add event listeners
    on(fullscreenBtn, 'click', toggleFullScreen);

    on(startGameBtn, 'click', startGame);
    for(let el of gameOptionsPlayerBtns) {
        on(el, 'click', () => updateGameOptionsPlayerBtn(el));
    }

    on(gameOptionsMapBtn, 'click', () => updateGameOptionsMapBtn(gameOptionsMapBtn));

    on(regionBuyArmyInput, 'input', (e) => txt(regionBuyArmyAmount, e.target.value))
    on(regionBuyArmyBtn, 'click', recruit)

    on(regionSendArmyInput, 'input', (e) => txt(regionSendArmyAmount, e.target.value))
    on(regionSendArmyBtn, 'click', enableSendArmy)
    on(regionSendArmyCancelBtn, 'click', disableSendArmy)

    on(endTurnBtn, 'click', endTurn)

    on(gameEndBtn, 'click', endGame)

    on(battleModalCloseBtn, 'click', closeBattleModal);

    generateRegionNames();
}


//initialize game
init();
