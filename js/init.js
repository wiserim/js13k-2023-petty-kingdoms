/**
 * @function
 * @name Init
 * 
 * Initiate game.
 */ 
function init() {
    //add event listeners
    on(fullscreenBtn, 'click', toggleFullScreen)

    on(startGameBtn, 'click', () => {
        //count active players
        if(gameOptionsPlayerBtns.filter((p) => attr(p, 'data-player') > 0).length > 1) {
            startGame()
        }
        else {
            openModal(infoModal, '<h3 class=t-center>Select 2 or more players.</h3>')
        }

    });

    for(let el of gameOptionsPlayerBtns) {
        on(el, 'click', () => updateGameOptionsPlayerBtn(el));
    }

    on(gameOptionsMapBtn, 'click', () => updateGameOptionsMapBtn(gameOptionsMapBtn))

    on(regionBuyArmyInput, 'input', (e) => txt(regionBuyArmyAmount, e.target.value))
    on(regionBuyArmyBtn, 'click', recruit)

    on(regionSendArmyInput, 'input', (e) => txt(regionSendArmyAmount, e.target.value))
    on(regionSendArmyBtn, 'click', enableSendArmy)
    on(regionSendArmyCancelBtn, 'click', disableSendArmy)

    on(endTurnBtn, 'click', endTurn)

    on(closeInfoModalBtn, 'click', () => {
        closeModal(infoModal);
        if(closeInfoModalCallback)
            closeInfoModalCallback();
        closeInfoModalCallback = null;
    })

    on(battleModalCloseBtn, 'click', closeBattleModal)

    on(menuBtn, 'click', () => {openModal(menuModal); startPause()})

    on(menuEndBtn, 'click', () => {closeModal(menuModal); endGame()})
    on(menuRestartBtn, 'click', () => {closeModal(menuModal); startGame()})
    on(menuResumeBtn, 'click', () => {closeModal(menuModal); endPause()})

    generateRegionNames();
}


//initialize game
init();
