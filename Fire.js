class Fire {
    constructor(posX) {
     
      this.rx = posX; //setting the x posing where obstacle will be created  
      this.ry = height-random([100,120]);   //setting y position where obstacle will be created 
      this.spt=createSprite(this.rx, this.ry); //using rx,ry
      this.spt.shapeColor="red";
      this.spt.addAnimation("fire",fireImg);
      this.spt.scale=0.60;
      //this.spt.velocityX=-2;
    }
  
}
  