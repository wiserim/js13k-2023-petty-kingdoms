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
