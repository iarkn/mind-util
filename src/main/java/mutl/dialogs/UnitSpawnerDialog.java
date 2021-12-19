package mutl.dialogs;

import arc.*;
import arc.math.*;
import arc.scene.style.*;
import arc.scene.ui.*;
import arc.scene.ui.layout.*;
import arc.util.*;

import mindustry.*;
import mindustry.content.*;
import mindustry.game.*;
import mindustry.gen.*;
import mindustry.graphics.*;
import mindustry.type.*;
import mindustry.ui.*;
import mindustry.ui.dialogs.*;
import mindustry.ui.dialogs.SettingsMenuDialog.*;

public class UnitSpawnerDialog extends BaseDialog {
    public UnitType unit = UnitTypes.dagger;
    public Team team = Team.sharded;
    public float x = 0f, y = 0f;

    private SettingsTable options;
    private Runnable info, position;

    public UnitSpawnerDialog() {
        super("@mutl.title.unitconfig");

        options = new SettingsTable();

        options.sliderPref("mutl-spawnamount", 1, 1, 100, e -> e + " " + Core.bundle.get("mutl.units"));
        options.sliderPref("mutl-scatterradius", 40, 0, 450, e -> e + " " + Core.bundle.get("unit.blocks"));

        options.checkPref("mutl-scatter", false);

        BaseDialog optionsDialog = new BaseDialog("@mutl.title.spawnoptions");
        optionsDialog.addCloseButton();
        optionsDialog.cont.add(options);

        addCloseButton();

        // Unit selection
        cont.table(Tex.button, t -> {
            t.top().left();

            t.add("@mutl.header.units").color(Pal.accent).growX().padLeft(4f);
            t.row();

            t.image().color(Pal.accent).growX().height(4f).pad(4f).padBottom(12f);
            t.row();

            t.pane(p -> {
                p.top();

                int r = 0;

                for (UnitType u : Vars.content.units()) {
                    p.button(new TextureRegionDrawable(u.uiIcon), Styles.cleari, 38f, () -> {
                        unit = u;
                        info.run();
                    }).size(48f).pad(4f);

                    if (++r % 6 == 0) p.row();
                }
            }).growX().get().setFadeScrollBars(true);
        }).size(420f);

        if (Core.graphics.isPortrait()) cont.row();

        cont.table(t -> {
            // Configuration panel
            t.table(Tex.button, t2 -> {
                t2.top();

                // Selected unit and team information
                t2.table(t3 -> {
                    info = () -> {
                        t3.clearChildren();
                        t3.top();

                        t3.table(ta -> {
                            ta.image(new TextureRegionDrawable(unit.uiIcon)).size(42f).scaling(Scaling.fit);
                            ta.add(unit.localizedName).color(team.color).padLeft(6f);
                        }).growX().padBottom(4f);

                        t3.row();

                        t3.image().color(team.color).growX().height(4f).pad(4f).padBottom(12f);
                    };

                    info.run();
                }).growX();

                t2.row();

                // Team selection
                t2.pane(p -> {
                    int r = 0;

                    for (Team e : Team.all) {
                        p.button(b -> b.image().color(e.color).grow(), Styles.modsb, () -> {
                            team = e;
                            info.run();
                        }).size(48f).pad(4f);

                        if (++r % 6 == 0) p.row();
                    }
                }).growX().padBottom(6f).get().setFadeScrollBars(true);

                t2.row();

                // Position selection
                t2.table(t3 -> {
                    t3.table(ta -> {
                        position = () -> {
                            ta.clearChildren();

                            ta.add("X:").padRight(6f);
                            ta.field(x + "", TextField.TextFieldFilter.digitsOnly, val -> {
                                x = Float.parseFloat(val);
                            }).valid(val -> Strings.canParseFloat(val) && Float.parseFloat(val) >= 0f && Float.parseFloat(val) <= Vars.world.width())
                            .size(120f, 40f).pad(3f);

                            ta.add("Y:").padRight(6f);
                            ta.field(y + "", TextField.TextFieldFilter.digitsOnly, val -> {
                                y = Float.parseFloat(val);
                            }).valid(val -> Strings.canParseFloat(val) && Float.parseFloat(val) >= 0f && Float.parseFloat(val) <= Vars.world.height())
                            .size(120f, 40f).pad(3f);
                        };
                    });

                    position.run();

                    t3.button(Icon.down, Styles.clearTransi, () -> {
                        setPos(Vars.player.x / 8f, Vars.player.y / 8f);
                        position.run();
                    }).size(48f);
                }).growX();
            }).size(420f, 354f).padBottom(6f);

            t.row();

            t.table(t2 -> {
                t2.defaults().size(60f);

                t2.button("@mutl.spawnunit", this::spawnUnit).width(288f);
                t2.button(Icon.pencil, optionsDialog::show).padLeft(6f);
                t2.button(Icon.info, () -> Vars.ui.content.show(unit)).padLeft(6f);
            }).height(60f);
        }).size(420f);
    }

    /** Spawns the selected unit with the current configuration. */
    public void spawnUnit() {
        for (int i = 0; i < Core.settings.getInt("mutl-spawnamount"); i++) {
            float radius = Core.settings.getBool("mutl-scatter") ? Core.settings.getInt("mutl-scatterradius") : 0f;
            float px = x + Mathf.range(radius), py = y + Mathf.range(radius);

            unit.spawn(team, px * 8f, py * 8f);
        }
    }

    /** Shortcut to set unit spawn position. */
    public void setPos(float x, float y) {
        this.x = x;
        this.y = y;
    }
}
