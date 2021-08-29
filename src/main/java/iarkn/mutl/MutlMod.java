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

public class MutlMod extends Mod {

    public MutlMod() {
        // Initialize on client load event because Core.scene.getStyle(Class<T> type)
        // might throw an error otherwise
        Events.on(ClientLoadEvent.class, e -> {
            Index.init();

            if (Vars.mobile) {
                Table mobile = Vars.ui.hudGroup.find("mobile buttons");

                mobile.button(Icon.layers, Styles.clearTransi, () -> {
                    Index.util.show();
                }).name("mutl-utilities");

                mobile.button(Icon.terminal, Styles.clearTransi, () -> {
                    // TODO
                }).name("mutl-console");

                mobile.image().color(Pal.gray).width(4f).fill();
                // Align 'waves/editor' cell to the left
                ((Table) Vars.ui.hudGroup.find("overlaymarker")).getCells().get(2).left();
            }
        });

        if (!Vars.mobile) {
             Events.run(Trigger.update, () -> {
                if (Core.input.keyTap(KeyCode.f9)) {
                    Index.util.show();
                }
            });
        }
    }

    @Override
    public void init() {
        Vars.enableConsole = true;
    }
}
