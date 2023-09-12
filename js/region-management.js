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

