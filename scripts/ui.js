const c = global.mutl.config;
const unitDialog = global.mutl.unitspawner,
    worldDialog = global.mutl.world;

// CONFIG

/** Settings dialog for configuration. */
function configDialog() {
    const dialog = new SettingsDialog();
    const main = dialog.main;
    
    dialog.setFillParent(true);
    dialog.closeOnBack();
    
    dialog.titleTable.clearChildren();
    
    main.checkPref("mutl-turretrange", false, b => c.turretRange = Core.settings.getBool("mutl-turretrange"));
    main.checkPref("mutl-unitrange", false, b => c.unitRange = Core.settings.getBool("mutl-unitrange"));
    main.checkPref("mutl-controlledstatus", false, b => c.controlledStatus = Core.settings.getBool("mutl-controlledstatus"));
    main.checkPref("mutl-allstatus", false, b => c.allStatus = Core.settings.getBool("mutl-allstatus"));
    
    // remove the "Reset to Defaults" button.
    main.getChildren().pop();
    
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
            Vars.ui.showInfoText("Unavailable", "This section is still under development.");
        });
    });
    
    dialog.addCloseButton();
    
    return dialog;
}

/** Setup script console fragment for mobile. */
function setupConsole(shown) {
    let frag = Vars.ui.scriptfrag;
    
    frag.clearChildren();
    
    frag.button(Icon.pencil, Styles.clearTransi, () => {
        frag.toggle();
    }).size(48, 48);
    
    frag.visibility = () => shown;
}

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