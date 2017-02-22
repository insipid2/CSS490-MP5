function RigidCircle(xform) {
    this.mXform = xform;
    this.mCenter = null;
    this.mRefVertex = null;
    this.mRadius = null;
    this.numCircleLines = 32;
    
    this.mLines = [];
    var x1 = 2, y1 = 0, x2 = 2, y2 = 20;
    
    for (var i = 0; i < this.numCircleLines; i++) {
        this.mCurrentLine = new LineRenderable();
        this.mCurrentLine.setFirstVertex(x1, y1);
        this.mCurrentLine.setSecondVertex(x2, y2);
        this.mCurrentLine.setColor([1.0, 1.0, 1.0, 1.0]);
        this.mLines.push(this.mCurrentLine);
    }
}

RigidCircle.prototype.update = function () {
    // update the reference points: center, radius, reference vertex (for calculating radius)
    this.mCenter = this.mXform.getPosition();
    this.mRefVertex = vec2.fromValues(this.mCenter[0] + this.mXform.getWidth() / 2, this.mCenter[1] + this.mXform.getHeight() / 2);
    this.mRadius = vec2.distance(this.mCenter, this.mRefVertex);
    
    // find the initial 2 verteces
    var edgeLen = this.mRadius * Math.tan(Math.PI / this.numCircleLines);
    var vertex0 = vec2.fromValues(this.mCenter[0] + this.mRadius, this.mCenter[1] + edgeLen);
    var vertex1 = vec2.fromValues(this.mCenter[0] + this.mRadius, this.mCenter[1] - edgeLen);
    
    // rotate the verteces with respect to the center, based on xform rotation amount
    vec2.rotateWRT(vertex0, vertex0, this.mXform.getRotationInRad(), this.mXform.getPosition());
    vec2.rotateWRT(vertex1, vertex1, this.mXform.getRotationInRad(), this.mXform.getPosition());
    
    // define line locations
    this.mLines[0].setFirstVertex(vertex0[0], vertex0[1]);
    this.mLines[0].setSecondVertex(vertex1[0], vertex1[1]);
};

RigidCircle.prototype.draw = function (aCamera) {
    for (var i = 0; i < this.mLines.length; i++) {
        this.mLines[i].draw(aCamera);
    }
};