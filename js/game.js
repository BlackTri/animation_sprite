// var dataCrop = require('./dataCrop.json');
var Game = {
    /* Load resource */
    // sound
    m_lic_kt_bgm : new Audio("./resource/sound/MP4/m_lic_kt_bgm.mp4"),
    // m_lic_kt_end : new Audio("./resource/sound/MP4/m_lic_kt_end.mp4"),
    // sfx_enemy_bubble_die : new Audio("./resource/sound/MP4/sfx_enemy_bubble_die.mp4"),
    // sfx_enemy_die_01 : new Audio("./resource/sound/MP4/sfx_enemy_die_01.mp4"),
    // sfx_enemy_die_02 : new Audio("./resource/sound/MP4/sfx_enemy_die_02.mp4"),
    // sfx_enemy_die_03 : new Audio("./resource/sound/MP4/sfx_enemy_die_03.mp4"),
    // sfx_frenzy_bomb : new Audio("./resource/sound/MP4/sfx_frenzy_bomb.mp4"),
    // sfx_MC_hurt : new Audio("./resource/sound/MP4/sfx_MC_hurt.mp4"),
    // sfx_MC_shoot_multiple_01 : new Audio("./resource/sound/MP4/sfx_MC_shoot_multiple_01.mp4"),
    // sfx_MC_shoot_multiple_02 : new Audio("./resource/sound/MP4/sfx_MC_shoot_multiple_02.mp4"),
    // sfx_MC_shoot_multiple_03 : new Audio("./resource/sound/MP4/sfx_MC_shoot_multiple_03.mp4"),
    // sfx_MC_shoot_single_01 : new Audio("./resource/sound/MP4/sfx_MC_shoot_single_01.mp4"),
    // sfx_MC_shoot_single_02 : new Audio("./resource/sound/MP4/sfx_MC_shoot_single_02.mp4"),
    // sfx_MC_shoot_single_03 : new Audio("./resource/sound/MP4/sfx_MC_shoot_single_03.mp4"),
    // sfx_powerup : new Audio("./resource/sound/MP4/sfx_powerup.mp4"),
    // sfx_ui_confirm : new Audio("./resource/sound/MP4/sfx_ui_confirm.mp4"),
    // sfx_ui_timer : new Audio("./resource/sound/MP4/sfx_ui_timer.mp4"),

    // The game loop
    FPS: 30,
    timer:null,
    timerID: null, // interval


    gameMode: new StateStack(),

    update: function () {
        this.gameMode.update();
        this.gameMode.render();
    },


    startGame: function() {
        this.gameMode.push(new st_PreLoad());
        this.timerID = setInterval(this.update.bind(this),this.timer);
    },

    pauseGame:function (){
        clearInterval(this.timerID);
    },

    resumeGame: function (){
        this.timerID = setInterval(this.update.bind(this),this.timer);
    },
    
    init: function () {
        this.timer = 1000/this.FPS;
        this.startGame();
    },
}
window.onload = function () {
    setTimeout(function(){
        Game.init();
        Game.m_lic_kt_bgm.pause();
    },200)
    
    // Game.m_lic_kt_bgm.play();
    var canvas = document.getElementById("gameBoard");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = "./resource/image/mig_landscape_host_landscape.jpg";
    
    img.onload = drawImageActualSize;
    function drawImageActualSize(){
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.style.width ="100%";
        canvas.style.height = "100%";
        ctx.drawImage(img, 0 , 0);
    }

    var img2 = new Image();
    img2.src= "./resource/image/preload.png";
    img2.onload = drawImageActualSize2;
    function drawImageActualSize2(){
        setTimeout(function(){
            for(let value of preload){
            /*  ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight); */
                ctx.drawImage(img2, value.sX, value.sY, value.sWidth, value.sHeight, value.dx, value.dy ,value.dWidth ,value.dHeight);
            }
        },1000);
    }
    // setTimeout(function(){
    //     Game.m_lic_kt_bgm.play();
    // },1800);

    window.getGameInstance = function () {
        return Game.gameMode;
    };
}