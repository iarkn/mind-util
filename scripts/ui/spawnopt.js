const mutl = global.mutl, c = mutl.config;

/** Creates the spawn options dialog. */
function SpawnOptionsDialog() {
    const dialog = new BaseDialog("$mutl.header.spawnoptions");
    const opt = new SettingsMenuDialog.SettingsTable();

    dialog.addCloseButton();

    opt.sliderPref(c.scatterRadius.name, c.scatterRadius.def, 1, 450, s => s);
    opt.sliderPref(c.spawnAmount.name, c.spawnAmount.def, 1, 100, s => s);

    opt.checkPref(c.scatter.name, c.scatter.def);

    dialog.cont.pane(p => {
        p.add(opt);
    });

    return dialog;
}

module.exports = SpawnOptionsDialog;
