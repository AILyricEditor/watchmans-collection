const cardArea = document.getElementById("cardArea");

// Event Delegation: Listen for changes inside #cardArea
cardArea.addEventListener("change", (event) => {
	const card = event.target.closest(".card");
	if (!card || card.classList.contains("add")) return; // Ignore the add card

	// Handle main image input
	if (event.target.classList.contains("mainImageInput")) {
		const index = [...document.querySelectorAll(".mainImageInput")].indexOf(event.target);
		const mainPreviews = document.querySelectorAll(".mainPreview");
		const mainImageInputWraps = document.querySelectorAll(".main-image-input-wrap");
		addImage(event, mainPreviews[index], mainImageInputWraps[index]);
	}

	// Handle face image input
	if (event.target.classList.contains("faceImageInput")) {
		const index = [...document.querySelectorAll(".faceImageInput")].indexOf(event.target);
		const facePreviews = document.querySelectorAll(".facePreview");
		const faceImageInputWraps = document.querySelectorAll(".face-image-input-wrap");
		addImage(event, facePreviews[index], faceImageInputWraps[index]);
	}
});

// Event Delegation: Listen for clicks inside #cardArea
cardArea.addEventListener("click", (event) => {
	const card = event.target.closest(".card");
	if (!card || card.classList.contains("add")) return; // Ignore the add card

	// Handle edit main image
	if (event.target.closest(".editMainImage")) {
		const index = [...document.querySelectorAll(".editMainImage")].indexOf(event.target.closest(".editMainImage"));
		document.querySelectorAll(".mainImageInput")[index].click();
	}

	// Handle edit face image
	if (event.target.closest(".editFaceImage")) {
		const index = [...document.querySelectorAll(".editFaceImage")].indexOf(event.target.closest(".editFaceImage"));
		document.querySelectorAll(".faceImageInput")[index].click();
	}
});

// Function to handle image preview updates
function addImage(event, preview, inputButton) {
	const file = event.target.files[0]; // Get the selected file
	if (file && preview) {
		const reader = new FileReader(); // Create a FileReader to read the image
		reader.onload = function (e) {
			preview.src = e.target.result; // Set the image source to the uploaded file
			preview.style.display = "block"; // Show the image
			if (inputButton) inputButton.style.display = "none";
		};
		reader.readAsDataURL(file); // Read the file as a data URL
	}
}

// Add card when clicking the "Add" button
document.querySelector(".add").addEventListener("click", () => {
	addCard();
});

function addCard() {
	cardArea.insertAdjacentHTML("beforeend", `
		<div class="card">
			<div class="input main-image-input-wrap">
				<h5>Add the main image of the entity</h5>
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
				<input type="file" class="mainImageInput" accept="image/*">
			</div>

			<div class="previewWrap">
				<img class="preview mainPreview" alt="Blank">
				<svg class="editMainImage" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
			</div>

			<div class="input face-image-input-wrap">
				<h6>Add face</h6>
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
				<input type="file" class="faceImageInput" accept="image/*">
			</div>

			<div class="previewWrap">
				<div class="face-circle face-image-input-wrap">
					<img class="preview facePreview" alt="Blank">
				</div>
				<svg class="editFaceImage" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
			</div>

			<div class="license-plate">
				<input type="text" class="license" maxlength="8" value="15E28Y">
				<img src="assets/Blank-License-Plate.png" alt="License Plate">
			</div>	
		</div>
	`);
}
