(function () {
		"use strict"

		var map = L.map('mapa').setView([51.505, -0.09], 13);
		
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		function atualizaTabela() {

			JiuJitsuJsonpRequests.getEscolas(parseJson);
		}

		function parseJson(times) {
			var tabela = document.getElementById("tabela");

		    for(var i = 0; i < times.length; i++) {

				var linha = document.createElement("tr");
				linha.className = "linha-time";

				var celulaNome = document.createElement("td");
				var celulaNickname = document.createElement("td");
				var celulaData = document.createElement("td");

				celulaNome.textContent = times[i].name;
				celulaNickname.textContent = times[i].nickname;
				celulaData.textContent = new Date(times[i].created_at).toLocaleDateString();

				linha.appendChild(celulaNome);
				linha.appendChild(celulaNickname);
				linha.appendChild(celulaData);

				linha.setAttribute("data-id", times[i].id);
				linha.addEventListener("click", exibeMarkersDoTime);

				tabela.appendChild(linha);
		    }
		}

		function exibeMarkersDoTime() {
			var id = this.getAttribute("data-id");

			JiuJitsuJsonpRequests.getEscola(id, function (jsonTimes) {
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