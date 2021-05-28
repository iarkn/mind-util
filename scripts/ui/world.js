const c = global.mutl.config;

function rulesList(table) {
    // TODO
}

function worldInfo(table) {
    // TODO
}

/** Adds a table containing a spawn group of the specified wave. */
function addSpawnGroup(table, group, wave, showShield) {
    let color = group.effect == StatusEffects.boss ? Pal.health : Color.white;

    table.stack(
        new Image(group.type.icon(Cicon.medium)).setScaling(Scaling.fit),
        new Table(null, t => {
            t.bottom().left();
            t.label(() => group.getSpawned(wave).toString()).color(color);
        })
    ).size(42).pad(4);
    
    if (showShield) {
        table.stack(
            new Image(Icon.defense),
            new Table(null, t => {
                t.bottom().left();
                t.label(() => group.getShield(wave).toString()).color(Pal.accent);
            })
        ).size(42).pad(4).padRight(8);
    }
}

/** Very unnecessary information for the current picked wave. */
function wavePicked(table) {
    let waverun = new RunnableAction();
    
    waverun.setRunnable(() => {
        table.clearChildren();

        // set picked wave to current wave for the first time.
        if (c.pickedWave < 0) c.pickedWave = Vars.state.wave - 1;

        let count = c.pickedWave;
        let atotal = 0, htotal = 0;
        
        table.table(null, t => {
            t.defaults().padLeft(4);
            t.top().left();
            
            t.add(Core.bundle.format("mutl.header.currentwave", count + 1)).color(Pal.accent).growX().padBottom(4);
            t.row();
            
            t.image().color(Pal.accent).growX().height(4).padRight(4).padBottom(12);
            t.row();
            
            t.add("$mutl.spawns").growX();
            t.row();
            
            let r = 0;
            
            // spawn group preview
            t.pane(p => {
                p.left();
                
                for (let group of Vars.state.rules.spawns.toArray()) {
                    if (group.getSpawned(count) <= 0) continue;
                    
                    addSpawnGroup(p, group, count, true);
                    
                    if (++r % 4 == 0) p.row();
                    
                    atotal += group.getSpawned(count);
                }
            }).growX().height(120).padBottom(12);
            t.row();
            
            t.add(Core.bundle.format("mutl.totalamount", atotal)).growX();
            t.row();
            
            t.add(Core.bundle.format("mutl.spawncount", Vars.spawner.countSpawns())).growX();
            t.row();
            
            t.table(null, t2 => {
                t2.bottom().right();
                
                // reset picked wave to the current wave.
                t2.button(Icon.refresh, Styles.cleari, () => {
                    c.pickedWave = Vars.state.wave - 1;
                    waverun.run();
                }).size(48).padRight(4);
                
                // select previous wave.
                t2.button(Icon.left, Styles.cleari, () => {
                    if (c.pickedWave - 1 < 0) return;
                    
                    c.pickedWave--;
                    waverun.run();
                }).size(48).padRight(4);
                
                // select next wave.
                t2.button(Icon.right, Styles.cleari, () => {
                    c.pickedWave++;
                    waverun.run();
                }).size(48);
            }).grow();
        }).grow();
    });
    
    waverun.run();
}

/** Adds a table or a line containing spawn groups on the specified wave. */
function addWaveLine(table, wave) {
    let count = wave + 1;
    let color = count == Vars.state.wave ? Color.white : Color.gray;
    
    table.top().left();
    
    table.table(null, t => {
        t.left();
        
        t.label(() => count.toString()).color(color).size(60).padRight(6);
        
        for (let group of Vars.state.rules.spawns.toArray()) {
            // skip to next group if this one doesn't spawn at this wave.
            if (group.getSpawned(wave) <= 0) continue;
            
            addSpawnGroup(t, group, wave);
        }
    }).growX().height(60);
    table.row();
}

/** Table for wave spawn groups preview. */
function wavePanel(table) {
    let waverun = new RunnableAction();
    
    table.table(null, t => {
        // wave preview
        t.pane(p => {
            waverun.setRunnable(() => {
                p.clearChildren();
                p.top().left();
                
                let start = c.showPrevWave ? 0 : Vars.state.wave - 1,
                    end = Vars.state.wave + c.waveRange;
                
                for (let i = start; i < end; i++) {
                    addWaveLine(p, i);
                }
            });
            
            waverun.run();
        }).size(390, 340);
        t.row();
        
        // wave preview options
        t.table(null, t2 => {
            t2.add("$option.mutl-waverange.name").width(64).padRight(6);
            
            t2.field(c.waveRange, TextField.TextFieldFilter.digitsOnly, input => {
                if (!input || isNaN(input)) return;
                
                c.waveRange = parseInt(input);
                waverun.run();
            }).width(80).padRight(12);
            
            t2.check("$option.mutl-showprevwave.name", c.showPrevWave, b => {
                c.showPrevWave = b;
                waverun.run();
            }).width(190);
        }).height(60).growX();
    }).grow();
}

/** World info dialog. */
function worldDialog() {
    const dialog = new BaseDialog("$mutl.option.world");
    const cont = dialog.cont;
    
    let mainrun = new RunnableAction();

    if (!Vars.state.waves) c.worldDialogMode = "info";

    mainrun.setRunnable(() => {
        cont.clearChildren();
        
        // left or top panel, shows either a list of the rules or the wave info
        // depending on the dialog mode.
        cont.table(Tex.button, t => {
            c.worldDialogMode == "info" ? rulesList(t)
                : c.worldDialogMode == "wave" ? wavePanel(t)
                : null;
        }).size(420);
        
        if (Core.graphics.isPortrait()) cont.row();
        
        cont.table(null, ti => {
            // top-right or bottom panel, shows either the world info or the
            // wave graph depending on the dialog mode.
            ti.table(Tex.button, t => {
                c.worldDialogMode == "info" ? worldInfo(t)
                    : c.worldDialogMode == "wave" ? wavePicked(t)
                    : null;
            }).size(420, 354).padBottom(6);
            ti.row();
            
            // buttons to choose one of the two dialog modes.
            ti.table(Tex.button, t => {
                t.defaults().size(200, 40);
                
                t.button("$mutl.info", Styles.cleart, () => {
                    c.worldDialogMode = "info";
                    mainrun.run();
                });
                
                t.button("$mutl.wave", Styles.cleart, () => {
                    c.worldDialogMode = "wave";
                    mainrun.run();
                }).disabled(b => !Vars.state.rules.waves);
            }).size(420, 60);
        }).size(420);
    });
    
    mainrun.run();
    
    dialog.addCloseButton();
    
    return dialog;
}

module.exports = worldDialog;
