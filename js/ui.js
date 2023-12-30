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
    c(regionSendArmyBtn, 'd-none');
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
    c(regionSendArmyBtn, 'd-none', 1);
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
