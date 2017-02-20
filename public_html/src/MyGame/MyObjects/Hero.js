/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture) {
    this.kDelta = 0.3;

    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(35, 50);
    this.mDye.getXform().setSize(9, 12);
    this.mDye.setElementPixelPositions(0, 120, 0, 180);
    GameObject.call(this, this.mDye);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

// x, y describe the point toward which the hero will try to move
Hero.prototype.update = function (x, y) {
    var xdist = Math.abs(this.mDye.getXform().getXPos() - x);
    var ydist = Math.abs(this.mDye.getXform().getYPos() - y);
    var dist = Math.sqrt(xdist * xdist + ydist * ydist);
    this.rotateObjPointTo([x, y], 0.05);
    this.setSpeed(dist / 20);
    GameObject.prototype.update.call(this);
//    // control by WASD - *OLD MOVEMENT*
//    var xform = this.getXform();
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
//        xform.incYPosBy(this.kDelta);
//    }
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
//        xform.incYPosBy(-this.kDelta);
//    }
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
//        xform.incXPosBy(-this.kDelta);
//    }
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
//        xform.incXPosBy(this.kDelta);
//    }
};