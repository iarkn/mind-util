/** Base for configuration that gets saved.
 *  @param String name - The internal name of this config.
 *  @param Object def  - The default value of this config.
 */
function Config(name, def) {
    Core.settings.defaults(name, def);
    
    this.name = "config." + name + ".name";
    this.lname = Core.bundle.get(this.name, name);
    this.def = def;
    
    this.put = value => Core.settings.put(name, value);
    this.val = () => Core.settings.get(name, def);
    
    return this;
}

module.exports = {
    menuKey: new Config("mutl-menukey", KeyCode.f9.ordinal()),
    
    /* Configs below this comment do not need to be saved. */
    selUnit: UnitTypes.dagger,
    selTeam: Team.sharded,
    selPos: new Point2(0, 0)
};