// 1
var audioEngine = cc.AudioEngine.getInstance();
var MainLayer = cc.LayerColor.extend({
    // Add this new instance variable to the top of the file
    _bomb:[],
    _block:[],
    // 2
    ctor:function() {
        this._super();
 
        // 3
        cc.associateWithNative( this, cc.LayerColor );
    },
 
    // 4
    onEnter:function () {
        if( 'touches' in sys.capabilities ) {
            this.setTouchEnabled(true);
        }
        if( 'mouse' in sys.capabilities ) {
            this.setMouseEnabled(true);
        }
        if( 'keyboard' in sys.capabilities ) {
            this.setKeyboardEnabled(true);
        }
        this._super();

        this.player = cc.Sprite.create(s_player);
        this.playerX = this.player.getContentSize().width / 2;
        this.playerY = winSize.height-this.player.getContentSize().height / 2;
        this.playerSpeed = 10;

        for (var i = 0; i < 20 ;i++){
            for(var j = 0 ; j<10;j++){
                if((i == 0 && j == 8)|| (i == 1 && j == 9)||(i == 0 && j == 9))
                    continue;
                if(Math.random()>0.5){
                    var block = cc.Sprite.create(s_block);
                    block.setPosition(30+60*i,30+60*j);
                    this.addChild(block);
                    this._block.push(block);
                }
            }
        }
        
        
        this.scheduleUpdate();
        audioEngine.playMusic(s_bgMusic, true);
    },

    onKeyDown:function(keyCode){
        if(keyCode == cc.KEY.s ){
            if(this.playerY > this.player.getContentSize().height/2){
                for (var i = 0; i< this._block.length;i++){
                    var block = this._block[i];
                    var blockRect = block.getBoundingBox();
                    var playerRect = this.player.getBoundingBox();
                    if(cc.rectIntersectsRect(blockRect,playerRect))
                        if (block.getPositionY()+50 == this.playerY)
                            return;
                }
                this.playerY -= this.playerSpeed;
            }
        }
        if(keyCode == cc.KEY.w ){
            if(this.playerY < winSize.height-this.player.getContentSize().height/2){
                for (var i = 0; i< this._block.length;i++){
                    var block = this._block[i];
                    var blockRect = block.getBoundingBox();
                    var playerRect = this.player.getBoundingBox();
                    if(cc.rectIntersectsRect(blockRect,playerRect))
                        if (block.getPositionY()-50 == this.playerY)
                            return;
                    }
                this.playerY += this.playerSpeed;
            }
        }
        if(keyCode == cc.KEY.a ){
            if (this.playerX > this.player.getContentSize().width / 2){
                for (var i = 0; i< this._block.length;i++){
                    var block = this._block[i];
                    var blockRect = block.getBoundingBox();
                    var playerRect = this.player.getBoundingBox();
                    if(cc.rectIntersectsRect(blockRect,playerRect))
                        if (block.getPositionX()+50 == this.playerX)
                            return;
                    }
                this.playerX -= this.playerSpeed;
            }
        }
        if(keyCode == cc.KEY.d ){
            if(this.playerX < winSize.width - this.player.getContentSize().width / 2)
                for (var i = 0; i< this._block.length;i++){
                    var block = this._block[i];
                    var blockRect = block.getBoundingBox();
                    var playerRect = this.player.getBoundingBox();
                    if(cc.rectIntersectsRect(blockRect,playerRect))
                        if (block.getPositionX()-50 == this.playerX)
                            return;
                }
                this.playerX += this.playerSpeed;
        }
        if(keyCode == cc.KEY.space){
            var bomb = cc.Sprite.create(s_bomb);
            bomb.setPosition(this.playerX,this.playerY);
            this.addChild(bomb);
        }

    },

    render:function(){
        this.player.setPosition(this.playerX,this.playerY);
        this.addChild(this.player);
    },

    update:function (dt) {
        this.render();

    }
     
});

// 1
MainLayer.create = function () {
    var sg = new MainLayer();
    if (sg && sg.init(cc.c4b(255, 255, 255, 255))) {
        return sg;
    }
    return null;
};
 
// 2
MainLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = MainLayer.create();
    scene.addChild(layer);
    return scene;
};
