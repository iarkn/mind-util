module.exports = {
    consoleShown: false,
    // unit spawner
    selectedUnit: UnitTypes.dagger,
    selectedTeam: Team.sharded,
    selX: 0, selY: 0,
    // spawn options
    spawnAmount: 1,
    scatter: false,
    scatterRadius: 40,
    // world dialog
    worldDialogMode: "info",
    waveRange: 30,
    showPrevWave: false,
    pickedWave: -1,
    
    // settings
    turretRange: Core.settings.getBool("mutl-turretrange"),
    unitRange: Core.settings.getBool("mutl-unitrange"),
    controlledStatus: Core.settings.getBool("mutl-controlledstatus"),
    allStatus: Core.settings.getBool("mutl-allstatus")
};