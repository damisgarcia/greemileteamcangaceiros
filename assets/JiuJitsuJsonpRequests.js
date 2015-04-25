//
// @autor: Damis Garcia, Joel, Fabiano, Sergio
// @team: Cangaçeiros
//

var JiuJitsuJsonpRequests = {

  jsonpRequest: function (url, callback) {
    var script = document.createElement("script");
    script.src = url + "?callback=jsonpCallback";
    window.jsonpCallback = function (json) {
      callback(json);
      document.body.removeChild(script);
      delete window.jsonpCallback;
    };

    document.body.appendChild(script);
  },

  getEscolas: function (callback){
    this.jsonpRequest("http://www.jiujitsuteam.com/teams.json", callback);
  },

  getEscola: function (id,callback){
    this.jsonpRequest("http://www.jiujitsuteam.com/teams/" + id + ".json", callback);
  }
};
