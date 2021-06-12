const mutl = global.mutl;

function setup() {
    /* Add buttons on world load event on mobile... */
    if (Vars.mobile) {
        Events.on(WorldLoadEvent, e => {
            const table = Vars.ui.hudGroup.getChildren().get(3).find("mobile buttons");
        
            if (table == null) return;
            
            table.button(Icon.wrench, Styles.clearTransi, () => {
                // mutl.menu.show();
            }).name("mutl-utilities");
            
            table.button(Icon.terminal, Styles.clearTransi, () => {
                // mutl.console.show();
            }).name("mutl-console");
            
            table.image().color(Pal.gray).width(4).fill();
        });
    } else {
        /* ...or a listener for the Utilities Menu keybind on desktop. */
        Events.run(Trigger.update, () => {
            if (Vars.state.isGame() && Core.input.keyTap(c.menuKey)) {
                mutl.menu.show();
            }
        });
    }
}

module.exports = setup;
