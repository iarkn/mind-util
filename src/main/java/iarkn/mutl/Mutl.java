package iarkn.mutl;

import arc.*;
import arc.input.*;
import arc.scene.*;
import arc.scene.ui.layout.*;

import iarkn.mutl.dialogs.*;

import mindustry.*;
import mindustry.game.EventType.*;
import mindustry.gen.*;
import mindustry.graphics.*;
import mindustry.mod.*;
import mindustry.ui.*;

public class Mutl extends Mod {
    public static AboutMutlDialog about;
    public static WorldInfoDialog world;
    public static UnitSpawnerDialog spawner;
    public static UtilitiesDialog util;

    public Mutl() {
        // Initialize on client load event because Core.scene.getStyle(Class<T> type)
        // might throw an error otherwise
        Events.on(ClientLoadEvent.class, e -> {
            load();

            if (Vars.mobile) {
                WidgetGroup hud = Vars.ui.hudGroup;
                Table mobile = hud.find("mobile buttons");

                mobile.button(Icon.layers, Styles.clearTransi, () -> {
                    util.show();
                }).name("mutl-utilities");

                mobile.button(Icon.terminal, Styles.clearTransi, () -> {
                    // TODO
                }).name("mutl-console");

                mobile.image().color(Pal.gray).width(4f).fill();
                // Align 'waves/editor' cell to the left
                ((Table) hud.find("overlaymarker")).getCell(hud.find("waves/editor")).left();
            }
        });

        if (!Vars.mobile) {
             Events.run(Trigger.update, () -> {
                if (Core.input.keyTap(KeyCode.f9)) {
                    util.show();
                }
            });
        }
    }

    public void load() {
        about = new AboutMutlDialog();
        world = new WorldInfoDialog();
        spawner = new UnitSpawnerDialog();
        util = new UtilitiesDialog();
    }

    @Override
    public void init() {
        Vars.enableConsole = true;
    }
}
