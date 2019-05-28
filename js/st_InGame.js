var st_InGame = function(){
    this.name ="st_InGame";
    var div = document.createElement("div");
    div.id = "gameBoard";
    div.style.height ="100%"
    var _img1, _img2, _img3, _img4;
    var _movingImg;
    var _offsetX;
    var _offsetY;
    var _canvas;
    var _context;
    var i = 0;
    var move = 0;
    var arr =[];



    _canvas = document.createElement("canvas");
    _canvas.width =1200;
    _canvas.height= 800;
    _canvas.style.border="1px solid gray";

    _context = _canvas.getContext("2d");
    _context.fillStyle = "rgba(0,255,0,0.8)";

    this.onEnter = function(){
        document.body.appendChild(div);
        div.appendChild(_canvas);
        arr = [
            _img2 = new ImageObj("./resource/image/game.png", 1669, 1, 270, 79, 100,_canvas.width/2, 300,_context),
            _img3 = new ImageObj("./resource/image/game.png", 1671, 8, 400, 75, 97, 150, 300,_context),
            _img4 = new ImageObj("./resource/image/game.png", 1668, 1, 521, 80, 98, 450, 300,_context)
        ];
        _img1 = new ImageObj("./resource/image/game.png", 20, 20, 881, 140, 257,_canvas.width/2, 600,_context);
        
    };
    this.update = function(){
        _canvas.onmousedown = canvas_mousedown;
        _canvas.onmousemove = canvas_mousemove;
        _canvas.onmouseup = canvas_mouseup;
        move++;
    };
    this.render = function(){
        // var arr = [_img2, _img3, _img4]
        if(move == 3){
            _context.clearRect(0, 0, _canvas.width, _canvas.height); // clear canvas
            _img1.draw(_context);
            var random = Math.floor(Math.random()*3);
            if(random != 3){

            }
            for( let j = 0 ; j < 9; j++){
                for(let k = 0 ; k < 4; k++){
                    var random = Math.floor(Math.random()*3);
                    if(random != 3){
                        _img_random = arr[random];
                        _img_random.left = 150 +j * (_img_random.width + 20);
                        _img_random.top = 100 + k *(_img_random.height +20);
                        _img_random.draw(_context);
                    }
                    
                }
            }
            move = 0;
            i++;
            if(i>3){
                i=0;
            }
        }
        
    };
    this.onExit = function(){

    };
    function ImageObj(url, dx,sx, sy, sWidth, sHeight,left,top,context){
        this.img = new Image();
        
        this.left = left;
        this.top = top;

        this.width = sWidth;
        this.height = sHeight;
        
        var ready = false;
        var self = this;
        this.contains = function(x,y){
            if(!ready)
                return false;
            return this.left <= x && (x-this.left) < this.width
                    && this.top <= y && (y-this.top) < this.height;
        };
        this.draw = function(context){
            if(ready){
                // _context.clearRect(self.left, self.top, self.width, self.height); // clear canvas
                context.drawImage(self.img, dx + i*(sx + sWidth), sy, self.width, self.height, self.left, self.top, self.width, self.height);    
            }
            else{            
                // image has not finished loading
                // draw something useful instead
                context.save();
                context.fillStyle = "black";
                context.fillText("Image is not ready",this.left+10,this.top+10);
                context.restore();
            }
            // context.strokeRect(this.left,this.top,this.width,this.height);
            // context.stroke();
        };
        this.img.onload = function(){
            self.width = sWidth;
            self.height = sHeight;
            ready = true; // this image is ready to use
            
            // draw image after loading        
            // context.clearRect(self.left,self.top,self.width,self.height);
            // interVal = setInterval(function(){
            //     self.draw(_context);
            // },100);
            // get ImageData from this image
            // self.data = context.getImageData(self.left,self.top,self.width,self.height).data;        
        };
        this.img.src = url;

    };
    function canvas_mousedown(e) {
        // clearInterval(interVal);
        var x = e.pageX - _canvas.offsetLeft;
        var y = e.pageY - _canvas.offsetTop;

        if (_img1.contains(x, y)) {
            _offsetX = x - _img1.left;
            _offsetY = y - _img1.top;
            _movingImg = _img1;
        } 
        // interVal = setInterval(function(){
            // draw();
        // },100);
    }

    function canvas_mousemove(e) {
        if (_movingImg) {
            
            var x = e.pageX - _canvas.offsetLeft - _offsetX;
            var y = e.pageY - _canvas.offsetTop - _offsetY;

            _movingImg.left = x;
            _movingImg.top = y;
        }
    }

    function canvas_mouseup(e) {
        _movingImg = null;
    }
    function draw() {
        _context.clearRect(0, 0, _canvas.width, _canvas.height); // clear canvas
        _img1.draw(_context);
        _img2.draw(_context);

        // var rect = findIntersectionRect(_img1, _img2);
        
        // if (rect) _context.fillRect(rect.left, rect.top, rect.right - rect.left, rect.bottom - rect.top);

    }
}