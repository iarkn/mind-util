const mutl = global.mutl, c = mutl.config;

function setup() {
    /* Add buttons on world load event on mobile */
    if (Vars.mobile) {
        Events.on(WorldLoadEvent, e => {
            const tl = Vars.ui.hudGroup.getChildren().get(3);
            const mobile = tl.find("mobile buttons"), stat = tl.cells;

            if (!tl || !mobile || !stat) return;

            mobile.button(Icon.layers, Styles.clearTransi, () => {
                mutl.menu().show();
            }).name("mutl-utilities");

            mobile.button(Icon.terminal, Styles.clearTransi, () => {
                // TODO mutl.console().show();
                mutl.console(c.consoleShown = !c.consoleShown);
                // c.consoleShown = !c.consoleShown;
            }).name("mutl-console");

            mobile.image().color(Pal.gray).width(4).fill();

            // align 'waves/editor' table to the left
            stat.get(2).left();
        });
    } else {
        /* ...or a listener for the Utilities Menu keybind on desktop */
        Events.run(Trigger.update, () => {
            if (Vars.state.isGame() && Core.input.keyTap(c.menuKey.get().value)) {
                mutl.menu().show();
            }
        });
    }
}

module.exports = setup;
