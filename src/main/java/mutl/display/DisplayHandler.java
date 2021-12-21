package mutl.display;

import arc.func.*;
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

    public void add(String name, Cons<Display> cons) {
        add(new Display(name, cons));
    }

    public void add(Display display) {
        list.add(display);
    }

    public Seq<Display> list() {
        return list;
    }
}
