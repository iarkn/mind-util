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

if (Vars.headless) {
    Log.err("'receptea/mind-util' is a client-side mod; it does not work on headless servers.");
    Core.app.exit();
}

global.mutl = {};

const contents = [
    { dir: "util/", contains: ["config", "tex"] },
    { dir: "ui/",   contains: ["configpanel", "unitspawner", "console", "menu"] },
    { dir: "core/", contains: ["setup"] }
];

/** Handles requiring files with custom or multiple directories.
 *  @param {Array}          array   - The array containing the file tree in the scripts directory.
 *  @param {Array<String>}  path    - Path to a file. Each element contains only one directory name.
 *
 *  @returns {Array<String>} List of files that are going to be loaded.
 */
function handle(array, path) {
    // path to file (separated by element), e.g. ["blocks", "defense", "turrets"].
    let pathf = path == null ? [] : path;
    let result = [];
    
    for (let a of array) {
        if (typeof a === "object") { // if 'a' is a directory.
            pathf.push(a.dir);
            let c = handle(a.contains, pathf);
            
            // merge the result.
            result = result.concat(c);
            pathf.pop();
        } else { // if 'a' is an array of contents.
            result.push("mutl/" + pathf.join("/") + a);
        }
    }

    return result;
}

for (let file of handle(contents)) {
    global.mutl[file.split("/").pop()] = require(file);
}

global.mutl.setup();
