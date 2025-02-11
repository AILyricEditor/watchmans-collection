let cardCount = 1;
function addCard() {
	cardCount++;
	document.getElementById("cardArea").innerHTML += `
		<section class="card">
			<h1 class="cardCount">${cardCount}</h1>
			<svg class="expand" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z"/></svg>
			<div class="cardTools">
				<svg class="edit-button editImage" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
				<svg class="xButton" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
			</div>
			<!-- Main Image Input -->
			<div class="input-group main">
				<!-- Main Image Preview -->
				<div class="preview-wrap">
					<img class="preview" alt="Blank">
					<svg class="editImage" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
				</div>

				<h5 class="input-info">Add the main image of the entity</h5>
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

				<h6 class="input-info">Add face</h6>
				<svg class="icon-upload" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
				<input type="file" class="input-file" accept="image/*">
			</div>

			<div class="name">
				<h4>Name: </h4>
				<div class="name-group">
					<form class="nameInput-wrap">
						<div class="nameTypeGroup">
							<label for="name">First</label>
							<input type="text" class="input info-input" id="name" name="name" value="John">
						</div>
						<div class="nameTypeGroup">
							<label class="nameType" for="last">Last</label>
							<input type="text" class="input info-input" id="last" maxlength="15" value="Doe">
						</div>
					</form>
				</div>
			</div>
	
			<!-- License Plate -->
			<div class="license-plate">
				<input type="text" class="input license-input" maxlength="8" value="15E28Y">
				<img class="license-image" src="assets/Blank-License-Plate.png" alt="License Plate">
			</div>

			<div class="bottom-row">
				<button class="delete-card">
					<p>Delete</p>
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
				</button>
			</div>
		</section>
	`;
	setEvents();
	adjustFontSize();
	adjustNamePositons();
	editButton();
	expandCard();
	// closeCard();
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
	const inputInfos = document.querySelectorAll(".input-info");
	const card = document.querySelector(".card");
	const cardWidth = card.offsetWidth;

	licenseInputs.forEach((license, index) => {
		license.style.fontSize = `${cardWidth / 8}px`;
	});

	inputInfos.forEach((info, index) => {
		info.style.fontSize = `${cardWidth / 40}px`;
	});
}

// Call adjustFontSize when needed, for example, on window resize or when grid changes
window.addEventListener('resize', () => {adjustFontSize()});

adjustFontSize();

function adjustNamePositons() {
	document.querySelectorAll('.info-input').forEach((input, index) => {
		function adjustWidth() {
			// let inputLeft = input.offsetLeft;
			const nameType = document.querySelectorAll('.nameType');
			input.style.width = Math.max(0, input.value.length * 10) + 'px';
			if (input.value.length <= 3) input.style.width = "75px";
			// nameType[index].style.left = `${input.offsetLeft}px`;
		}
		input.addEventListener('input', adjustWidth);
		adjustWidth(); // Initialize on page load
	});
}

adjustNamePositons();


// Edit Button functionality 

function editButton() {
	const editButtons = document.querySelectorAll(".edit-button");

	editButtons.forEach((edit) => {
		edit.addEventListener("click", () => {
			// Remove 'editMode' from all buttons
			editButtons.forEach((btn) => {
				if (btn != edit) {
					btn.classList.remove("editMode");
				}
			});
			// Toggle 'editMode' on the clicked button
			edit.closest(".card").classList.toggle("editMode");
		});
	});
}
editButton();

function expandCard() {
	document.querySelectorAll(".expand").forEach(button => {
		button.addEventListener("click", function () {
			if (!this.parentElement.classList.contains("add")) {
				document.querySelectorAll(".card").forEach(el => el.classList.remove("expanded"));
				this.parentElement.classList.add("expanded");
				toggleOverlay();
				adjustFontSize();
				adjustNamePositons();
			}
		});
	});

	// Close card when the xButton is clicked
	document.querySelectorAll(".xButton").forEach(xButton => {
		xButton.addEventListener("click", function (event) {
			// event.stopPropagation(); // Stop the event from propagating to the card
			xButton.closest(".card").classList.remove("expanded"); // Close the card
			xButton.closest(".card").classList.remove("editMode");
			toggleOverlay();
			
		});
	});
}

expandCard();


// function closeCard() {
// 	document.querySelectorAll(".xButton").forEach((xButton, index) => {
// 		xButton.addEventListener("click", function () {
// 			const card = xButton.closest(".card"); // Use closest to find the nearest .card ancestor
// 			if (card) {
// 				card.classList.toggle("expanded");
// 			}
// 		});
// 	});
// }

// closeCard();

function toggleOverlay() {
	const overlay = document.getElementById("overlay");

	overlay.style.backdropFilter == "blur(10px)" ? overlay.style.backdropFilter = "none" : overlay.style.backdropFilter = "blur(10px)";
	overlay.style.pointerEvents == "auto" ? overlay.style.pointerEvents = "none" : overlay.style.pointerEvents = "auto";
}
	