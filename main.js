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
	sackRequest = new XMLHttpRequest();
	http://api.openweathermap.org/data/2.5/weather?id=2950699&appid=79dc20bc286d7dbcfd63ba90fc11d637&units=metric
}

function updateDate(){
	d = new Date();
	document.getElementById("date").innerHTML = d.getDate()+1 + "." + d.getMonth()+1 + "." + d.getFullYear();
}

updateSack();
updateDate();

setInterval(function(){
	updateDate()
	updateSack()
	location.reload();
}, 1000*60*15);

