const c = global.mutl.config;

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
    
    // remove the "Reset to Defaults" button.
    main.getChildren().pop();
    
    dialog.bottom();
    
    dialog.buttons.button("$back", Icon.left, () => {
        dialog.hide();
    }).size(210, 64);
    
    return dialog;
}

// UNIT SPAWNER

/** Adds a button that assigns 'unit' to config.selectedUnit. */
function addUnitButton(table, unit, uinfo) {
    table.button(new TextureRegionDrawable(unit.icon(Cicon.large)), Styles.clearTransi, () => {
        c.selectedUnit = unit;
        
        uinfo.run();
    }).size(48, 48).pad(3);
}

/** Adds a button that assigns 'team' to config.selectedTeam. */
function addTeamButton(table, team, uinfo) {
    table.button(cons(b => b.image().color(team.color).grow()), Styles.modsb, () => {
        c.selectedTeam = team;
        
        uinfo.run();
    }).size(48, 48).pad(3);
}

/** Adds a text field that assigns the input to c.sel<axis>. */
function addPosFields(table, axis, max) {
    const field = Elem.newField(c["sel" + axis], input => {
        let int = (!input || isNaN(input)) ? 0 : parseFloat(input);
        let pos = Mathf.clamp(int, 0, max);
        
        c["sel" + axis] = pos;
    });
    
    field.setFilter(TextField.TextFieldFilter.digitsOnly);
    
    table.add(axis + ":").padRight(6);
    table.add(field).size(120, 40).pad(3);
}

/** Unit-spawning configuration dialog. */
function unitDialog() {
    const dialog = new BaseDialog("$mutl.title.unitconfig");
    const cont = dialog.cont;
    
    let uinfo = new RunnableAction(), posinfo = new RunnableAction();
    
    cont.table(null, ti => {
        // top-left panel, unit configuration.
        ti.table(Tex.button, t => {
            uinfo.setRunnable(() => {
                let unit = c.selectedUnit, team = c.selectedTeam;
                
                t.clearChildren();
                t.center().top();
                
                t.table(null, t2 => {
                    t2.image(new TextureRegionDrawable(unit.icon(Cicon.xlarge))).scaling(Scaling.fit);
                    
                    t2.add(unit.localizedName).color(team.color).padLeft(4).padBottom(4);
                }).size(420, 60);
                
                t.row();
                
                t.image().color(team.color).growX().height(4).padLeft(4).padRight(4).padBottom(12);
                t.row();
                
                let r = 0;
                
                t.pane(p => {
                    for (let team of Team.all) {
                        addTeamButton(p, team, uinfo);
                        
                        if (++r % 6 == 0) p.row();
                    }
                }).size(360, 160).padBottom(12);
                
                t.row();
                
                t.table(null, t2 => {
                    t2.table(null, t3 => {
                        posinfo.setRunnable(() => {
                            t3.clearChildren();
                            
                            addPosFields(t3, "X", Vars.world.width());
                            addPosFields(t3, "Y", Vars.world.height());
                        });
                        
                        posinfo.run();
                    });
                    
                    // set x and y positions to the player's position.
                    t2.button(Icon.refresh, Styles.cleari, () => {
                        c.selX = Math.floor(Vars.player.x / 8);
                        c.selY = Math.floor(Vars.player.y / 8);
                            
                        posinfo.run();
                    }).size(48, 48);
                }).width(360);
            });
            
            uinfo.run();
        }).size(420, 354).padBottom(6);
        
        ti.row();
        
        // bottom-left panel, spawn unit and unit info.
        ti.table(null, t => {
            t.button("$mutl.spawnunit", Styles.defaultt, () => {
                c.selectedUnit.spawn(c.selectedTeam, c.selX * 8, c.selY * 8);
            }).size(354, 60).padRight(6);
            
            t.button(Icon.info, Styles.defaulti, () => {
                Vars.ui.content.show(c.selectedUnit);
            }).size(60, 60);
        }).size(420, 60);
    }).size(420, 420);
    
    if (Core.graphics.isPortrait()) cont.row();
    
    // right panel, unit selection.
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
    }).size(420, 420);
    
    dialog.addCloseButton();
    
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
        });
        
        t.row();
        
        t.button("$mutl.option.spawnunit", Styles.cleart, () => {
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
        
        table.button(Icon.wrench, Styles.clearTransi, () => {
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