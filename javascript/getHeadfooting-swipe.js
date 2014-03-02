
i = 0;

headfootingList = xmlDoc.getElementsByTagName("headfooting");


function getHeadfooting(headfootingIndex) {
	
	index = headfootingList.item(headfootingIndex);

	headfooting = {

		image: index.getElementsByTagName("image")[0].childNodes[0].nodeValue,

		category: index.getElementsByTagName("category")[0].childNodes[0].nodeValue,

		artist: index.getElementsByTagName("artist")[0].childNodes[0].nodeValue,

	};

	document.getElementById("image").innerHTML = "<img src=\"" + headfooting.image + "\">";
	document.getElementById("category").innerHTML = "#" + headfooting.category;
	document.getElementById("number").innerHTML = "Headfooting number " + i + 1;
	document.getElementById("artist").innerHTML = "Artist: " + headfooting.artist;

}

function getFirstHeadfooting() {

	i = 0;

	headfooting = getHeadfooting(i);

}


function getLastHeadfooting() {

	i = headfootingList.length - 1;

	headfooting = getHeadfooting(i);

}

function getNextHeadfooting() {

	i = i+1;

	if (i > (headfootingList.length - 1) ) {
		i = 0;
	};

	headfooting = getHeadfooting(i);

}

function getPreviousHeadfooting() {
	i = i-1;

	if (i < 0) {
		i = headfootingList.length - 1;
	};

	headfooting = getHeadfooting(i);

}

