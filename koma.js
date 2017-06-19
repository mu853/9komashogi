function Koma(name, pos, is_white) {
  this.name = name;
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  this.canmoveto = function(i){ return true; }
}

function Fu(pos, is_white){
  this.name = "歩";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  this.canmoveto = function(i){
    if(this.position < 0 && i < n){ return false; }
    return (this.position - n == i);
  }
}

function King(pos, is_white){
  this.name = "王";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  this.canmoveto = function(i){
    var diff = Math.abs(i - this.position);
    if(diff == 0){ return false }
    if(diff <= 1){ return true }
    if(diff - n <= 1){ return true }
    return false;
  }
}

function Gold(pos, is_white){
  this.name = "金";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  this.canmoveto = function(i){
    var diff = Math.abs(i - this.position);
    if(diff == 0){ return false }
    if(diff <= 1){ return true }
    if(this.is_white && diff == -n){ return true }
    if(!this.is_white && diff == n){ return true }
    diff -= (this.is_white ? n : -n)
    if(diff <= 1){ return true }
    return false
  }
}

function get_koma_by_position(pos){
  for(var i = 0; i < koma.length; i++){
    if(!koma[i].captured && koma[i].position == pos){
      return koma[i];
    }
  }
  return null;
}

var koma = new Array();
koma.push(new Gold(0, true));
koma.push(new King(1, true));
koma.push(new Koma("銀", 2, true));
koma.push(new Koma("香", 6, false));
koma.push(new King(7, false));
koma.push(new Koma("角", 8, false));
koma.push(new Fu(4, false));

