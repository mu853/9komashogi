function Fu(pos, is_white){
  this.name = "歩";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  this.canmoveto = function(i){
    if(koma_of_myteam_exists(i, this)){ return false; }
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
    if(koma_of_myteam_exists(i, this)){ return false; }
    console.log("i=" + i);
    if(i == this.position) { return false }
    if(Math.abs(i % n - this.position % n) <= 1){
      return Math.abs(
          Math.floor(i / n) - Math.floor(this.position / n)
          ) <= 1;
    }
    return false;
  }
}

function Gold(pos, is_white){
  this.name = "金";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  this.canmoveto = function(i){
    if(koma_of_myteam_exists(i, this)){ return false; }
    if(i == this.position) { return false }
    if(is_white){
      if(i == this.position - (n + 1)){ return false }
      if(i == this.position - (n - 1)){ return false }
    }else{
      if(i == this.position + (n + 1)){ return false }
      if(i == this.position + (n - 1)){ return false }
    }
    if(Math.abs(i % n - this.position % n) <= 1){
      return Math.abs(
          Math.floor(i / n) - Math.floor(this.position / n)
          ) <= 1;
    }
  }
}

function Silver(pos, is_white){
  this.name = "銀";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  this.canmoveto = function(i){
    if(koma_of_myteam_exists(i, this)){ return false; }
    if(Math.abs(i - this.position) <= 1) { return false }
    if(is_white){
      if(i == this.position - n){ return false }
    }else{
      if(i == this.position + n){ return false }
    }
    if(Math.abs(i % n - this.position % n) <= 1){
      return Math.abs(
          Math.floor(i / n) - Math.floor(this.position / n)
          ) <= 1;
    }
  }
}

function Kyo(pos, is_white){
  this.name = "香";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  this.canmoveto = function(i){
    if(koma_of_myteam_exists(i, this)){ return false; }
    if(i % n == this.position % n){
      if(this.is_white && i > this.position){ return true }
      if(!this.is_white && i < this.position){ return true }
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
    if(koma_of_myteam_exists(i, this)){ return false; }
    var diff = i - this.position;
    if(diff % (n + 1) == 0){
      var x = diff / (n + 1);
      if(Math.floor(i / n - x) == Math.floor(this.position / n)){
        for(var j = 1; j < Math.abs(x); j++){
          var p = this.position + (n + 1) * (x >= 0 ? j : -j);
          if(get_koma_by_position(p)){ return false; }
        }
        return true;
      }
    }
    if(diff % (n - 1) == 0){
      var x = diff / (n - 1);
      return Math.floor(i / n - x) == Math.floor(this.position / n);
    }
    return false;
  }
}

function koma_of_myteam_exists(i, koma){
  var k = get_koma_by_position(i);
  return k && k.is_white == koma.is_white;
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
koma.push(new Kyo(6, false));
koma.push(new King(7, false));
koma.push(new Kaku(8, false));
koma.push(new Fu(4, false));

