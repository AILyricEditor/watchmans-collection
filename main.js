class Card {
	constructor() {
		// this.html = cardHTML;
		const allCards = document.querySelectorAll(".card");
		this.index = allCards.length - 1;
		this.self = document.querySelectorAll(".card")[allCards.length - 1];
		this.update();
	}

	get innerHTML() {
		return this.self.innerHTML;
	}

	update() {
		this.self = document.querySelectorAll(".card")[this.index];
		this.self.querySelector(".expand").addEventListener("click", () => { this.expand(); });
		this.self.querySelector(".xButton").addEventListener("click", () => { this.close(); });
		this.self.querySelector(".edit-button").addEventListener("click", () => { this.toggleEdit(); });
		this.inputImage();
		this.autoNameLength();
		this.adjustFontSize();
	}

	expand() {
		console.log("expnaded");
		document.querySelectorAll(".card").forEach(el => el.classList.remove("expanded"));
		this.self.classList.add("expanded");
		this.adjustFontSize();
		toggleOverlay();
	}

	close() {
		this.self.classList.remove("expanded");
		this.self.classList.remove("editMode");
		toggleOverlay();
		update();
	}

	inputImage() {
		this.self.querySelectorAll(".input-file").forEach((input, index) => {
			input.addEventListener("change", function () {
				const file = this.files[0];

				if (file) {
					const reader = new FileReader();
					reader.onload = function (e) {
						const preview = input.closest(".input-group").querySelector(".preview");
						preview.src = e.target.result;
						preview.style.display = "block"; // Show the image

						// Edit image button
						const editImage = input.closest(".input-group").querySelector(".editImage");
						editImage.addEventListener("click", function (e) {
							input.click();
						})

						// Get parent group
						let parentGroup = input.closest(".input-group"); // Use `input` instead
						parentGroup.classList.add("active");
					};
					reader.readAsDataURL(file);
				}
			});
		});
	}

	adjustFontSize() {	
		const licenseInput = this.self.querySelector('.license-input');
		
		licenseInput.style.fontSize = `${this.self.offsetWidth / 8}px`;
	
		const inputInfo = this.self.querySelectorAll(".input-info");

		inputInfo.forEach(input => {
			let dataFontSize = input.getAttribute("data-fontsize");
			if (!dataFontSize) dataFontSize = 1;
			input.style.fontSize = `${this.self.offsetWidth / 25 / dataFontSize}px`;
		});
	}

	toggleEdit() {
		this.self.classList.toggle("editMode");
	}

	autoNameLength() {
		const measurers = this.self.querySelectorAll(".text-measurer");
		this.self.querySelectorAll(".info-input").forEach((input, index) => {
			input.addEventListener("input", adjustWidth);
			input.addEventListener("DOMContentLoaded", adjustWidth);
			input.addEventListener("keydown", adjustWidth);
			function adjustWidth() {
				measurers[index].textContent = input.value || input.placeholder; // Match text
				input.style.width = measurers[index].offsetWidth + 5 + "px"; // Adjust width
			}
		});
	}
}

let cards = [];
document.addEventListener("DOMContentLoaded", () => {
	cards.push(new Card());
});

function addCard() {
	cardCount++;
	const cardArea = document.getElementById("cardArea")
	cardArea.innerHTML += cardHTML;
	cards.push(new Card());

	update();
}

function update() {
	// Call adjustFontSize when needed, for example, on window resize or when grid changes
	window.addEventListener('resize', () => { update() }, {once: true});
	// Update font sizes
	cards.forEach((card, index) => { card.update(); });
}

// To Initialize all event listeners
update();

function toggleOverlay() {
	const overlay = document.getElementById("overlay");
	overlay.style.backdropFilter == "blur(10px)" ? overlay.style.backdropFilter = "none" : overlay.style.backdropFilter = "blur(10px)";
	overlay.style.pointerEvents == "auto" ? overlay.style.pointerEvents = "none" : overlay.style.pointerEvents = "auto";
}