let cityCardsTwo = document.getElementById("city-cards-2");
let viewMoreButton = document.getElementById("view-more-btn");
viewMoreButton.addEventListener("click", function() {
	if(cityCardsTwo.dataset.value === "view-less") {
		cityCardsTwo.dataset.value = "view-more";
		cityCardsTwo.style.display = "none";
		viewMoreButton.innerHTML = "View More";
	} else {
		cityCardsTwo.dataset.value = "view-less";
		cityCardsTwo.style.display = "flex";
		viewMoreButton.innerHTML = "View Less";
	}
});
var cityImgDiv = document.querySelectorAll(".city-image");
for(var i = 0; i < cityImgDiv.length; i++) {
	cityImgDiv[i].addEventListener("click", function(event) {
		event.preventDefault();
		let cityName = event.target.closest(".city-image").getAttribute("id");
		window.location.href = `list.html?city=${cityName}`;
	});
}

