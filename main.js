function addCard() {
	cardArea.insertAdjacentHTML("beforeend", `
		<section class="card">
			<!-- Main Image Input -->
			<div class="input-group main">
				<!-- Main Image Preview -->
				<div class="preview-wrap">
					<img class="preview" alt="Blank">
					<svg class="editImage" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
				</div>

				<h5>Add the main image of the entity</h5>
				<svg class="icon-upload" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
				<input type="file" class="input-file" accept="image/*">
			</div>
	
			<!-- Face Image Input -->
			<div class="input-group face">
				<!-- Face Circle Container -->
				<div class="preview-wrap">
					<img class="preview" alt="Blank">
					<svg class="editImage" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
				</div>

				<h6>Add face</h6>
				<svg class="icon-upload" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
				<input type="file" class="input-file" accept="image/*">
			</div>
	
			<!-- License Plate -->
			<div class="license-plate">
				<input type="text" class="license-input" maxlength="8" value="15E28Y">
				<img class="license-image" src="assets/Blank-License-Plate.png" alt="License Plate">
			</div>
		</section>
	`);
	setEvents();
	adjustFontSize();
}

function setEvents() {
	document.querySelectorAll(".input-file").forEach(input => {
		input.addEventListener("change", function () {
			const file = this.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = function (e) {
					const preview = input.closest(".input-group").querySelector(".preview");
					preview.src = e.target.result;
					preview.style.display = "block"; // Show the image

					const editImage = input.closest(".input-group").querySelector(".editImage");
					editImage.addEventListener("click", function () {
					  input.click();
					})

					// Get parent group and its index
					let groups = document.querySelectorAll(".input-group");
					let parentGroup = input.closest(".input-group"); // Use `input` instead

					if (parentGroup) {
						let index = Array.from(groups).indexOf(parentGroup);
						parentGroup.classList.add("active");
						console.log("Clicked index:", index);
					}
				};
				reader.readAsDataURL(file);
			}
		});
	});
}

setEvents();

function adjustFontSize() {
	const licenseInputs = document.querySelectorAll('.license-input');
	const licenseImages = document.querySelectorAll(".license-image");

	licenseInputs.forEach((license, index) => {
		const licenseWidth = licenseImages[index].offsetWidth;
		license.style.fontSize = `${licenseWidth / 4}px`;
	});
}

// Call adjustFontSize when needed, for example, on window resize or when grid changes
window.addEventListener('resize', adjustFontSize);

adjustFontSize();