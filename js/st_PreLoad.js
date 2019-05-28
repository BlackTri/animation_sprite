var st_PreLoad = function(){
    var gameMode = getGameInstance();
    var gameOn = false;

    this.name = "st_PreLoad";
    this.onEnter = function(){
        $('canvas').remove();
        var div = document.createElement("div");
        div.id ="loading_img";
        div.style.position = "relative";
        var img_bg = document.createElement("img");
        img_bg.src = "./resource/image/loading_bg.jpg";
        img_bg.style.width ="100%";
        img_bg.style.height = "100%";
        
        // create animation rotate
        var animation = document.createElement("img");
        animation.id = "animation";
        animation.classList = "rotate";
        animation.src = "resource/image/preload.png";
        animation.style.width = "120px";
        animation.style.height = "120px";
        animation.style.objectFit = "none";
        animation.style.position ="absolute";
        animation.style.objectPosition = "-4px -526px";
        animation.style.left = "45%";
        animation.style.top ="65%";

        document.body.appendChild(div);
        div.appendChild(img_bg);
        div.appendChild(animation);
    };
    this.update = function(){
        if(gameOn == false){
            gameOn = true;
            setTimeout(function(){
                gameMode.pop();
                gameMode.push(new st_InGame());
            },200)
        }
    };
    this.render = function(){

    };
    this.onExit = function(){
        $("#loading_img").remove();
    };
}