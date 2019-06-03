var n = 3;
var m = 3;
var current = null;
var current_span = null;
var teban_is_black = true;

function get_capture_div(){
  return teban_is_black ? $("#captured_black") : $("#captured_white");
}

function create_field_koma(k){
  var img = $("<img>");
  img.attr("src", "frame.png");
  img.addClass("frame");
  if(k.is_white){ img.addClass("white"); }

  var span = $("<span>");
  span.text(k.get_name());
  span.addClass("frame");
  if(k.is_white){ span.addClass("white"); }
  span.append(img);

  var div = $("<div>");
  div.addClass("frame");
  div.append(span);
  div.append(img);
  return div;
}

function create_field(){
  var table = $("<table border='1'>");
  for(var i = 0; i < n; i++){
    var tr = $("<tr>");
    for(var j = 0; j < n; j++){
      tr.append($("<td>"));
    }
    table.append(tr);
  }
  $("#ban").append(table)
}

function mark(i){
  var tds = $("#ban").find("td");
  for(var j = 0; j < n * n; j++){
    if(current.canmoveto(j)){
      $(tds[j]).addClass("mark");
    }
  }
}

function unmark(i){
  var tds = $("#ban").find("td");
  for(var j = 0; j < n * n; j++){
    $(tds[j]).removeClass("mark");
  }
}

function select(k, span){
  current = k;

  if(k.position >= 0){
    var tds = $("#ban").find("td");
    $(tds[k.position]).addClass("current");
    mark(k.position);
  }
  
  if(span){
    current_span = span;
    span.addClass("current");
  }
}

function deselect(){
  //motigoma
  if(current_span){
    current_span.removeClass("current");
  }

  //field
  if(current.position < 0){ return; }

  var tds = $("#ban").find("td");
  $(tds[current.position]).removeClass("current");

  unmark(current.position);
}

function reselect(k, span){
  deselect();
  select(k, span)
}

function delete_current(){
  deselect();

  if(current.position < 0){
    current_span.remove();
  }else{
    var tds = $("#ban").find("td");
    var current_td = $(tds[current.position]);
    current_td.empty();
  }
}

function create_motigoma(k){
  var tds = $("#ban").find("td");
  var span = $("<span>");
  span.text(k.get_name());
  span.click(function(){
    if(current){
      deselect();
    }
    select(k, $(this));
  });
  return span;
}

function get_opponent_koma(k){
  var tds = $("#ban").find("td");
  var td = $(tds[k.position]);

  k.clear();
  k.is_white = !teban_is_black;
  td.empty();

  //put koma on the capture div
  get_capture_div().append(create_motigoma(k));
}

function is_opponent_area(is_white, i){
  if(is_white){
    return Math.floor(i / n) >= (n - m);
  }
  return Math.floor(i / n) < m;
}

function judge_upstart(k, from){
  if(!k.upstart){ return; }
  if(k.is_upstart){ return; }
  if(is_opponent_area(k.is_white, k.position) || is_opponent_area(k.is_white, from)){
    var yes = true;
    if(!(k instanceof Fu) && !(k instanceof Kyo)){
      yes = window.confirm("成りますか？");
    }
    if(yes){ k.upstart(); }
  }
}

function select_koma(){
  var koma_list = new Array(Gold, Silver, Kei, Kyo, Kaku, Fu, Fu);
  var arr = new Array();
  
  var r = Math.floor(Math.random() * koma_list.length);
  var k = koma_list[r];
  var p = Math.floor(Math.random() * n);
  arr.push(new k(p, true));
  var p2 = Math.floor(Math.random() * n);
  while(p == p2){
    p2 = Math.floor(Math.random() * n);
  }
  arr.push(new King(p2, true));
  
  r = Math.floor(Math.random() * koma_list.length);
  k = koma_list[r];
  var p = n * (n - 1) + Math.floor(Math.random() * n);
  arr.push(new k(p, false));
  var p2 = n * (n - 1) + Math.floor(Math.random() * n);
  while(p == p2){
    p2 = n * (n - 1) + Math.floor(Math.random() * n);
  }
  arr.push(new King(p2, false));
  return arr;
}

function init_koma(){
  var arr = new Array();
  for(var i = 0; i < 9; i++){
    arr.push(new Fu(n * (m - 1) + i, true));
    arr.push(new Fu(n * (n - m) + i, false));
  }
  arr.push(new Kyo(0, true));
  arr.push(new Kei(1, true));
  arr.push(new Silver(2, true));
  arr.push(new Gold(3, true));
  arr.push(new King(4, true));
  arr.push(new Gold(5, true));
  arr.push(new Silver(6, true));
  arr.push(new Kei(7, true));
  arr.push(new Kyo(8, true));
  arr.push(new Hi(10, true));
  arr.push(new Kaku(16, true));

  arr.push(new Kyo(72, false));
  arr.push(new Kei(73, false));
  arr.push(new Silver(74, false));
  arr.push(new Gold(75, false));
  arr.push(new King(76, false));
  arr.push(new Gold(77, false));
  arr.push(new Silver(78, false));
  arr.push(new Kei(79, false));
  arr.push(new Kyo(80, false));
  arr.push(new Kaku(64, false));
  arr.push(new Hi(70, false));

  return arr;
}

var koma = null;
var is_game_finished = false;

(function(){
  create_field();

  if(n == 9 && m == 3){
    koma = init_koma();
  }else{
    koma = select_koma();
  }

  // arange
  var tds = $("#ban").find("td");
  for(var i = 0; i < koma.length; i++){
    var k = koma[i];
    var td = $(tds.get(k.position));
    td.append(create_field_koma(k));
  }
  tds.each(function(i){
    var td = $(this);
    td.click(function(){
      if(is_game_finished){ return; }

      var k = get_koma_by_position(i);
      
      if(!current){
        if(k && k.is_white != teban_is_black){
          td.addClass("current");
          current = k;
          mark(i);
        }
        return;
      }
      
      var current_is_motigoma = current.position < 0;
      
      //selected koma is in myteam.
      if(k && k.is_white != teban_is_black){
        reselect(k);
        return;
      }
      
      if(k && current_is_motigoma){ return; }
 
      //// move current koma to i
      if(!current.canmoveto(i)){ return; }

      if(k && (k instanceof King)){
        deselect();
        is_game_finished = true;
        window.alert("あなたの勝ち！");
        return;
      }

      delete_current();
 
      //get opponent koma
      if(k){ get_opponent_koma(k); }
 
      //put koma to i
      var from = current.position;
      current.position = i;
      current.captured = false;
      if(!current_is_motigoma){ judge_upstart(current, from); }
      td.append(create_field_koma(current));
      current = null;
 
      //teban change
      teban_is_black = !teban_is_black;
    });
  });
})()

