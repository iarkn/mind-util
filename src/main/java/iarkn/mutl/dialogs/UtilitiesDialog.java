package iarkn.mutl.dialogs;

import arc.*;
import arc.scene.ui.*;
import arc.scene.ui.layout.*;

import iarkn.mutl.*;

import mindustry.*;
import mindustry.gen.*;
import mindustry.ui.*;
import mindustry.ui.dialogs.*;

public class UtilitiesDialog extends BaseDialog {
    private Table tools;
    private Table config;

    public UtilitiesDialog() {
        super("@mutl.title.utilities");

        tools = new Table(Tex.button);
        config = new Table(Tex.button);

        shown(() -> rebuild(true));
        addCloseButton();
    }

    public void rebuild(boolean showTools) {
        cont.clearChildren();
        tools.clearChildren();
        config.clearChildren();

        if (showTools) {
            tools.defaults().size(300f, 60f);

            // options.button("@mutl.option.config", Styles.cleart, Index.display::show);
            tools.button("@mutl.tool.world", Styles.cleart, Index.world::show).disabled(!Vars.state.isGame()).row();
            tools.button("@mutl.tool.unitspawner", Styles.cleart, Index.spawner::show).disabled(!Vars.state.isGame()).row();
            // options.button("@mutl.option.modding", Styles.cleart, Index.modding::show);
        } else {
            config.defaults().size(300f, 60f);

            // TODO
        }

        cont.table(t -> {
            t.table(Tex.button, t2 -> {
                t2.table(t3 -> {
                    t3.left();
                    t3.defaults().size(48f);

                    t3.button(Icon.list, Styles.cleari, () -> rebuild(true));
                    t3.button(Icon.settings, Styles.cleari, () -> rebuild(false));
                }).grow();

                t2.add(showTools ? "@mutl.tools" : "@mutl.config").grow();
            }).grow().padBottom(6f);

            t.row();

            t.add(showTools ? tools : config);
        }).width(324f);
    }

    public void rebind(String key) {
        // TODO
    }
}
