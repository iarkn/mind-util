const c = global.mutl.config;

/** Settings dialog for configuration. */
function configDialog() {
    const dialog = new SettingsDialog();
    const main = dialog.main;
    
    dialog.setFillParent(true);
    dialog.closeOnBack();
    
    dialog.titleTable.clearChildren();
    
    main.checkPref("mutl-turretrange", false, b => c.turretRange = b);
    main.checkPref("mutl-unitrange", false, b => c.unitRange = b);
    
    // remove the "Reset to Defaults" button.
    main.getChildren().pop();
    
    dialog.bottom();
    
    dialog.buttons.button("$back", Icon.left, () => {
        dialog.hide();
    }).size(210, 64);
    
    return dialog;
}

/** Main dialog for Mindustry Utilities. */
function mainDialog() {
    const dialog = new BaseDialog("$mutl.utilities");
    const cont = dialog.cont;
    
    cont.table(Tex.button, t => {
        t.center();
        t.defaults().size(300, 60);
        
        t.button("$mutl.config", Styles.cleart, () => {
            configDialog().show();
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
        
        table.button(Icon.settings, Styles.clearTransi, () => {
            mainDialog().show();
        }).name("mutl-utilities");
        
        table.button(Icon.terminal, Styles.clearTransi, () => {
            setupConsole(!c.consoleShown);
            
            c.consoleShown = !c.consoleShown;
        }).name("mutl-console");
        
        table.image().width(4).color(Pal.gray).fillX().fillY();
    });
} else {
    /* ...or add a listener for the F9 key on desktop. */
    if (Core.input.keyTap(KeyCode.f9)) { // TODO: make it customizable.
        mainDialog().show();
    }
}