/**
 * @function
 * @name aiStart
 * 
 * Start AI control for computer player. Invoked on start of turn.
 */
function aiStart() {
    if(pause || aiAttackTimeout) {
        return;
    }

    let p = activePlayer,
        regions = shuffle(p.regions),
        //Easy AI can use max 75% of their gold.
        goldFactor = p.ai === 1 ? .75 : 1;

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
            if(neighbour.army >= region.army) {
                regionBuyArmyInput.value = Math.min(neighbour.army - region.army + rand(1, 5), Math.floor(p.gold * goldFactor));
                recruit();
                continue;
            }

            if(neighbour.army > region.activeArmy || region.activeArmy < 2) {
                continue;
            }

            //attack
            let army = neighbour.army - 1;
            
            if(p.ai == 1) {
                army += rand(0, 4);
            }
            else {
                army += rand(2, 6);
            }

            army = Math.min(Math.max(1, army), region.activeArmy - 1);

            if(neighbour.player && !neighbour.player.ai) {
                regionSendArmyInput.value = army
                sendArmy(neighbour);
                return;
            }

            aiAttackTimeout = setTimeout(() => {
                region.blockedArmy += army;
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
    if(pause) {
        return;
    }

    let p = activePlayer,
        regions = shuffle(p.regions);

    if(p.ai > 1 && p.gold) {
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
    if(pause) {
        aiAttackTimeout = 0;
        return;
    }
    
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

    aiAttackTimeout = 0;
    //Hard AI can attack multiple times.
    activePlayer.ai == 3 ? aiStart() : aiEnd();
}
