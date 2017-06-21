function Fu(pos, is_white){
  this.name = "歩";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  this.canmoveto = function(i){
    if(i == this.position) { return false }
    if(this.is_white){
      return (i == this.position + n);
    }else{
      return (i == this.position - n);
    }
  }
}

function King(pos, is_white){
  this.name = "王";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  this.canmoveto = function(i){
    console.log("i=" + i);
    if(i == this.position) { return false }
    return Math.abs(i % n - this.position % n) <= 1
  }
}

function Gold(pos, is_white){
  this.name = "金";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  this.canmoveto = function(i){
    if(i == this.position) { return false }
    if(is_white){
      if(i == this.position - (n + 1)){ return false }
      if(i == this.position - (n - 1)){ return false }
    }else{
      if(i == this.position + (n + 1)){ return false }
      if(i == this.position + (n - 1)){ return false }
    }
    return Math.abs(i % n - this.position % n) <= 1
  }
}

function Silver(pos, is_white){
  this.name = "銀";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  this.canmoveto = function(i){
    if(Math.abs(i - this.position) <= 1) { return false }
    if(is_white){
      if(i == this.position - n){ return false }
    }else{
      if(i == this.position + n){ return false }
    }
    return Math.abs(i % n - this.position % n) <= 1
  }
}

function Kyo(pos, is_white){
  this.name = "香";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  this.canmoveto = function(i){
    if(i % n == this.position % n){
      if(this.is_white && i > this.position){ return true }
      if(this.is_white && i < this.position){ return true }
    }
    return false;
  }
}

function Kaku(pos, is_white){
  this.name = "角";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  this.canmoveto = function(i){
    var diff = i - this.position;
    if(diff % (n + 1) == 0){ return true }
    if(diff % (n - 1) == 0){ return true }
    return false;
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
koma.push(new Silver(2, true));
koma.push(new Kyo(6, true));
koma.push(new King(7, false));
koma.push(new Kaku(8, false));
koma.push(new Fu(4, false));

