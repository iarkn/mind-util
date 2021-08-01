package iarkn.mutl;

import arc.*;
import arc.input.*;
import arc.util.*;

import mindustry.*;
import mindustry.game.EventType.*;
import mindustry.mod.*;

public class MutlMod extends Mod {

    public MutlMod() {
        if (Vars.mobile) {
            Events.on(WorldLoadEvent.class, e -> {
                Log.info("mobile menu");
            });
        } else {
            Events.run(Trigger.update, () -> {
                if (Vars.state.isGame() && Core.input.keyTap(KeyCode.f9)) {
                    Log.info("tapped f9");
                }
            });
        }
    }

    @Override
    public void init() {
        Vars.enableConsole = true;

        // Enable script console fragment on mobile
        if (Vars.mobile) {
            Log.info("abcd");
        }
    }
}
