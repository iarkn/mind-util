const c = global.mutl.config;

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
                
                /* Whether the block's position is within the camera range. */
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
        /* Set position from bottom-left to top-right of the camera. */
        let ux = (cx - cw / 2) * 8 - 20, uy = (cy - ch / 2) * 8 - 20;
        let uw = cw * 8 + 20, uh = ch * 8 + 20;
        
        Draw.draw(Layer.overlayUI + 0.04, () => {
            /* Iterate every unit that is within the camera. */
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
    
    if (c) {
        
    }
});
