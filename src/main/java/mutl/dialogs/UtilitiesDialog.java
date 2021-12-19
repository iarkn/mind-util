package mutl.dialogs;

import arc.*;
import arc.scene.ui.*;
import arc.scene.ui.layout.*;

import mindustry.*;
import mindustry.gen.*;
import mindustry.ui.*;
import mindustry.ui.dialogs.*;

import mutl.*;

public class UtilitiesDialog extends BaseDialog {
    public Table tools;

    public UtilitiesDialog() {
        super("@mutl.title.utilities");

        tools = new Table(Tex.button);

        tools.defaults().size(300f, 60f);
        tools.button("@mutl.tool.unitspawner", Styles.cleart, Mutl.spawner::show).disabled(b -> !Vars.state.isGame()).row();
        tools.button("@mutl.tool.display", Styles.cleart, Mutl.display::show).row();
        tools.button("@mutl.tool.world", Styles.cleart, Mutl.world::show).disabled(b -> !Vars.state.isGame());

        cont.table(t -> {
            t.table(Tex.button, t2 -> t2.add("@mutl.header.tools")).grow();
            t.button(Icon.info, Mutl.about::show).size(60f).padLeft(6f);
        }).size(324f, 60f);

        cont.row();
        cont.add(tools);

        addCloseButton();
    }
}
