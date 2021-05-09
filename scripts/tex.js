module.exports = {
    /** Draws two layer of swirls.
     *  @param {number} prog1 - 0 to 1, completition of the base swirl.
     *  @param {number} prog2 - 0 to 1, completition of the second swirl.
     */
    swirlStatus(x, y, color, radius, prog1, prog2, angle) {
        Draw.color(Pal.darkerGray);
        Lines.swirl(x, y, radius, prog1, angle);
        
        Draw.color(color);
        Lines.swirl(x, y, radius, prog2, angle);
    }
};