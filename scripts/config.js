module.exports = {
    consoleShown: false,
    selectedUnit: UnitTypes.dagger,
    selectedTeam: Team.sharded,
    selX: 0, selY: 0,
    
    // settings
    turretRange: Core.settings.getBool("mutl-turretrange"),
    unitRange: Core.settings.getBool("mutl-unitrange")
};