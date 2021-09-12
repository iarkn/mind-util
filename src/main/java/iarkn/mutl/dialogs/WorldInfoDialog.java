package iarkn.mutl.dialogs;

import arc.*;
import arc.graphics.*;
import arc.scene.ui.*;
import arc.scene.ui.layout.*;
import arc.util.*;

import mindustry.*;
import mindustry.content.*;
import mindustry.game.*;
import mindustry.game.EventType.*;
import mindustry.gen.*;
import mindustry.ui.dialogs.*;

public class WorldInfoDialog extends BaseDialog {
    public boolean showPreviousWave = false;
    public int waveRange = 30;

    private Runnable waves;

    public WorldInfoDialog() {
        super("@mutl.title.world");

        // List of waves
        cont.table(Tex.button, t -> {
            t.pane(p -> {
                waves = () -> {
                    p.clearChildren();
                    p.top().left();

                    int start = showPreviousWave ? 0 : Vars.state.wave - 1;
                    int end = Vars.state.wave + waveRange;

                    for (int i = start; i < end; i++) {
                        addWaveRow(p, i);
                    }
                };
            }).size(390f, 340f);

            t.row();

            t.table(t2 -> {
                t2.add("@mutl.wave.range").width(64f).padRight(6f);
                t2.field(waveRange + "", TextField.TextFieldFilter.digitsOnly, val -> {
                    waveRange = Integer.parseInt(val);
                    waves.run();
                }).valid(val -> Strings.canParsePositiveInt(val)).width(80f).padRight(12f);

                t2.check("@mutl.wave.showprev", showPreviousWave, b -> {
                    showPreviousWave = b;
                    waves.run();
                }).width(190f);
            }).growX().height(60f);
        }).size(420f);

        Events.on(WorldLoadEvent.class, e -> waves.run());

        addCloseButton();
    }

    private void addWaveRow(Table table, int wave) {
        Color color = (wave + 1) == Vars.state.wave ? Color.white : Color.gray;

        table.top().left();

        table.table(t -> {
            t.left();
            t.add(wave + 1 + "").color(color).size(60f).padRight(6f);

            for (SpawnGroup group : Vars.state.rules.spawns) {
                // Skip to next group of this one doesn't spawn at this wave
                if (group.getSpawned(wave) <= 0) continue;

                addSpawnGroup(t, group, wave);
            }
        }).growX().height(60f);

        table.row();
    }

    private void addSpawnGroup(Table table, SpawnGroup group, int wave) {
        Color color = group.effect == StatusEffects.boss ? Color.red : Color.white;

        // TODO Tooltip to show status effect, health, shield, etc.
        table.stack(
            new Image(group.type.uiIcon).setScaling(Scaling.fit),
            new Table(t -> {
                t.bottom().left();
                t.add(group.getSpawned(wave) + "");
            })
        ).size(42f).pad(4f);
    }
}
