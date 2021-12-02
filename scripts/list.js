let url = window.location.href;
let cityName = url.split("?")[1].split("=")[1];
const data = null;
const xhr = new XMLHttpRequest();
xhr.withCredentials = false;
let resultObjArr = new Array();
let filteredResultObjArr = new Array();

function filterHotels(hotels) {
	return !(hotels.rating === undefined && hotels.address === undefined);
}
xhr.addEventListener("readystatechange", function() {
	if(this.readyState === this.DONE) {
		let arr = JSON.parse(this.responseText).data;
		for(var i = 0; i < arr.length; i++) {
			resultObjArr.push(arr[i].result_object);
		}
		filteredResultObjArr = resultObjArr.filter(filterHotels);
		hotelDetailsTemplate(filteredResultObjArr);
	}
});
xhr.open("GET", `https://travel-advisor.p.rapidapi.com/locations/search?query=${cityName}`);
xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "999a19f357msh98c6dffba35d2cdp1595abjsndc394e46ecbc");
xhr.send(data);
let listView = document.getElementById("list-view");
let hotelContainer;
let clickedHotelName;
let hotelId;
const hotelDetailsTemplate = function(hotelsArray) {
	const str = hotelsArray.map((object) => {
		return `<a href="#"><section class="hotel-image-container">
    <img
      src="${object.photo.images.medium.url}"
      class="hotel-image"
      alt="${object.name}"
    />
    <div class="hotel-details">
      <h3>${object.name}</h3>
      <p>${object.rating}<span class="fa fa-star checked"></span></p>
      <p>${object.address}</p>
    </div>
    </section></a>`;
	}).join("");
	listView.innerHTML = str;
	hotelContainer = document.getElementsByClassName("hotel-image-container");
	for(var i = 0; i < hotelContainer.length; i++) {
		hotelContainer[i].addEventListener("click", function(event) {
			event.preventDefault();
			clickedHotelName = event.target.closest(".hotel-image-container").childNodes[3].childNodes[1].textContent;
			for(let a = 0; a < filteredResultObjArr.length; a++) {
				if(filteredResultObjArr[a].name === clickedHotelName) {
					hotelId = filteredResultObjArr[a].location_id;
					break;
				}
			}
			window.location.href = `detail.html?id=${hotelId}`;
		});
	}
};