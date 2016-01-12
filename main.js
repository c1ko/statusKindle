function updateSack(){
	sackRequest = new XMLHttpRequest();
	sackRequest.open("GET", "https://meinsack.click/v1/70372/Daimlerstra%C3%9Fe/ical/", true);

	sackRequest.onreadystatechange=function(){
		if(sackRequest.readyState==4 && sackRequest.status==200){
			lines = sackRequest.responseText.split("\n")
			for(var i = 0; i<lines.length; i++){
				line = lines[i]
				if(line.substring(0,7) == "DTSTART"){ //Get the correct lines from the calender
					ds = line.substring(line.length-9, line.length-1)
					year = ds.substring(0, 4)
					month = ds.substring(4, 6)
					day = ds.substring(6, 8)

					thatdate = day + "." + month + "." + year
					md = new Date(year, month, day, 0, 0, 0, 0).getTime();	
					cd = new Date().getTime()	
					if(md-cd > 0){ //Chose the first one that is not in the past
						if(md-cd < 1000*60*60*24){
							document.getElementById("sack").innerHTML = "MORGEN";
						}
						else{
							document.getElementById("sack").innerHTML = thatdate
						}
						break
					}
				}
			}
		}
	}
	sackRequest.send();
}

function updateWeather(){
	weatherRequest = new XMLHttpRequest();
	weatherRequest.open("GET", "http://api.openweathermap.org/data/2.5/weather?id=2950699&appid=0f2750553f3fcb623ea3026cf665a2ac&units=metric")
	
	weatherRequest.onreadystatechange=function(){
		if(weatherRequest.readyState==4 && weatherRequest.status==200){
			var r = eval('('+weatherRequest.responseText + ')');
			document.getElementById("tempicon").src = "http://openweathermap.org/img/w/" + r.weather[0].icon + ".png";
			document.getElementById("temp").innerHTML = r.main.temp.toString().split(".")[0] + "&#176;C"
			document.getElementById("humid").innerHTML = r.main.humidity + "%"
			document.getElementById("wind").innerHTML = r.wind.speed + "m/s"
		}
	}

	weatherRequest.send();
}

function updateForecast(){
	forecastRequest = new XMLHttpRequest();
	forecastRequest.open("GET", "http://api.openweathermap.org/data/2.5/forecast/daily?id=2950699&appid=0f2750553f3fcb623ea3026cf665a2ac&units=metric")
	
	forecastRequest.onreadystatechange=function(){
		if(forecastRequest.readyState==4 && forecastRequest.status==200){
			var d = eval('('+forecastRequest.responseText + ')');
			document.getElementById("forcastToday").innerHTML = "&#x25BC;" + d.list[0].temp.min.toString().split(".")[0] + "&#176;C &nbsp; &#x25B2;" + d.list[0].temp.max.toString().split(".")[0] + "&#176;C"; 
			document.getElementById("forcastTomorrow").innerHTML = "&#x25BC;" + d.list[1].temp.min.toString().split(".")[0] + "&#176;C &nbsp; &#x25B2;" + d.list[1].temp.max.toString().split(".")[0] + "&#176;C"; 
		}
		else{		
			document.getElementById("forcastToday").innerHTML = forecastRequest.status.toString() + " " + forecastRequest.readyState;
		}
	}

	forecastRequest.send();
}

function updateDate(){
	d = new Date();
	document.getElementById("date").innerHTML = d.getDate()+1 + "." + d.getMonth()+1 + "." + d.getFullYear();
	var h = d.getHours().toString()
	if(h.length == 1){
		h = "0" + h;
	}
	var m = d.getMinutes().toString()
	if(m.length == 1){
		m = "0" + m;
	}
	document.getElementById("time").innerHTML = h + ":" + m;
}

updateWeather();
updateForecast();
updateDate();
updateSack();

setInterval(function(){
	updateWeather();
	updateForecast();
	updateSack();
}, 1000*60*15);

setInterval(function(){
	updateDate()
}, 1000*60);

