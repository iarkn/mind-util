/** Draws two layer of swirls.
 *  @param {number} prog1 - 0 to 1, completition of the base swirl.
 *  @param {number} prog2 - 0 to 1, completition of the second swirl.
 */
function swirlStatus(x, y, color, radius, prog1, prog2, angle) {
    Draw.color(Pal.darkerGray);
    Lines.swirl(x, y, radius, prog1, angle);
        
    Draw.color(color);
    Lines.swirl(x, y, radius, prog2, angle);
}

/** Draws the status of the specified unit.
 *  @param {Unit} unit - the unit.
 */
function drawStatus(x, y, unit) {
    // health status
    swirlStatus(x, y, Pal.health, unit.type.hitSize + 20, 1, unit.healthf(), -90);
                
    // shield and payload status
    if (unit.shield != null && unit.shield > 0) {
        let shield = unit.abilities.find(a => a instanceof ForceFieldAbility);
        
        if (!shield) return; 
        
        let shieldf = unit.shield / shield.max / 2;
                    
        swirlStatus(x, y, Pal.accent, unit.type.hitSize + 17, 0.5, Mathf.clamp(shieldf, 0, 0.5), 360);
    }
                
    if (unit instanceof Payloadc) {
        let payloadf = unit.payloadUsed() / unit.type.payloadCapacity / 2;

        swirlStatus(x, y, Pal.items, unit.type.hitSize + 17, 0.5, Mathf.clamp(payloadf, 0, 0.5), 180);
    }
}

module.exports = {
    swirlStatus: swirlStatus,
    drawStatus: drawStatus
};