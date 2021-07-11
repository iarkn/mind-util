// TODO this is temporary

Vars.enableConsole = true;

function toggle(shown) {
    const frag = Vars.ui.scriptfrag;
    frag.clearChildren();

    frag.table(null, t => {
        t.defaults().size(48);

        t.button(Icon.pencil, Styles.clearTransi, () => frag.toggle());
        t.button(Icon.trash, Styles.clearTransi, () => frag.clearMessages());
    });

    frag.visibility = () => shown;
}

module.exports = toggle;
