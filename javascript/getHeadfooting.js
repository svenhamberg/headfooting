function getHeadfooting(headfootingIndex)
	{

		$( ".active" ).toggleClass( "active" );

		headfooting=xmlDoc.getElementsByTagName("headfooting").item(headfootingIndex);

		image=headfooting.getElementsByTagName("image")[0].childNodes[0].nodeValue;

		category=headfooting.getElementsByTagName("category")[0].childNodes[0].nodeValue;

		artist=headfooting.getElementsByTagName("artist")[0].childNodes[0].nodeValue;

		console.log(category);

		document.getElementById("headfooting_"+headfootingIndex).innerHTML="<img src=\""+image+"\">"+"<p>#"+category+"</p>";
		
	}