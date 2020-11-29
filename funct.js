var result;
var results = [];
var listM = [];
var listN = [];
var result;
function code_number(x) {
  var niebo = (x/5) * 5;
  var ziemia = x % 5;
  var tab = [];
  tab.unshift(ziemia);
  tab.unshift(niebo);
  return tab;
}

function num_to_list(m, n) {
  listM = [];
  listN = [];
  var liM=m.toString().split('');
  var liN=n.toString().split('');
  for(i=0; i<liM.length; i++) {
    listM.push(Number(liM[i]));
  }
  for(i=0; i<liN.length; i++) {
    listN.push(Number(liN[i]));
  }

  while(listM.length > listN.length) {
    listN.unshift(0);
  }
  while(listN.length > listM.length) {
    listM.unshift(0);
  }
}

function friends_need(m, n, r) {
  if (m == n) return 0;
  var listM = code_number(m);
  var listN = code_number(n);
  if (r>0 && listM[0]==listN[0] && listM[1]<listN[1])
    return 0;
  if (r<0 && listM[0]==listN[0] && listM[1]>listN[1])
    return 0;
  if (r>0 && listM[0]<listN[0] && listM[1]<=listN[1])
    return 0;
  if (r<0 && listM[0]>listN[0] && listM[1]>=listN[1])
    return 0;

  return 1; //potrzebni przyjaciele

}

function friends_need_(m, n) {
  num_to_list(m, m+n);
  for (var i=0; i<listM.length; i++) {
    if (friends_need(listM[i], listN[i], n)) {
      return 1;
    }
  }
  return 0;
}

function prepare_list(type) {
  var li = document.getElementById('lista');
  var buf = 100;
  var max = document.getElementById('maxline').value;
  li.innerHTML = "";
  var r;
  result = 0;
  results = [];
  // listM = [];
  // listN = [];
  var liWyniki = document.getElementById('wyniki');
  for (let i=0; i<max; i++) {
    if (type == 1) {
      do { r = Math.floor(Math.random()*18) - 9;
      } while (!( (result+r) > 0 && !friends_need_(result, r) && result+r <10 && r != -buf && r ));
    }
    if (type == 2) {
      do { r = Math.floor(Math.random()*99*2) - 99;
      } while (!( (result+r) > 0 && !friends_need_(result, r) && result+r <100 && r != -buf && r ));
    }
    if (type == 3) {
      do { r = Math.floor(Math.random()*16) - 8;
      } while (!( (result+r) > 0 && (friends_need_(result, r) || !result) && result+r <9 && r));

    }
    if (type == 4) {
      do { r = Math.floor(Math.random()*99*2) - 99;
      } while (!((result+r) > 0 && (friends_need_(result, r) || !result || 1) && result+r <100 && r != -buf && r));
    }
    if (type == 5) {
      do { r = Math.floor(Math.random()*999*2) - 999;
      } while ((result+r) < 0 || (result+r) >= 1000 || Math.abs(r) < 100);
    }

    buf = r;
    result += r;
    results.push(result);
    if (r<0) {
        r = -r;
        li.innerHTML += "&minus; " + r + '<br />';
    } else {
      li.innerHTML += r + '<br />';
    }
    liWyniki.innerHTML="";
  }
  document.getElementById('buttonWy').setAttribute("value", "Pokaż wyniki");
  document.getElementById('buttonW').setAttribute("value", "Pokaż wynik");
}

function showWy() {
  var liWyniki = document.getElementById('wyniki');
  var butt = document.getElementById('buttonWy');
  if (liWyniki.innerHTML.length) {
      liWyniki.innerHTML = "";
      butt.setAttribute("value", "Pokaż wyniki");
      return;
  }
  var s = "";
  for (var i=0 ; i<results.length; i++) {
    if (!i) s += "<br />";
    else s += "= " + results[i] + "<br />";
  }
  liWyniki.innerHTML = s;
  butt.setAttribute("value", "Ukryj wyniki");
}
function showW() {
  var li = document.getElementById('lista');
  var butt = document.getElementById('buttonW');
  var i = li.innerHTML.search('=')
  if (i < 0) {
    li.innerHTML += '= ' + result;
    butt.setAttribute("value", "Ukryj wynik");
  }
  else {
    li.innerHTML = li.innerHTML.substr(0,i);
    butt.setAttribute("value", "Pokaż wynik");
  }
}
