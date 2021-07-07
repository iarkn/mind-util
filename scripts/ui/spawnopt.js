const mutl = global.mutl, c = mutl.config;

/** Creates the spawn options dialog. */
function SpawnOptionsDialog() {
    const dialog = new BaseDialog("$mutl.header.spawnoptions");
    const opt = new SettingsMenuDialog.SettingsTable();

    const options = new RunnableAction();

    dialog.addCloseButton();

    opt.sliderPref(c.scatterRadius.name, c.scatterRadius.def, 1, 450, s => s);
    opt.sliderPref(c.spawnAmount.name, c.spawnAmount.def, 1, 100, s => s);

    opt.checkPref(c.scatter.name, c.scatter.get());

    dialog.cont.pane(p => {
        options.setRunnable(() => p.add(opt));

        options.run();
    });

    return dialog;
}

module.exports = SpawnOptionsDialog;
