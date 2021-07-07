const mutl = global.mutl, c = mutl.config;

/** Creates the unit spawner dialog. */
function UnitSpawnerDialog() {
    const dialog = new BaseDialog("$mutl.title.unitconfig");
    const title = new RunnableAction(), pos = new RunnableAction();
    
    /** Button for a unit in the unit selection. */
    function UnitSelect(unit) {
        const b = new Button(Styles.clearTransi);
        b.clearChildren();
        b.image(new TextureRegionDrawable(unit.uiIcon)).size(42).scaling(Scaling.fit);
        b.clicked(() => {
            c.selUnit = unit;
            title.run();
        });

        return b;
    }
    
    /** Button for a team in the team selection. */
    function TeamSelect(team) {
        const b = new Button(Styles.modsb);
        b.clearChildren();
        b.image().color(team.color).grow();
        b.clicked(() => {
            c.selTeam = team;
            title.run();
        });
        
        return b;
    }
    
    /** Field for an axis in the position selection. */
    function PosSelect(axis, max) {
        const field = Elem.newField(c.selPos[axis], input => {
            let int = (!input || isNaN(input)) ? 0 : parseFloat(input);
            let pos = Mathf.clamp(int, 0, max);
            
            c.selPos[axis] = pos;
        });
        
        field.setFilter(TextField.TextFieldFilter.digitsOnly);
        
        return field;
    }
    
    /** Spawns the unit with the current configuration. */
    function spawnUnit(unit, team, pos) {
        for (let i = 0; i < c.spawnAmount.get(); i++) {
            let x = pos.x + (c.scatter.get() ? Mathf.range(c.scatterRadius.get()) : 0);
            let y = pos.y + (c.scatter.get() ? Mathf.range(c.scatterRadius.get()) : 0);

            unit.spawn(team, x * 8, y * 8);
        }
    }
    
    dialog.addCloseButton();
    
    // table for unit selection
    dialog.cont.table(Tex.button, t => {
        t.top().left();
        
        t.add("$mutl.header.units").color(Pal.accent).growX().padLeft(4);
        t.row();
        
        t.image().color(Pal.accent).height(4).growX().pad(4).padBottom(12);
        t.row();
        
        t.pane(p => {
            p.top();
            
            let r = 0;
            
            Vars.content.units().each(unit => {
                p.add(new UnitSelect(unit)).size(48).pad(4);
                
                if (++r % 6 == 0) p.row();
            });
        }).growX();
    }).size(420);
    
    if (Core.graphics.isPortrait()) dialog.cont.row();
    
    // table for the main section
    dialog.cont.table(null, t => {
        // configuration panel
        t.table(Tex.button, t2 => {
            t2.top();

            // information title of selected unit and team
            t2.table(null, t3 => {
                title.setRunnable(() => {
                    let unit = c.selUnit, team = c.selTeam;
                    
                    t3.clearChildren();
                    t3.top();
                    
                    t3.table(null, ta => {
                        ta.image(new TextureRegionDrawable(unit.uiIcon)).size(42).scaling(Scaling.fit);
                        ta.add(unit.localizedName).color(team.color).padLeft(6);
                    }).growX().padBottom(4);
                    
                    t3.row();
                    
                    t3.image().color(team.color).height(4).growX().pad(4).padBottom(12);
                });
                
                title.run();
            }).growX();
    
            t2.row();
            
            // team selection
            t2.pane(p => {
                let r = 0;
                
                for (let team of Team.all) {
                    p.add(new TeamSelect(team)).size(48).pad(4);
                    
                    if (++r % 6 == 0) p.row();
                }
            }).height(160).growX().padBottom(12);
            
            t2.row();
            
            // position selection
            t2.table(null, t3 => {
                t3.table(null, ta => {
                    pos.setRunnable(() => {
                        ta.clearChildren();
                        
                        ta.add("X:").padRight(6);
                        ta.add(new PosSelect("x", Vars.world.width())).size(120, 40).pad(3);
                        
                        ta.add("Y:").padRight(6);
                        ta.add(new PosSelect("y", Vars.world.height())).size(120, 40).pad(3);
                    });
                    
                    pos.run();
                });
                
                // set position to the player's position
                t3.button(Icon.down, Styles.clearTransi, () => {
                    c.selPos.x = Math.round(Vars.player.x / 8);
                    c.selPos.y = Math.round(Vars.player.y / 8);
                    
                    pos.run();
                }).size(48);
            }).growX();
        }).size(420, 354).padBottom(6);
        
        t.row();
        
        t.table(null, t2 => {
            t2.button("$mutl.spawnunit", () => {
                spawnUnit(c.selUnit, c.selTeam, c.selPos);
            }).size(288, 60).padRight(6);
            
            t2.button(Icon.pencil, () => {
                mutl.spawnopt().show();
            }).size(60).padRight(6);
            
            t2.button(Icon.info, () => {
                Vars.ui.content.show(c.selUnit);
            }).size(60);
        }).size(420, 60);
    }).size(420);
    
    return dialog;
}

module.exports = UnitSpawnerDialog;
