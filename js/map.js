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
    regionsPool.sort((a,b) => a.id > b.id)

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
