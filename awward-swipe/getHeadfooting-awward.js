function getHeadfooting(headfootingIndex)
{

	headfooting=xmlDoc.getElementsByTagName("headfooting").item(headfootingIndex);

	image=headfooting.getElementsByTagName("image")[0].childNodes[0].nodeValue;

	category=headfooting.getElementsByTagName("category")[0].childNodes[0].nodeValue;

	artist=headfooting.getElementsByTagName("artist")[0].childNodes[0].nodeValue;

	return image;

}
