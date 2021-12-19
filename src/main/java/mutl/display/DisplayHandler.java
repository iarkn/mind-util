package mutl.display;

import arc.graphics.g2d.*;
import arc.struct.*;

import mindustry.graphics.*;

import mutl.display.*;

public class DisplayHandler {
    private Seq<Display> list = new Seq<>();

    public void draw() {
        for (Display display : list) {
            if (!display.enabled()) continue;

            Draw.draw(display.layer, display::run);
        }
    }

    public void add(String name, Runnable run) {
        add(new Display(name, run));
    }

    public void add(Display display) {
        list.add(display);
    }

    public Seq<Display> list() {
        return list;
    }
}
