var n = 3;
var current = null;
var current_span = null;
var teban_is_black = true;

function get_div_cap(){
  return teban_is_black ? $("#captured_black") : $("#captured_white");
}

function create_image(k){
  var img = $("<img>");
  img.attr("src", "frame.png");
  img.addClass("frame");
  if(k.is_white){ img.addClass("white"); }

  var span = $("<span>");
  span.text(k.name);
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
  var target = new Array(
    i, i + 1, i - 1,
    i + n, i + n + 1, i + n - 1,
    i - n, i - n + 1, i - n - 1
  );
  var tds = $("#ban").find("td");
  for(var j = 0; j < target.length; j++){
    k = target[j];
    if(current.canmoveto(k)){
      $(tds[k]).addClass("mark");
    }
  }
}

function unmark(i){
  var target = new Array(
    i, i + 1, i - 1,
    i + n, i + n + 1, i + n - 1,
    i - n, i - n + 1, i - n - 1
  );
  var tds = $("#ban").find("td");
  for(var j = 0; j < target.length; j++){
    k = target[j]
    $(tds[k]).removeClass("mark");
  }
}


(function(){
  create_field();

 // arange
 var tds = $("#ban").find("td");
 for(var i = 0; i < koma.length; i++){
   var k = koma[i];
   var td = $(tds.get(k.position));
   td.append(create_image(k));
 }
 tds.each(function(i){
   var td = $(this);
   td.click(function(){
     var k = get_koma_by_position(i);
     if(current){
       if(k && k.is_white != teban_is_black){
         if(current_span){
           current_span.removeClass("current");
         }
         var current_td = $(tds[current.position]);
         current_td.removeClass("current");
         unmark(current.position);
         current = k;
         td.addClass("current");
         mark(i);
         return;
       }

       if(!current.canmoveto(i)){ return; }
       unmark(current.position);

       if(current.position < 0){
         current_span.remove();
       }else{
         var current_td = $(tds[current.position]);
         current_td.removeClass("current");
         current_td.empty();
       }

       if(k){
         k.captured = true;
         k.position = -1;
         k.is_white = !teban_is_black;
         td.empty();
         var div_cap = get_div_cap();
         var span = $("<span>");
         span.text(k.name);
         span.click(function(){
           if(current){
             $(tds[current.position]).removeClass("current");
           }
           if(current_span){
             current_span.removeClass("current");
           }
           current = k;
           current_span = span;
           span.addClass("current");
         });
         div_cap.append(span);
       }

       current.position = i;
       current.captured = false;
       td.append(create_image(current));
       current = null;
       teban_is_black = !teban_is_black;
     }else{
       if(k && k.is_white != teban_is_black){
         td.addClass("current");
         current = k;
         mark(i);
       }
     }
   });
 });
})()

