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
