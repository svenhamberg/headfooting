
i = 0;

headfootingList = xmlDoc.getElementsByTagName("headfooting");

function getFirstHeadfooting()
	{
		index = headfootingList.item(0);

		headfooting = {

			image: index.getElementsByTagName("image")[0].childNodes[0].nodeValue,

			category: index.getElementsByTagName("category")[0].childNodes[0].nodeValue,

			artist: index.getElementsByTagName("artist")[0].childNodes[0].nodeValue,

		};

		document.getElementById("image").innerHTML="<img src=\""+headfooting.image+"\">";
	}

function getNextHeadfooting()
	{

		i = i+1;

		if (i > (headfootingList.length - 1) ) {
			i = 0;
		};

		index = headfootingList.item(i);

		headfooting = {

			image: index.getElementsByTagName("image")[0].childNodes[0].nodeValue,

			category: index.getElementsByTagName("category")[0].childNodes[0].nodeValue,

			artist: index.getElementsByTagName("artist")[0].childNodes[0].nodeValue,

		};

		document.getElementById("image").innerHTML="<img src=\""+headfooting.image+"\">";

		console.log(i);
		
	}

function getLastHeadfooting()
	{
		i = i-1;

		if (i < 0) {
			i = headfootingList.length - 1;
		};

		index = headfootingList.item(i);

		headfooting = {

			image: index.getElementsByTagName("image")[0].childNodes[0].nodeValue,

			category: index.getElementsByTagName("category")[0].childNodes[0].nodeValue,

			artist: index.getElementsByTagName("artist")[0].childNodes[0].nodeValue,

		};

		document.getElementById("image").innerHTML="<img src=\""+headfooting.image+"\">";		

		console.log(i);
		
	}