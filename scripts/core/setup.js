/*
 *  Copyright (C) 2021 iarkn
 *
 *  mind-util is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  mind-util is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

const mutl = global.mutl, c = mutl.config;

function setup() {
    /* Add buttons on world load event on mobile... */
    if (Vars.mobile) {
        Events.on(WorldLoadEvent, e => {
            const table = Vars.ui.hudGroup.getChildren().get(3).find("mobile buttons");
        
            if (table == null) return;
            
            table.button(Icon.wrench, Styles.clearTransi, () => {
                mutl.menu().show();
            }).name("mutl-utilities");
            
            table.button(Icon.terminal, Styles.clearTransi, () => {
                // mutl.console().show();
            }).name("mutl-console");
            
            table.image().color(Pal.gray).width(4).fill();
        });
    } else {
        /* ...or a listener for the Utilities Menu keybind on desktop. */
        Events.run(Trigger.update, () => {
            if (Vars.state.isGame() && Core.input.keyTap(c.menuKey)) {
                mutl.menu().show();
            }
        });
    }
}

module.exports = setup;
