// Physics Component

var mRelaxationCount = 15; // number of relaxation iteration
var mRelaxationOffset = 1/mRelaxationCount; // porportion to apply when scaling friction
var mPosCorrectionRate = 0.8; // percentage of separation to project objects
var mSystemtAcceleration = [0, -50]; // system-wide default acceleration
var mRelaxationLoopCount = 0; // the current relaxation count
var mHasOneCollision = false; // detect the first collision
var mCollisionInfo = null; // information of the current collision

var gEngine = gEngine || { }; // initialize the variable while ensuring it is not redefined
gEngine.Physics = (function () {
    var mPublic = { };
    return mPublic;
}());


var initialize = function() {
mCollisionInfo = new CollisionInfo(); // to avoid allocating this constantly
};

var _positionalCorrection = function (s1, s2, collisionInfo) {
    var s1InvMass = s1.getInvMass();
    var s2InvMass = s2.getInvMass();
    var num = collisionInfo.getDepth() / (s1InvMass + s2InvMass) * mPosCorrectionRate;
    var correctionAmount = [0, 0];
    vec2.scale(correctionAmount, collisionInfo.getNormal(), num);
    var ca = [0, 0];
    vec2.scale(ca, correctionAmount, s1InvMass);
    var s1Pos = s1.getPosition();
    vec2.subtract(s1Pos, s1Pos, ca);
    vec2.scale(ca, correctionAmount, s2InvMass);
    var s2Pos = s2.getPosition();
    vec2.add(s2Pos, s2Pos, ca);
};
