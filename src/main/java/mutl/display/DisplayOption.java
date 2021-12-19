package mutl.display;

import arc.*;

import java.util.*;

public enum DisplayOption {
    ALLY, ENEMY, PLAYER;

    public String localized() {
        return Core.bundle.get("mutl.display.option." + name().toLowerCase(Locale.ROOT));
    }
}
