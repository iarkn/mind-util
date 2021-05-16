const c = global.mutl.config;

function rulesList(table) {
    // TODO
}

function worldInfo(table) {
    // TODO
}

/** Very unnecessary graph for the specified wave. */
function waveGraph(table) {
    // TODO
}

/** Adds a table containing a spawn group of the specified wave. */
function addSpawnGroup(table, group, wave) {
    table.stack(
        new Image(group.type.icon(Cicon.medium)),
        new Table(null, t => {
            t.bottom().left();
            
            t.label(() => group.getSpawned(wave).toString());
        })
    ).size(42, 42).pad(4);
}

/** Adds a table or a line containing spawn groups on the specified wave. */
function addWaveLine(table, wave) {
    let color = wave == Vars.state.wave ? Color.white : Pal.accent;
    
    table.top().left();
    
    table.table(null, t => {
        t.left();
        
        t.label(() => wave.toString()).color(color).size(60, 60).padRight(6);
        
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
                
                let start = c.showPrevWave ? 1 : Vars.state.wave,
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

    mainrun.setRunnable(() => {
        cont.clearChildren();
        
        // left or top panel, shows either a list of the rules or the wave info
        // depending on the dialog mode.
        cont.table(Tex.button, t => {
            c.worldDialogMode == "info" ? rulesList(t)
                : c.worldDialogMode == "wave" ? wavePanel(t)
                : null;
        }).size(420, 420);
        
        if (Core.graphics.isPortrait()) cont.row();
        
        cont.table(null, ti => {
            // top-right or bottom panel, shows either the world info or the
            // wave graph depending on the dialog mode.
            ti.table(Tex.button, t => {
                c.worldDialogMode == "info" ? worldInfo(t)
                    : c.worldDialogMode == "wave" ? waveGraph(t)
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
        }).size(420, 420);
    });
    
    mainrun.run();
    
    dialog.addCloseButton();
    
    return dialog;
}

module.exports = worldDialog;