package mutl.dialogs;

import arc.*;
import arc.graphics.*;
import arc.scene.ui.*;
import arc.scene.ui.layout.*;

import mindustry.ui.dialogs.*;
import mindustry.gen.*;

import mutl.display.*;

public class DisplayDialog extends BaseDialog {

    public DisplayDialog(DisplayHandler handler) {
        super("@mutl.title.display");

        boolean portrait = Core.graphics.isPortrait();
        float width = portrait ? 480f : 890f;
        float height = portrait ? 840f : 440f;

        cont.pane(p -> {
            int r = 0;

            for (Display display: handler.list()) {
                DisplayTable dt = new DisplayTable(display);
                dt.add(p);

                if (portrait) {
                    p.row();
                } else if (++r % 2 == 0) {
                    p.row();
                }
            }
        }).size(width, height).get().setFadeScrollBars(true);

        addCloseButton();
    }

    public static class DisplayTable extends Table {
        private Display display;

        public DisplayTable(Display display) {
            this.display = display;
        }

        public void add(Table table) {
            Table displayTable = new Table(Tex.button);
            displayTable.top().left();

            displayTable.add(display.localizedName).growX().padLeft(4f);
            displayTable.row();

            displayTable.pane(p -> {
                p.top().left();
                p.add(display.info).color(color.lightGray).wrap().growX().padLeft(4f);
            }).growX().height(60f).padTop(4f).get().setFadeScrollBars(true);

            displayTable.row();

            displayTable.table(t -> {
                for (DisplayOption opt : DisplayOption.values()) {
                    CheckBox box = new CheckBox(opt.localized());

                    box.update(() -> box.setChecked(display.getOption(opt)));
                    box.changed(() -> display.setOption(opt, box.isChecked()));

                    t.add(box).size(130f, 40f).pad(4f);
                }
            }).growX().padTop(6f);

            table.add(displayTable).size(430f, 160f).pad(3f);
        }
    }
}
