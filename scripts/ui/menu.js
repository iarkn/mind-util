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

function showRebindDialog() {
    const dialog = new BaseDialog();
    
    dialog.cont.table(t => {
        // TODO
    });
}

/** Creates the utilities menu dialog, */
function MenuDialog() {
    const dialog = new BaseDialog("$mutl.title.utilities");
    
    const st = Styles.cleart;
    const main = new RunnableAction();
    
    // 1 for categories, 0 for mod settings.
    let mode = 1;

    /** Shows a list of categories in the utilities menu. */
    function showCategories(t) {
        t.defaults().size(300, 60);
    
        t.button("$mutl.option.config", st, () => {}).row();
        t.button("$mutl.option.unitspawn", st, () => mutl.unitspawner().show()).row();
        t.button("$mutl.option.world", st, () => {}).row();
        t.button("$mutl.option.modding", st, () => {});
    }

    /** Shows the configuration for mind-util's settings. */
    function modSettings(t) {
        t.defaults().size(300, 60);
        t.top().left();
        
        // keybind to show utilities menu, disabled on mobile.
        t.button(Core.bundle.format(c.menuKey.name, KeyCode.byOrdinal(c.menuKey.val()).value), st, () => {
            showRebindDialog();
        }).disabled(b => Vars.mobile);
    }

    dialog.addCloseButton();

    dialog.cont.table(null, t => {
        main.setRunnable(() => {
            t.clearChildren();
            
            t.table(Tex.button, t2 => {
                // buttons to switch between the two modes.
                t2.table(null, t3 => {
                    t3.left();
                    
                    t3.button(Icon.list, Styles.cleari, () => {
                        mode = 1;
                        main.run();
                    }).size(48);
        
                    t3.button(Icon.settings, Styles.cleari, () => {
                        mode = 0;
                        main.run();
                    }).size(48);
                }).grow();
                
                t2.add(mode ? "$mutl.categories" : "$mutl.settings").grow();
            }).grow().padBottom(6);
            
            t.row();
            
            // table of the selected mode.
            t.table(Tex.button, t2 => {
                mode ? showCategories(t2) : modSettings(t2);
            }).width(324);
        });
        
        main.run();
    }).width(324);
    
    return dialog;
}

module.exports = MenuDialog;
