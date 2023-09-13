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
    activeRegion.army -= army;
    activeRegion.blockedArmy -= army;

    if(region.army < 1 && result.attArmy > 0) {
        region.owner = activePlayer;
        region.army = result.attArmy;
        region.blockedArmy = result.attArmy;

        if(defPlayer) {
            defPlayer.active = defPlayer.regions.length ? 1 : 0
            checkWinCondition();
        }
    }
    else {
        activeRegion.army += result.attArmy;
        activeRegion.blockedArmy += result.attArmy;
    }

    updateRegionUi();

    aiEnd();
}
