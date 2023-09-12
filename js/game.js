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
