const c = global.mutl.config,
    tex = global.mutl.tex;

Events.run(Trigger.draw, () => {
    let cx = Math.floor(Core.camera.position.x / Vars.tilesize),
        cy = Math.floor(Core.camera.position.y / Vars.tilesize);
    let cw = Math.floor(Core.camera.width / Vars.tilesize),
        ch = Math.floor(Core.camera.height / Vars.tilesize);
    
    /* Draws a circle with a radius of a turret's range for every turret. */
    if (c.turretRange) {
        Draw.draw(Layer.overlayUI + 0.03, () => {
            for (let tile of Vars.indexer.getEnemy(Team.derelict, BlockFlag.turret).toArray()) { 
                if (!tile.build) continue;
        
                let block = tile.block(), build = tile.build;
                
                if (block.range == null || block.range <= 0) continue;
                
                // whether the block's position is within the camera range.
                if (Mathf.dst(cx, cy, tile.x, tile.y) < Mathf.dst(cw, ch)) {
                    Draw.color(build.team.color);
                    Draw.alpha(0.36);
                    
                    // Fill.circle(build.x, build.y, block.range);
                    Lines.circle(build.x, build.y, block.range);
                }
            }
        });
    }
    
    /* Draws a circle on every unit with a radius of its range. */
    if (c.unitRange) {
        // set position from bottom-left to top-right of the camera.
        let ux = (cx - cw / 2) * 8 - 20, uy = (cy - ch / 2) * 8 - 20;
        let uw = cw * 8 + 20, uh = ch * 8 + 20;
        
        Draw.draw(Layer.overlayUI + 0.04, () => {
            // iterate every unit that is within the camera.
            for (let unit of Groups.unit.intersect(ux, uy, uw, uh).toArray()) {
                let type = unit.type;
                
                if (!type.range || type.range <= 0 || !type.hasWeapons()) continue;
                
                Draw.color(unit.team.color);
                Draw.alpha(0.36);
                    
                // Fill.circle(build.x, build.y, block.range);
                Lines.circle(unit.x, unit.y, type.range);
            }
        });
    }
    
    /* Display the status of the controlled entity, */
    if (c.controlledStatus) {
        if (!Vars.player.unit() || Vars.player.unit() == Nulls.unit) return;
        
        let unit = Vars.player.unit();
        let px = Vars.player.x, py = Vars.player.y;
        
        Draw.draw(Layer.overlayUI + 0.08, () => { // TODO: more statuses, especially for turrets.
            // whether the player is within the camera range.
            if (Mathf.dst(cx, cy, px / 8, py / 8) < Mathf.dst(cw, ch)) {
                // health status.
                tex.swirlStatus(px, py, Pal.health, unit.type.hitSize + 20, 1, unit.healthf(), -90);
                
                // shield and payload status.
                if (unit.shield > 0) {
                    let shield = unit.abilities.find(a => a instanceof ForceFieldAbility);
                    let shieldf = unit.shield / shield.max / 2;
                    
                    tex.swirlStatus(px, py, Pal.accent, unit.type.hitSize + 17, 0.5, Mathf.clamp(shieldf, 0, 0.5), 360);
                }
                
                if (unit instanceof Payloadc) {
                    let payloadf = unit.payloadUsed() / unit.type.payloadCapacity / 2;

                    tex.swirlStatus(px, py, Pal.items, unit.type.hitSize + 17, 0.5, Mathf.clamp(payloadf, 0, 0.5), 180);
                }
            }
        });
    }
});
