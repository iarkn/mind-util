package mutl.display;

import mutl.display.*;

public final class Displays {

    public static void load(DisplayHandler handler) {
        handler.add("mutl-turretrange", () -> {});
        handler.add("mutl-unitrange", () -> {});
        handler.add("mutl-unitstatus", () -> {});
    }
}
