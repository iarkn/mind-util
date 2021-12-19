package mutl.dialogs;

import arc.*;
import arc.graphics.*;
import arc.scene.ui.*;

import mindustry.*;
import mindustry.gen.*;
import mindustry.graphics.*;

import mutl.*;

public class AboutMutlDialog extends Dialog {

    public AboutMutlDialog() {
        super("");

        cont.table(t -> {
            t.add("mind-util v" + Vars.mods.getMod(Mutl.class).meta.version).color(Pal.accent).growX();
            t.row();

            t.add("@mutl.about").color(Color.lightGray).wrap().growX().padTop(6f);
        }).width(420f).padBottom(12f);

        cont.row();

        cont.table(t -> {
            t.defaults().size(180f, 48f).pad(3f);
            t.button("@mutl.wiki", Icon.bookOpen, () -> {
                Core.app.openURI("https://github.com/iarkn/mind-util/wiki");
            });
            t.button("@mutl.github", Icon.github, () -> {
                Core.app.openURI("https://github.com/iarkn/mind-util");
            });
        }).size(420f, 60f);

        buttons.defaults().size(210f, 64f);
        buttons.button("@back", Icon.left, this::hide);

        closeOnBack();
        setFillParent(true);
    }
}
