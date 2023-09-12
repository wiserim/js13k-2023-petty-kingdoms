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
