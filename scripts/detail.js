let form1 = document.getElementById("form");
let adult, nameOfCus, fromDate, toDate, totalPrice, priceToDisplay;
const calculateTotalPrice = function() {
	adult = document.getElementById("adult").value;
	nameOfCus = document.getElementById("name").value;
	fromDate = document.getElementById("fromDate").valueAsNumber;
	toDate = document.getElementById("toDate").valueAsNumber;
	totalPrice = document.getElementById("price");
	let price = 1000;
	let toDateEl = document.getElementById("toDate");
	let fromDateEl = document.getElementById("fromDate");
	toDateEl.min = fromDateEl.value;
	if(adult >= 1 && nameOfCus != "" && fromDate > 0 && toDate > 0 && toDate > fromDate) {
		let days = (toDate - fromDate) / 86400000;
		priceToDisplay = price * adult * days;
		totalPrice.value = "Rs. " + priceToDisplay;
	}
};
form1.addEventListener("input", calculateTotalPrice);
const rating = async function(rating) {
	let ratingVal = Number.parseFloat(rating) * 10;
	let rem = ratingVal % 10;
	let quotient = Math.floor(ratingVal / 10);
	let ratingHtml = "";
	let html = `<span class="fa fa-star checked"></span>`;
	for(let i = 0; i < quotient; i++) {
		ratingHtml = ratingHtml + html;
	}
	if(rem !== 0) {
		ratingHtml += `<span class="fa fa-star-half-o checked"></span>`;
	}
	return ratingHtml;
};
const amenities = async function(amenitiesObj) {
	let html = "";
	let key = "";
	let replacedKey = "";
	let finalKey = "";
	for(let y = 0; y < 10; y++) {
		key = amenitiesObj[y].key;
		replacedKey = key.replaceAll("_", " ");
		finalKey = replacedKey[0].toUpperCase() + replacedKey.slice(1);
		html = html + `<li>${finalKey}</li>`;
	}
	return html;
};
let hotelDescription = document.getElementById("hotel-description-para");
let hotelName = document.getElementById("hotel-name");
let ratings = document.getElementById("ratings-detail");
let amenitiesUl = document.getElementById("amenities-ul");
let resultObjArr;
let url = window.location.href;
const hotelId = url.split("?")[1].split("=")[1];
const data = null;
const xhr = new XMLHttpRequest();
xhr.withCredentials = false;
xhr.addEventListener("readystatechange", function() {
	if(this.readyState === this.DONE) {
		resultObjArr = JSON.parse(this.responseText);
		hotelName.textContent = resultObjArr.data[0].name;
		hotelDescription.textContent = resultObjArr.data[0].description;
		rating(resultObjArr.data[0].rating).then(
			(html) => (ratings.innerHTML = html));
		amenities(resultObjArr.data[0].amenities).then(
			(amenitiesHtml) => (amenitiesUl.innerHTML = amenitiesHtml));
	}
});
xhr.open("GET", `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${hotelId}`);
xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "999a19f357msh98c6dffba35d2cdp1595abjsndc394e46ecbc");
xhr.send(data);
const carousel = function(imagesObj) {
	return `<div class="carousel-item active">
  <img
    class="carousel-image"
    class="d-block w-100"
    src="${imagesObj[0].images.original.url}"
    alt="First slide"
  />
</div>
<div class="carousel-item">
  <img
    class="carousel-image"
    class="d-block w-100"
    src="${imagesObj[1].images.original.url}"
    alt="Second slide"
  />
</div>
<div class="carousel-item">
  <img
    class="carousel-image"
    class="d-block w-100"
    src="${imagesObj[2].images.original.url}"
    alt="Third slide"
  />
</div>
<div class="carousel-item">
  <img
    class="carousel-image"
    class="d-block w-100"
    src="${imagesObj[3].images.original.url}"
    alt="Fourth slide"
  />
</div>
<div class="carousel-item">
  <img
    class="carousel-image"
    class="d-block w-100"
    src="${imagesObj[4].images.original.url}"
    alt="Fifth slide"
  />
</div>`;
};
let carouselInner = document.getElementsByClassName("carousel-inner")[0];
const data1 = null;
const xhr1 = new XMLHttpRequest();
xhr1.withCredentials = false;
xhr1.addEventListener("readystatechange", function() {
	if(this.readyState === this.DONE) {
		let resObj = JSON.parse(this.responseText).data;
		let carouselHtml = carousel(resObj);
		carouselInner.innerHTML = carouselHtml;
	}
});
xhr1.open("GET", `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${hotelId}`);
xhr1.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
xhr1.setRequestHeader("x-rapidapi-key", "999a19f357msh98c6dffba35d2cdp1595abjsndc394e46ecbc");
xhr1.send(data1);
form1.addEventListener("submit", function(event) {
	event.preventDefault();
	window.location.href = `payment.html?hotel_id=${hotelId}&adults=${
    document.getElementById("adult").value
  }&name=${document.getElementById("name").value}&fromDate=${
    document.getElementById("fromDate").value
  }&toDate=${
    document.getElementById("toDate").value
  }&totalPrice=${priceToDisplay}`;
});