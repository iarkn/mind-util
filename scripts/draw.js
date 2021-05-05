const c = global.mutl.config;

Events.run(Trigger.draw, () => {
    let cx = Math.floor(Core.camera.position.x / Vars.tilesize),
        cy = Math.floor(Core.camera.position.y / Vars.tilesize);
    let cw = Math.floor(Core.camera.width / Vars.tilesize),
        ch = Math.floor(Core.camera.height / Vars.tilesize);
    
    /* Draws a circle with a radius of a turret's range for every turret. */
    if (c.turretRange) {
        Draw.draw(Layer.floor + 0.03, () => {
            for (let tile of Vars.indexer.getEnemy(Team.derelict, BlockFlag.turret).toArray()) {
                let block = tile.block(), build;
                
                if (tile.build != null) build = tile.build;
        
                if (block.range == null || block.range <= 0) continue;
                
                /* Whether the block's position is within the camera range. */
                if (Mathf.dst(cx, cy, tile.x, tile.y) < Mathf.dst(cw, ch)) {
                    Draw.color(build.team.color);
                    Draw.alpha(0.054);
                    
                    Fill.circle(build.x, build.y, block.range);
                    Lines.circle(build.x, build.y, block.range);
                }
            }
        });
    }
    
    if (c.unitRange) {
        Draw.draw(Layer.floor + 0.04, () => {
            // ...
        });
    }
});
