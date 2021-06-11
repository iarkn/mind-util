const c = global.mutl.config;
const unitDialog = global.mutl.unitspawner,
    worldDialog = global.mutl.world;

// CONFIG

/** Settings dialog for configuration. */
function configDialog() {
    const dialog = new Dialog();
    const main = new SettingsMenuDialog.SettingsTable();
    
    dialog.setFillParent(true);
    dialog.closeOnBack();
    
    dialog.titleTable.clearChildren();
    
    main.checkPref("mutl-turretrange", false, b => c.turretRange = Core.settings.getBool("mutl-turretrange"));
    main.checkPref("mutl-turrethitradius", false, b => c.turretHitRadius = Core.settings.getBool("mutl-turrethitradius"));
    main.checkPref("mutl-unitrange", false, b => c.unitRange = Core.settings.getBool("mutl-unitrange"));
    main.checkPref("mutl-controlledstatus", false, b => c.controlledStatus = Core.settings.getBool("mutl-controlledstatus"));
    main.checkPref("mutl-allstatus", false, b => c.allStatus = Core.settings.getBool("mutl-allstatus"));
    
    // remove the "Reset to Defaults" button.
    main.getChildren().pop();
    
    dialog.cont.add(main);
    
    dialog.bottom();
    
    dialog.buttons.button("$back", Icon.left, () => {
        dialog.hide();
    }).size(210, 64);
    
    return dialog;
}

// MAIN

/** Main dialog for Mindustry Utilities. */
function mainDialog() {
    const dialog = new BaseDialog("$mutl.title.utilities");
    
    dialog.cont.table(Tex.button, t => {
        t.center();
        t.defaults().size(300, 60);
        
        t.button("$mutl.option.config", Styles.cleart, () => {
            configDialog().show();
        }).row();
        
        t.button("$mutl.option.spawnunit", Styles.cleart, () => {
            unitDialog().show();
        }).disabled(b => Vars.net.active()).row();
        
        t.button("$mutl.option.world", Styles.cleart, () => {
            worldDialog().show();
        }).row();
        
        t.button("$mutl.option.modding", Styles.cleart, () => {
            Vars.ui.showInfoText("Notice", "This section will be available in version 7.0 of Mindustry.");
        });
    });
    
    dialog.addCloseButton();
    
    return dialog;
}

// CONSOLE - TODO: history for mobile without reflections, or just make a custom fragment instead.

/* Adds a table containing one script history.
function addHistoryTable(table, index) {
    // ..,
} */

/* Script history dialog for mobile.
function historyDialog() {
    const dialog = new BaseDialog("$mutl.header.history");
    
    let w = Core.graphics.isPortrait() ? 420 : 680,
        h = Core.graphics.isPortrait() ? 680 : 420;
    
    dialog.cont.table(Tex.button, t => {
        t.top().left();
        
        t.add("$mutl.header.history").color(Pal.accent).growX().padLeft(4).padBottom(4);
        t.row();
        
        t.image().color(Pal.accent).growX().height(4).padLeft(4).padRight(4).padBottom(12);
        t.row();
        
        t.pane(p => {
            p.top().left();
        }).growX();
    }).size(w, h);
    
    dialog.addCloseButton();
    
    return dialog;
} */

/** Setup script console fragment for mobile. */
function setupConsole(shown) {
    let frag = Vars.ui.scriptfrag;
    
    frag.clearChildren();
    
    frag.table(null, t => {
        t.defaults().size(48);
        
        t.button(Icon.pencil, Styles.clearTransi, () => frag.toggle());
        // t.button(Icon.list, Styles.clearTransi, () => historyDialog().show());
        // shortcut for the 'clear' command.
        t.button(Icon.trash, Styles.clearTransi, () => frag.clearMessages());
    });
    
    frag.visibility = () => shown;
}

// SETUP

/* Add buttons in game on mobile. */
if (Vars.mobile) {
    Events.on(WorldLoadEvent, e => {
        const table = Vars.ui.hudGroup.getChildren().get(3).find("mobile buttons");
        
        if (table == null) return;
        
        table.button(Icon.wrench, Styles.clearTransi, () => {
            mainDialog().show();
        }).name("mutl-utilities");
        
        table.button(Icon.terminal, Styles.clearTransi, () => {
            setupConsole(!c.consoleShown);
            
            c.consoleShown = !c.consoleShown;
        }).name("mutl-console");
        
        table.image().width(4).color(Pal.gray).fill();
    });
} else {
    /* ...or add a listener for the F9 key on desktop. */
    Events.run(Trigger.update, () => {
        // TODO: make it customizable.
        if (Vars.state.isGame() && Core.input.keyTap(Packages.arc.input.KeyCode.f9)) {
            mainDialog().show();
        }
    });
}