package mutl.display;

import arc.graphics.g2d.*;
import arc.math.*;

import mindustry.entities.*;
import mindustry.game.*;
import mindustry.world.*;
import mindustry.world.blocks.defense.turrets.*;
import mindustry.world.meta.*;

import mutl.display.*;

import static arc.Core.camera;

import static mindustry.Vars.indexer;
import static mindustry.Vars.player;

public final class Displays {

    public static void load(DisplayHandler handler) {
        handler.add("mutl-turretrange", d -> {
            for (Tile tile : indexer.getEnemy(Team.derelict, BlockFlag.turret)) {
                if (tile.team() == player.team() && !d.ally()) continue;
                if (tile.team() != player.team() && !d.enemy()) continue;

                float cx = camera.position.x, cy = camera.position.y;
                float cw = camera.width, ch = camera.height;

                if (tile.block() instanceof Turret block && tile.build instanceof Turret.TurretBuild build) {
                    if (!build.hasAmmo() || Mathf.dst(cx, cy, build.x, build.y) >= Mathf.dst(cw, ch)) continue;

                    Draw.color(build.team.color);
                    Draw.alpha(0.3f);

                    Lines.circle(build.x, build.y, block.range);
                }
            }
        });

        handler.add("mutl-unitrange", d -> {
            Units.nearby(null, player.x, player.y, Mathf.dst(camera.width, camera.height), u -> {
                if (u == player.unit() && !d.player()) return;
                if (u != player.unit() && u.team() == player.team() && !d.ally()) return;
                if (u.team() != player.team() && !d.enemy()) return;

                if (u.dead() || u.type.range <= 0) return;

                Draw.color(u.team().color);
                Draw.alpha(0.3f);

                Lines.circle(u.x, u.y, u.type.range);
            });
        });

        handler.add("mutl-unitstatus", d -> {
            // TODO Show unit status when pointer is hovering above it on desktop and
            // just show the status on mobile
        });
    }
}
