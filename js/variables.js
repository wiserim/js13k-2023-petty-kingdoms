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
    * @name menuBtn
    * @type {HTMLElement}
    * 
    * Menu modal toggle button
    */
    menuBtn = el('#toggle-menu'),
    /**
    * @name menuModal
    * @type {HTMLElement}
    * 
    * Game end modal
    */
    menuModal =  el('#menu-modal'),
    /**
    * @name menuEndBtn
    * @type {HTMLElement}
    * 
    * Menu modal button ending game
    */
    menuEndBtn = el('#menu-end-btn'),
    /**
    * @name menuRestartBtn
    * @type {HTMLElement}
    * 
    * Menu modal button restarting game
    */
    menuRestartBtn = el('#menu-restart-btn'),
    /**
    * @name menuResumeBtn
    * @type {HTMLElement}
    * 
    * Menu modal button resuming game
    */
    menuResumeBtn = el('#menu-resume-btn'),
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
    * @name pause
    * @type {number}
    * 
    * Is game paused
    */
    pause = 0,
    /**
    * @name pause
    * @type {number}
    * 
    * Is game paused
    */
    aiAttackTimeout,
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
