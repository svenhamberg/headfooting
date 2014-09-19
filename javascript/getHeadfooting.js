
i = 0;

headfootingList = xmlDoc.getElementsByTagName("headfooting");


function preloadImages() {

	loadedImages = [];
	for (count=0; count < headfootingList.length; count++) {
		loadedImages[count] = new Image()
		loadedImages[count].src = "images/"+headfootingList.item(count).getElementsByTagName("image")[0].childNodes[0].nodeValue;
	};
}

function getHeadfooting(headfootingIndex) {
	
	index = headfootingList.item(headfootingIndex);

	headfooting = {

		image: index.getElementsByTagName("image")[0].childNodes[0].nodeValue,

		category: index.getElementsByTagName("category")[0].childNodes[0].nodeValue,

		artist: index.getElementsByTagName("artist")[0].childNodes[0].nodeValue,

	};

	document.getElementById("image").innerHTML = "<img src=\"images/" + headfooting.image + "\">";
	document.getElementById("number").innerHTML = "Headfooting number " + (i + 1);
	document.getElementById("category").innerHTML = "#" + headfooting.category;

}

function getFirstHeadfooting() {


	i = headfootingList.length - 1;

	headfooting = getHeadfooting(i);

}


function getLastHeadfooting() {

	i = 0;

	headfooting = getHeadfooting(i);

}

function getNextHeadfooting() {

	i = i-1;

	if (i < 0) {
		i = headfootingList.length - 1;
	};

	headfooting = getHeadfooting(i);

}

function getPreviousHeadfooting() {

	i = i+1;

	if (i > (headfootingList.length - 1) ) {
		i = 0;
	};

	headfooting = getHeadfooting(i);

}

