//
// @autor: Damis Garcia, Joel
// @team: Cangaçeiros
//

function getEscolas(callback){
  var url = "http://www.jiujitsuteam.com";
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var myArr = JSON.parse(xmlhttp.responseText);
          if callback != null || callback != undefined
            callback(myArr)
      }
  }
  xmlhttp.open("GET", url + "/teams.json", true);
  xmlhttp.send();
}

function getEscola(id,callback){
  var url = "http://www.jiujitsuteam.com";
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var myArr = JSON.parse(xmlhttp.responseText);
          if callback != null || callback != undefined
            callback(myArr)
      }
  }
  xmlhttp.open("GET", url + "/teams/"+id+".json", true);
  xmlhttp.send();
}
