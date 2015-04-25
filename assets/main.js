(function () {
		"use strict"

		var map = L.map('mapa').setView([51.505, -0.09], 13);
		
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		function atualizaTabela() {
			var xmlhttp = new XMLHttpRequest();

			var url = "http://www.jiujitsuteam.com";

			xmlhttp.onreadystatechange = function() {
	    		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		        	var myArr = JSON.parse(xmlhttp.responseText);
		        	parseJson(myArr);
	    		}
			}
			xmlhttp.open("GET", url + "/teams.json", true);
			xmlhttp.send();
		}

		function parseJson(times) {
			var tabela = document.getElementById("tabela");

		    for(var i = 0; i < times.length; i++) {

				var linha = document.createElement("tr");
				linha.className = "linha-time";

				var celulaNome = document.createElement("td");
				var celulaNickname = document.createElement("td");
				var celulaData = document.createElement("td");

				celulaNome.innerText = times[i].name;
				celulaNickname.innerText = times[i].nickname;
				celulaData.innerText = new Date(times[i].created_at).toLocaleDateString();

				linha.appendChild(celulaNome);
				linha.appendChild(celulaNickname);
				linha.appendChild(celulaData);

				linha.setAttribute("data-id", times[i].id);
				linha.onclick = exibeMarkersDoTime

				tabela.appendChild(linha);
		    }
		}

		function exibeMarkersDoTime() {
			var id = this.getAttribute("data-id");

			getEscola(id, function (jsonTimes) {
				var latLngs = [];

				jsonTimes.places.forEach(function (place) {
					if (place.gym && place.gym.lat && place.gym.lng) {
						var lat = parseFloat(place.gym.lat), lng = parseFloat(place.gym.lng);
						L.marker([lat, lng]).addTo(map);
						latLngs.push([lat, lng]);
					}
				});

				if (latLngs.length > 0) {
					var bounds = new L.LatLngBounds(latLngs);
					map.fitBounds(bounds);
				}
			});
		}

		atualizaTabela();
	})();