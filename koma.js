function Fu(pos, is_white){
  Fu.prototype.name = "歩";
  Fu.prototype.name_upstart = "と";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  this.is_upstart = false;
  Fu.prototype.get_name = function(){
    return (this.is_upstart ? this.name_upstart : this.name);
  }
  Fu.prototype.upstart = function(){
    this.is_upstart = true;
    this.canmoveto = Gold.prototype.canmoveto;
  }
  Fu.prototype.clear = function(){
    this.captured = true;
    this.position = -1;
    this.is_upstart = false;
    this.canmoveto = Fu.prototype.canmoveto;
  }
  Fu.prototype.canmoveto = function(i){
    if(this.position < 0){
      return !is_opponent_area(this.is_white, i);
    }
    if(koma_of_myteam_exists(i, this)){ return false; }
    if(i == this.position) { return false; }
    if(this.is_white){
      return (i == this.position + n);
    }else{
      return (i == this.position - n);
    }
  }
}

function King(pos, is_white){
  King.prototype.name = "王";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  King.prototype.get_name = function(){
    return (this.is_upstart ? this.name_upstart : this.name);
  }
  King.prototype.clear = function(){
    this.captured = true;
    this.position = -1;
  }
  King.prototype.canmoveto = function(i){
    if(this.position < 0){ return true; }
    if(koma_of_myteam_exists(i, this)){ return false; }
    if(i == this.position) { return false; }
    if(Math.abs(i % n - this.position % n) <= 1){
      return Math.abs(
        Math.floor(i / n) - Math.floor(this.position / n)
      ) <= 1;
    }
    return false;
  }
}

function Gold(pos, is_white){
  Gold.prototype.name = "金";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  Gold.prototype.get_name = function(){
    return (this.is_upstart ? this.name_upstart : this.name);
  }
  Gold.prototype.clear = function(){
    this.captured = true;
    this.position = -1;
  }
  Gold.prototype.canmoveto = function(i){
    if(this.position < 0){ return true; }
    if(koma_of_myteam_exists(i, this)){ return false; }
    if(koma_of_myteam_exists(i, this)){ return false; }
    if(i == this.position) { return false; }
    if(this.is_white){
      if(i == this.position - (n + 1)){ return false; }
      if(i == this.position - (n - 1)){ return false; }
    }else{
      if(i == this.position + (n + 1)){ return false; }
      if(i == this.position + (n - 1)){ return false; }
    }
    if(Math.abs(i % n - this.position % n) <= 1){
      return Math.abs(
        Math.floor(i / n) - Math.floor(this.position / n)
      ) <= 1;
    }
  }
}

function Silver(pos, is_white){
  Silver.prototype.name = "銀";
  Silver.prototype.name_upstart = "全";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  this.is_upstart = false;
  Silver.prototype.get_name = function(){
    return (this.is_upstart ? this.name_upstart : this.name);
  }
  Silver.prototype.upstart = function(){
    this.is_upstart = true;
    this.canmoveto = Gold.prototype.canmoveto;
  }
  Silver.prototype.clear = function(){
    this.captured = true;
    this.position = -1;
  }
  Silver.prototype.canmoveto = function(i){
    if(this.position < 0){ return true; }
    if(koma_of_myteam_exists(i, this)){ return false; }
    if(koma_of_myteam_exists(i, this)){ return false; }
    if(Math.abs(i - this.position) <= 1) { return false; }
    if(is_white){
      if(i == this.position - n){ return false; }
    }else{
      if(i == this.position + n){ return false; }
    }
    if(Math.abs(i % n - this.position % n) <= 1){
      return Math.abs(
        Math.floor(i / n) - Math.floor(this.position / n)
      ) <= 1;
    }
  }
}

function Kyo(pos, is_white){
  Kyo.prototype.name = "香";
  Kyo.prototype.name_upstart = "杏";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  this.is_upstart = false;
  Kyo.prototype.get_name = function(){
    return (this.is_upstart ? this.name_upstart : this.name);
  }
  Kyo.prototype.upstart = function(){
    this.is_upstart = true;
    this.canmoveto = Gold.prototype.canmoveto;
  }
  Kyo.prototype.clear = function(){
    this.captured = true;
    this.position = -1;
    this.is_upstart = false;
    this.canmoveto = Kyo.prototype.canmoveto;
  }
  Kyo.prototype.canmoveto = function(i){
    if(this.position < 0){
      return !is_opponent_area(this.is_white, i);
    }
    if(koma_of_myteam_exists(i, this)){ return false; }
    if(i % n == this.position % n){
      if(this.is_white){
        for(var p = this.position + n; p < i; p += n){
          if(get_koma_by_position(p)){ return false; }
        }
        return this.is_white && i > this.position;
      }else{
        for(var p = this.position - n; p > i; p -= n){
          if(get_koma_by_position(p)){ return false; }
        }
        return !this.is_white && i < this.position;
      }
    }
    return false;
  }
}

function Kaku(pos, is_white){
  Kaku.prototype.name = "角";
  Kaku.prototype.name_upstart = "馬";
  this.position = pos;
  this.is_white = is_white;
  this.captured = false;
  this.is_upstart = false;
  Kaku.prototype.get_name = function(){
    return (this.is_upstart ? this.name_upstart : this.name);
  }
  Kaku.prototype.upstart = function(){
    this.is_upstart = true;
  }
  Kaku.prototype.clear = function(){
    this.captured = true;
    this.position = -1;
    this.is_upstart = false;
  }
  Kaku.prototype.canmoveto = function(i){
    if(this.position < 0){ return true; }
    if(koma_of_myteam_exists(i, this)){ return false; }
    if(this.is_upstart){
      //Add King power.
      if(Math.abs(i % n - this.position % n) <= 1){
        if(Math.abs(Math.floor(i / n) - Math.floor(this.position / n)) <= 1){
          return true;
        }
      }
    }
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
      if(Math.floor(i / n - x) == Math.floor(this.position / n)){
        for(var j = 1; j < Math.abs(x); j++){
          var p = this.position + (n - 1) * (x >= 0 ? j : -j);
          if(get_koma_by_position(p)){ return false; }
        }
        return true;
      }
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
koma.push(new Kyo(8, false));
koma.push(new King(7, false));
koma.push(new Kaku(6, false));
koma.push(new Fu(4, false));
