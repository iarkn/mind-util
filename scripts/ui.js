const c = global.mutl.config;

/** Settings dialog for configuration. */
function configDialog() {
    const dialog = new SettingsDialog();
    const main = dialog.main;
    
    dialog.setFillParent(true);
    dialog.closeOnBack();
    
    dialog.titleTable.clearChildren();
    
    main.checkPref("mutl-turretrange", false, b => c.turretRange = Core.settings.getBool("mutl-turretrange"));
    main.checkPref("mutl-unitrange", false, b => c.unitRange = Core.settings.getBool("mutl-unitrange"));
    
    /* Remove the "Reset to Defaults" button. */
    main.getChildren().pop();
    
    dialog.bottom();
    
    dialog.buttons.button("$back", Icon.left, () => {
        dialog.hide();
    }).size(210, 64);
    
    return dialog;
}

/** Adds a button that assigns 'unit' to selectedUnit. */
function addUnitButton(table, unit, uinfo) {
    table.button(new TextureRegionDrawable(unit.icon(Cicon.large)), Styles.clearTransi, () => {
        c.selectedUnit = unit;
        
        uinfo.run();
    }).size(48, 48).pad(3);
}

/** Unit-spawning configuration dialog. */
function unitDialog() {
    const dialog = new BaseDialog("$mutl.unitconfig");
    const cont = dialog.cont;
    
    let uinfo = new RunnableAction();
    
    cont.table(Tex.button, t => {
        uinfo.setRunnable(() => {
            t.clearChildren();
            
            let unit = c.selectedUnit;
            
            t.center().top();
            
            t.image(new TextureRegionDrawable(unit.icon(Cicon.xlarge))).scaling(Scaling.fit);
            
            t.add(unit.localizedName).color(Pal.accent).padLeft(4).padBottom(4);
            t.row();
        });
        
        uinfo.run();
    }).size(360, 420);
    
    if (Core.graphics.isPortrait()) cont.row();
    
    cont.table(Tex.button, t => {
        t.top().left();
        
        t.add("$content.unit.name").color(Pal.accent).growX().padLeft(4).padBottom(4);
        t.row();
        
        t.image().color(Pal.accent).growX().height(4).padLeft(4).padRight(4).padBottom(12);
        t.row();
        
        t.pane(p => {
            p.center().top();
            
            let r = 0;
            
            for (let unit of Vars.content.units().toArray()) {
                let icon = unit.icon(Cicon.large);
                
                addUnitButton(p, unit, uinfo);
                
                if (++r % 6 == 0) p.row();
            }
        }).growX();
    }).size(360, 420);
    
    dialog.addCloseButton();
    
    return dialog;
}

/** Main dialog for Mindustry Utilities. */
function mainDialog() {
    const dialog = new BaseDialog("$mutl.utilities");
    
    dialog.cont.table(Tex.button, t => {
        t.center(); 
        t.defaults().size(300, 60);
        
        t.button("$mutl.config", Styles.cleart, () => {
            configDialog().show();
        });
        
        t.row();
        
        t.button("$mutl.spawnunit", Styles.cleart, () => {
            unitDialog().show();
        }).disabled(b => Vars.net.active());
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