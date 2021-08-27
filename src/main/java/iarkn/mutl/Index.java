package iarkn.mutl;

import iarkn.mutl.dialogs.*;

public class Index {
    public static WorldInfoDialog world;
    public static UnitSpawnerDialog spawner;
    public static UtilitiesDialog util;

    public static void init() {
        world = new WorldInfoDialog();
        spawner = new UnitSpawnerDialog();
        util = new UtilitiesDialog();
    }
}
