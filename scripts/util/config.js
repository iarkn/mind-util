/**
 * Base for configuration that gets saved.
 * @param String name - The name of this config.
 * @param Object def  - The default value of this config.
 */
function Config(name, def) {
    Core.settings.defaults(name, def);

    this.name = "mutl-" + name;
    this.iname = "setting." + this.name + ".name";
    this.lname = Core.bundle.get(this.iname, this.name);
    this.def = def;

    this.put = value => Core.settings.put(this.name, value);
    this.get = () => Core.settings.get(this.name, def);

    return this;
}

module.exports = {
    menuKey: new Config("menukey", KeyCode.f9.ordinal()),

    /* Spawn options */
    scatter: new Config("scatter", false),
    scatterRadius: new Config("scatterradius", 40),
    spawnAmount: new Config("spawnamount", 1),

    /* No-need-to-save configurations */
    selUnit: UnitTypes.dagger,
    selTeam: Team.sharded,
    selPos: new Point2(0, 0)
};
