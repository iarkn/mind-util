if (Vars.headless) {
    Core.app.post(() => {
        throw new Error("This mod can only be run client-side!");
    });
}

global.mutl = {};

Vars.enableConsole = true;

const contents = [
    "tex", "config",
    
    "ui", "draw"
];

/** Handles requiring files with custom or multiple directories.
 *  @param {Array}          array   - The array containing the file tree in the scripts directory.
 *  @param {Array.<String>} path    - Path to a file. Each element contains only one directory name.
 *
 *  @returns {Array.<String>} List of files that are going to be loaded.
 */
function handle(array, path) {
    // path to file (separated by element), e.g. ["blocks", "defense", "turrets"].
    let pathf = path == null ? [] : path;
    let result = [];
    
    for (let a of array) {
        if (typeof a === "object") { // if 'a' is an object.
            pathf.push(a.name);
            let c = handle(a.contents, pathf);
            
            // merge the result.
            result = result.concat(c);
            pathf.pop();
        } else { // if 'a' is an array of contents.
            result.push(pathf.join("/") + "/" + a);
        }
    }

    return result;
}

for (let file of handle(contents)) {
    let name = file.split("/").pop();
    
    require(file);
    global.mutl[name] = require(file);
}