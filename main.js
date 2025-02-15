let cardCount = 1;

function addCard() {
	cardCount++;
	document.getElementById("cardArea").innerHTML += cardHTML;
	update();
}

function update() {
	// Update the image inputs
	imageInput();
	// Update font sizes
	adjustFontSize();
	// Call adjustFontSize when needed, for example, on window resize or when grid changes
	window.addEventListener('resize', () => {adjustFontSize()});
	// Update the edit buttons
	editButton();
	// Update the expand card functionality
	expandCard();
	// Update the name input's size 
	autoNameLength();
}

// To Initialize all event listeners
update();

function imageInput() {
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

function adjustFontSize() {
	const licenseInputs = document.querySelectorAll('.license-input');
	const inputInfos = document.querySelectorAll(".input-info");
	const cards = document.querySelectorAll(".card");
	const licenseImages = document.querySelectorAll(".license-input");

	licenseInputs.forEach((license, index) => {
		const licenseWidth = licenseImages[index].offsetWidth;
		license.style.fontSize = `${licenseWidth / 6}px`;
	});

	inputInfos.forEach((info, index) => {
		const parentWidth = info.parentElement.offsetWidth;
		let dataFontSize = info.getAttribute("data-fontsize");
		if (!dataFontSize) dataFontSize = 1;
		info.style.fontSize = `${parentWidth / 25 * dataFontSize}px`;
	});
}

function autoNameLength() {
	const measurer = document.querySelectorAll(".text-measurer");
	document.querySelectorAll(".info-input").forEach((input, index) => {
		input.addEventListener("input", adjustWidth);
		input.addEventListener("DOMContentLoaded", adjustWidth);
		input.addEventListener("keydown", adjustWidth);
		function adjustWidth() {
			measurer[index].textContent = input.value || input.placeholder; // Match text
			input.style.width = measurer[index].offsetWidth + 5 + "px"; // Adjust width
		}
	});
}

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

function expandCard() {
	document.querySelectorAll(".expand").forEach(button => {
		button.addEventListener("click", function () {
			if (!this.parentElement.classList.contains("add")) {
				document.querySelectorAll(".card").forEach(el => el.classList.remove("expanded"));
				this.parentElement.classList.add("expanded");
				toggleOverlay();
				adjustFontSize();
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
			update();
		});
	});
}

function toggleOverlay() {
	const overlay = document.getElementById("overlay");

	overlay.style.backdropFilter == "blur(10px)" ? overlay.style.backdropFilter = "none" : overlay.style.backdropFilter = "blur(10px)";
	overlay.style.pointerEvents == "auto" ? overlay.style.pointerEvents = "none" : overlay.style.pointerEvents = "auto";
}