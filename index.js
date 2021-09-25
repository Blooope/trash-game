var w = window.innerWidth;
var h = window.innerHeight;
var x = 300
var y = 300
var tx = -300
var ty = 0
var isMoving = false
var keydown = false
var interval
var menuopt = 1
var frame = []
var framep = []
var framex = []
var borders = ["-6456, -692, -114, 594", "-6000, -4772, 208, 215"]
var bordersout = ["-582, 64, -544, 102"]
var border
framex[1] = 0
//put the sprites into variables
var img0 = [ document.getElementById("img1"), document.getElementById("img2"),document.getElementById("img3"), document.getElementById("img4") ]
var tile = [document.getElementById("tile1"), document.getElementById("tile2"),document.getElementById("tile3"), document.getElementById("tile4"), document.getElementById("tile5")]
var front = [document.getElementById("img1"), document.getElementById("img1-1")]
var npc = [document.getElementById("slime1"), document.getElementById("slime2")]
var letter = {"a":document.getElementById("a"), "b":document.getElementById("b"), "c":document.getElementById("c"), "d":document.getElementById("d"), "e":document.getElementById("e"), "f":document.getElementById("f"), "g":document.getElementById("g"), 
" ":document.getElementById("blank")}
var ss = [document.getElementById("screen1"), document.getElementById("screen2")]
var alpha = 0
var td = 0
var startscreen = true
var startmenu = false
var ttd = 0
var cos = 0
var fps = 120
var px = 300
var py = 300
var audio
var lastd
var alpha = 1
var mainmenu = false
var bordernum = 0
var room = 1
var outborder
var outbordernum
var n1
var n2
var trash = []
var trashcount = Math.round(Math.random()*250)+50
while(trash.length < trashcount) {
n1 = (Math.round(Math.random()*95))+5
n2 = (Math.round(Math.random()*19))-5
 trash.push(n1 + ", " + n2 + ", 1")
}
var trashcount = trashcount + Math.round(Math.random()*3)+1
while(trash.length < trashcount) {
n1 = (Math.round(Math.random()*95))+5
n2 = (Math.round(Math.random()*19))-5
 trash.push(n1 + ", " + n2 + ", 2")
}
var trashcount = trashcount + Math.round(Math.random()*250)+1
while(trash.length < trashcount) {
n1 = (Math.round(Math.random()*95))+5
n2 = (Math.round(Math.random()*19))-5
 trash.push(n1 + ", " + n2 + ", 3")
}
frame[0] = 0
frame[1] = 0
frame[2] = 0
var hitbox = document.getElementById("hitbox")
//Use devmode to show text that may be useful for the developer.
var devmode = "off"
var dtx = 0
var dty = 0
var scframe = 0
var canvas = document.getElementById("gameArea");
var ctx = canvas.getContext("2d");
function refresh() {
 ctx.globalAlpha = 1
 ctx.fillStyle = "#000000";
 ctx.fillRect(0,0,1100,630)
}
function drawTile(tileid, x1, y1) {
  ctx.drawImage(tileid, x1 + tx, y1 + ty) //2
}
function startScreen() {
 scframe = scframe + 1 //1

if(scframe < 1000) {
  ctx.drawImage(ss[0], 0, 0)
} //3, 4
 if(scframe == 1000) {
   fade()
  ctx.drawImage(ss[1], 0, 0) //5
 }
 if(scframe > 1000) {
   ctx.globalAlpha = alpha
   ctx.drawImage(ss[1], 0, 0)
 }
 if(scframe == 2000) {
   startscreen = false
   startmenu = true
   fade()
 }
}
function startMenu() {
  if(menuopt == 1) {
    ctx.fillStyle = "white";
    ctx.fillText("> New game",450,250);
    ctx.fillText("   Load game",450,300);
  }
  if(menuopt == 2) {
    ctx.fillStyle = "white";
    ctx.fillText("   New game",450,250);
    ctx.fillText("> Load game",450,300);
  }
}
function mainMenu() {
  ctx.drawImage(document.getElementById("menu"), 0, 50)
   if(menuopt == 1) {
    ctx.fillStyle = "white";
    ctx.fillText("> Save",80,130);
    ctx.fillText("   Load",80,170);
  }
  if(menuopt == 2) {
    ctx.fillStyle = "white";
    ctx.fillText("   Save",80,130);
    ctx.fillText("> Load",80,170);
  }
}
function doBorders(bn) {
 if(checkBordersOut("down", bn) && cos == 0) {
    y = y - 2
    }
    if(checkBordersOut("up", bn) && cos == 3) {
    y = y + 2
    }
    if(checkBordersOut("left", bn) && cos == 2) {
    x = x + 2
    }
    if(checkBordersOut("right", bn) && cos == 1) {
    x = x - 2
    }
}
function doRoomBorders(rn) {
  if(checkBorders("down", rn) && cos == 0) {
    y = y - 2
    }
    if(checkBorders("up", rn) && cos == 3) {
    y = y + 2
    }
    if(checkBorders("left", rn) && cos == 2) {
    x = x + 2
    }
    if(checkBorders("right", rn) && cos == 1) {
    x = x - 2
    }
}
function checkBordersOut(direction, bn) {
    outbordernum = bordersout.length
    outborder = bordersout[bn-1].split(", ")
    if(direction == "down") {
      if(py < outborder[1]  && py > outborder[3]  && px < outborder[0] && px > outborder[2] && room == outborder[4]) {
        return true
        outbordernum = 0
      }
      else {
        return false
      }
    }
    if(direction == "up") {
      if(py > outborder[3]  && py < outborder[1] && px < outborder[0] && px > outborder[2] && room == outborder[4]) {
        return true
        outbordernum = 0
      }
      else {
        return false
      }
    }
    if(direction == "right") {
      if(py > outborder[3]  && py < outborder[1] && px < outborder[0] && px > outborder[2] && room == outborder[4]) {
        return true
        outbordernum = 0
      }
      else {
        return false
      }
    }
    if(direction == "left") {
      if(py > outborder[3]  && py < outborder[1] && px < outborder[0] && px > outborder[2] && room == outborder[4]) {
        return true
        outbordernum = 0
      }
      else {
        return false
      }
    }
    
  }
function checkBorders(direction, r) {
   
    border = borders[r-1].split(", ")
    if(direction == "left") {
    if(px < border[2]) {
     return false
    }
    else {
      return true
    }
    }
    if(direction == "right") {
    if(px > border[0]) {
     return false
    }
    else {
      return true
    }
    }
     if(direction == "up") {
    if(py < border[3]) {
     return false
    }
    else {
      return true
    }
    }
    if(direction == "down") {
    if(py > border[1]) {
     return false
    }
    else {
      return true
    }
    }
   
  }
function playAudio(filename) {

  audio = new Audio(filename);
  audio.pause();
  audio.currentTime = 0
audio.play();
}
function drawAvatar() {
  if(cos == 0) {
 ctx.drawImage(front[framex[1]], x, y)
  }
  else {
    ctx.drawImage(img0[cos], x, y)
  }
}
function drawChunk(tileid, x1, y1, xf, yf) {
   ttd = 0
  while(ttd < yf) {
  td = 0
  while(td < xf) {
    dtx = (x1 * 64) + (td * 64)
    dty = (y1 * 64) + (ttd * 64)
    //stop function from rendering tiles the player can't see, as not doing so will slow the game down, especially in bigger rooms.
    if(dtx+tx > -100 && dtx+tx < 1200 && dty+ty > -100 && dty+ty < 900) {
    drawTile(tileid, dtx, dty)
    }
    td = td + 1
  }
  ttd = ttd + 1
  }
}
function drawText(text, x1, y1) {
td = 0
while(td < text.length) {
  ctx.drawImage(letter[text.charAt(td)], x1 + (td * 14), y1)
  td = td + 1
}
}
function reset() {
  clearInterval(renderI)
  clearInterval(animateI)
  renderI = setInterval(render, 1000/fps)
  animateI = setInterval(animate, 0)
}
var renderI = setInterval(render, 1000/fps)
var animateI = setInterval(animate, 0)
function render() {
 ctx.drawImage(document.getElementById("menu"), 0, 0)
  px = tx - (x - 156)
  py = ty - (y - 172)
    refresh()
    if(startscreen) {
      startScreen()
    }
    if(startmenu) {
      startMenu()
    }
     ctx.globalAlpha = alpha
     if(!startscreen && !startmenu) {
    drawTiles()
    
    
   drawTrash()
    drawAvatar()
    if(mainmenu) {
     mainMenu()
    }
     }
    ctx.font = "bold 30px arial";
    ctx.fillStyle = "white";
       ctx.fillText("Trash: " + score,50,100)
      ctx.font = "bold 15px arial";
    if(tmax > 20) {
        ctx.fillText("Trash bags: " + (tmax-20)/20,50, 120)
    }
      ctx.font = "bold 30px arial";
    ctx.fillText("Recyclables: " + score2,50,170)
    ctx.fillText("Score: " + totalscore, 50, 220)
    if(devmode == "on") {
    ctx.fillText("tx: " + tx,600,50);
    ctx.fillText("ty: " + ty,600,100);
    ctx.fillText("x: " + x,800,50);
    ctx.fillText("y: " + y,800,100);
    ctx.fillText("px: " + px,600,150);
    ctx.fillText("py: " + py,800,150);
    ctx.fillText("frame: " + framex[2],800,200);
    ctx.fillText("isMoving: " + isMoving,800,250);
    ctx.fillText("room: " + room,600,250);
    ctx.fillText("ax: " + ax,600,300);
    ctx.fillText("ay: " + ay,800,300);
}
  doBorders(1)
  if(room == 1) {
  doRoomBorders(1)
  }
  if(room == 2) {
  doRoomBorders(2)
  }
  //checkRoomEntrance(1, -544, 102, -582, 64, 2, 0, 0, 300, 300)
  
}
var i
var trashsplit
var ax = 0
var ay = 0
var score = 0
var score2 = 0
var totalscore = 0
var tmax = 20
function drawTrash() {
ax = ((-(px+116))/64)+5
ay = (-(py)/64)+4.25
for(i=0; i < trash.length; i++) {
  trashsplit = trash[i].split(", ")
    if(trashsplit[2] == 1) {
  drawChunk(document.getElementById("box"), trashsplit[0], trashsplit[1], 1, 1)
    }
    else if (trashsplit[2] == 2) {
    drawChunk(document.getElementById("box2"), trashsplit[0], trashsplit[1], 1, 1)     
    }
    else if (trashsplit[2] == 3) {
    drawChunk(document.getElementById("box3"), trashsplit[0], trashsplit[1], 1, 1)     
    }
  if(Math.floor(ax) == Math.floor(trashsplit[0]) && Math.floor(ay) == Math.floor(trashsplit[1]) && score != tmax && trashsplit[2] == 1) {
    trash.splice(i, 1)
    score += 1
    totalscore += 1
  }
    else if(Math.floor(ax) == Math.floor(trashsplit[0]) && Math.floor(ay) == Math.floor(trashsplit[1]) && trashsplit[2] == 2) {
        trash.splice(i, 1)
        tmax += 20
    }
     if(Math.floor(ax) == Math.floor(trashsplit[0]) && Math.floor(ay) == Math.floor(trashsplit[1]) && score2 != tmax && trashsplit[2] == 3) {
    trash.splice(i, 1)
    score2 += 1
    totalscore += 1
  }
    
}
}
function fade() {
var inter = setInterval(anim, 70)
alpha = 0
  function anim() {
   alpha = alpha + 0.15
   ctx.globalAlpha = alpha
   if(alpha > 1) {
     clearInterval(inter)
   }
  }
}
function checkRoomEntrance(r, x1, y1, x2, y2, nr, x3, y3, x4, y4) {
  if(room == r && px < x1 && px > x2 && py < y1 && py > y2) {
      fade()
     room = nr
     tx = x3
     ty = y3
     x = x4
     y = y4
    }
}
function animate() {
 
if(isMoving) {
frame[0] = frame[0] + 1
framep[0] = Math.floor(frame[0] / (200/4))
framex[0] = framep[0] % 4
frame[1] = frame[1] + 1
}
else {
  frame[1] = 0
}
framep[1] = Math.floor(frame[1] / (200/4))
framex[1] = framep[1] % 2

frame[2] = frame[2] + 1
framep[2] = Math.floor(frame[2] / (200/4))
framex[2] = framep[2] % 2
}
function drawTiles() {
  //UmVuZGVyIHJvb20gW1RFUk1JTkFURURd
  if(room == "0") {
    ctx.drawImage(document.getElementById("entity"), tx, ty)
    ctx.fillStyle = "white";
    ctx.fillText("Deleting R2xpdGNobHk=.chr...",tx,ty+70);
    ctx.fillText("63.564% complete",tx,ty+100);
    if(framex[2] == 1) {
     ctx.fillText(">",tx,ty+130);
    }
    else {
      ctx.fillText(">_",tx,ty+130);
    }
  }
  //Draw room 1
 else if(room == 1) {
drawTile(tile[4], 0, 0)
drawChunk(tile[3], 5, -5, 100, 9)
drawChunk(tile[1], 5, 4, 100, 1)
 drawChunk(tile[0], 5, 5, 100, 1)
 drawChunk(tile[2], 5, 6, 100, 1)
 drawChunk(tile[3], 5, 7, 100, 9)
 drawChunk(tile[4], 12, 3, 1, 1)
drawChunk(document.getElementById("recycle"), 13, 2.7, 1, 1)
  }
  //Draw room 2
   else if(room == 2) {
 drawChunk(tile[0], 0, 0, 100, 80)
 drawChunk(tile[3], 5, 5, 5, 5)
 drawTile(tile[4], 0, 0)
  }
    else {
    ctx.fillStyle = "white";
    ctx.fillText("hehehe... i dont know how, but somehow, you went into a room that doesn't",tx,ty+30);
    ctx.fillText("quite exist. This room is just in place as a sort of error message. Anyways, ",tx,ty + 60);
     ctx.fillText("if you did not modify the game in any way, then please tell whoever made",tx,ty + 90);
      ctx.fillText("this game. if this WASN'T some kind of glitch, then this just leads me to",tx,ty + 120);
       ctx.fillText("assume that you are just hacking through the game code. I have no idea",tx,ty + 150);
        ctx.fillText("how thats even possible, but please stop whatever you're doing.",tx,ty + 180);
         ctx.fillText("Don't cheat. And most of all, DON'T SPOIL THE GAME FOR ANYONE ELSE.",tx,ty + 210);
  }
}
 //var window = window.open("index.html","","width=700,height=700,resizable=no")
 function save() {
   localStorage.setItem("tx", tx)
   localStorage.setItem("ty", ty)
   localStorage.setItem("x", x)
   localStorage.setItem("y", y)
   localStorage.setItem("room", room)
   localStorage.setItem("cos", cos)
 }
 function load() {
 tx = eval(localStorage.getItem("tx"))
 ty = eval(localStorage.getItem("ty"))
 x = eval(localStorage.getItem("x"))
 y = eval(localStorage.getItem("y"))
 room = eval(localStorage.getItem("room"))
 cos = eval(localStorage.getItem("cos"))

 }
 function placeNPC(npcp, nx, ny) {
   ctx.drawImage(npcp, nx+tx, ny+ty)
 }
 
function move() {
  if(!startscreen) {
  var map = {};
onkeydown = onkeyup = function(e){
    e = e || event;
    map[e.keyCode] = e.type == 'keydown';
     if(map[38] && startmenu) {
    menuopt = menuopt - 1
    if(menuopt < 1) {
      menuopt = 2
    
  }
     }
     else if(map[40] && startmenu) {
    menuopt = menuopt + 1
    if(menuopt > 2) {
      menuopt = 1
    
  }
     }
     else if(map[13] && startmenu) {
    if(menuopt == 1) {
      startmenu = false
      x = 300
      y = 300
      tx = -300
      ty = 0
      save()
  }
  if(menuopt == 2) {
      load()
      startmenu = false
  }
     }
 else if(map[39] && !keydown && !mainmenu) {
    keydown = true
    interval = setInterval(function() { right(); }, 0)
    function right() {
      cos = 1
    x = x + 1
      if(x > 700) {
      x = 700
      tx = tx - 1
    }
  
    isMoving = true
  
  
    }
  }
     else if(map[32] && !keydown && !mainmenu) {
    keydown = true
    if(ax > 11.63 && ax < 12.31 && ay > 3.20 && ay < 3.84 && score != 0) {
        score -= 1
        totalscore += 1
    }
    else if(ax > 12.8 && ax < 13.4 && ay > 3.3 && ay < 3.7 && score2 != 0) {
        score2 -= 1
        totalscore += 2
    }
  }
  else if(map[37] && !keydown && !mainmenu) {
    keydown = true
    interval = setInterval(function() { left(); }, 0)
    function left() {
    x = x - 1
    isMoving = true
    if(x < 156) {
      x = 156
      tx = tx + 1
    }
    cos = 2
    
    }
  }
  else if(map[40] && !keydown && !mainmenu) {
    keydown = true
    interval = setInterval(function() { down(); }, 0)
    function down() {
    y = y + 1
    isMoving = true
    if(y > 406) {
     y = 406
     ty = ty - 1
    }
    cos = 0
    
    }
  }
 else if(map[38] && !keydown && !mainmenu) {
    keydown = true
    interval = setInterval(function() { up(); }, 0)
    function up() {
    y = y - 1
    isMoving = true
    if(y < 172) {
      y = 172
      ty = ty + 1
    }
    cos = 3
    
    }
  }
 else if(map[27]) {
    if(mainmenu) {
      mainmenu = false
    }
    else {
      menuopt = 1
      mainmenu = true
    }
  }
   else if(map[40] && mainmenu) {
    menuopt = menuopt + 1
    if(menuopt > 2) {
      menuopt = 1
    }
  }
   else if(map[38] && mainmenu) {
    menuopt = menuopt - 1
    if(menuopt < 1) {
      menuopt = 2
    }
  } 
  else if(map[13] && mainmenu) {
    mainmenu = false
    if(menuopt == 1) {
      save()
    }
    if(menuopt == 2) {
      load()
    }
  }
}
}
else {
  startscreen = false
  startmenu = true
  fade()

}
}
function stopMovement() {
clearInterval(interval)
 keydown = false
 isMoving = false
}