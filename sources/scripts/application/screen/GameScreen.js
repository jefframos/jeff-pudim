/*jshint undef:false */
var GameScreen = AbstractScreen.extend({
    init: function (label) {
        this._super(label);
    },
    destroy: function () {
        this._super();
    },
    build: function () {
        this._super();
        this.gravity = windowHeight * 0.0001;
        this.polygonRadius = windowWidth * 0.25;
        this.sides = 7;
        this.gameContainer = new PIXI.DisplayObjectContainer();
        this.addChild(this.gameContainer);
        var assetsToLoader = [];
        if(assetsToLoader.lenght <= 0){
            this.loader = new PIXI.AssetLoader(assetsToLoader);
            this.initLoad();
        }else{
            this.onAssetsLoaded();
        }

        var self = this;
        this.hitTouch = new PIXI.Graphics();
        this.hitTouch.interactive = true;
        this.hitTouch.beginFill(0);
        this.hitTouch.drawRect(0,0,windowWidth, windowHeight);
        this.addChild(this.hitTouch);
        this.hitTouch.alpha = 0;
        this.hitTouch.hitArea = new PIXI.Rectangle(0, 0, windowWidth, windowHeight);

        this.hitTouch.mousemove = this.hitTouch.touchmove = function(touchData){

        };
        this.hitTouch.mousedown = this.hitTouch.touchstart = function(touchData){
            var distance = pointDistance(self.pudim.getPosition().x,self.pudim.getPosition().y, touchData.global.x, touchData.global.y);
            if(distance > 50){
                if(self.pudim.getPosition().y < touchData.global.y){
                    self.pudim.velocity.y = 2;
                }else{
                    self.pudim.velocity.y = -2;
                }
            }
        };
        this.hitTouch.mouseup = this.hitTouch.touchend = function(touchData){
            self.pudim.velocity.y = 0;
        };
    },
    onProgress:function(){

    },
    onAssetsLoaded:function()
    {
        this._super();
        this.layerManager = new LayerManager();
        this.gameContainer.addChild(this.layerManager.getContent());
        this.entityLayer = new Layer("Entity");
        this.layerManager.addLayer(this.entityLayer);

        this.pudim = new Pudim();
        this.pudim.getContent().position.x = windowWidth/2;
        this.pudim.getContent().position.y = windowHeight/2;
        this.entityLayer.addChild(this.pudim);
    },
    update:function()
    {
        this.layerManager.update();
    },
});
