class Card {
	constructor(index) {
		this.index = index;
		this.update();
	}

	get self() {
		return document.querySelectorAll(".card")[this.index];
	}

	get innerHTML() {
		return this.self.innerHTML;
	}

	update() {
		if (!this.self) return;
		this.autoNameLength();
		this.autoFontSize();
	}

	expand() {
		document.querySelectorAll(".card").forEach(el => el.classList.remove("expanded"));
		this.self.classList.add("expanded");
		this.autoFontSize();
		toggleOverlay();
	}

	close() {
		this.self.classList.remove("expanded");
		this.self.classList.remove("editMode");
		document.querySelector(".tool-wheel").classList.remove("editMode");
		toggleOverlay();
		update();
	}

	toggleEdit() {
		this.self.classList.toggle("editMode");
		document.querySelector(".tool-wheel").classList.toggle("editMode");
	}

	autoFontSize() {	
		const licenseInput = this.self.querySelector('.license-input');
		
		licenseInput.style.fontSize = `${this.self.offsetWidth / 8}px`;
	
		const inputInfo = this.self.querySelectorAll(".input-info");

		inputInfo.forEach(input => {
			let dataFontSize = input.getAttribute("data-fontsize");
			if (!dataFontSize) dataFontSize = 1;
			input.style.fontSize = `${this.self.offsetWidth / 25 / dataFontSize}px`;
		});
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

document.addEventListener("DOMContentLoaded", () => { cards.push(new Card(cardCount)); });

function addCard() {
	cardCount++;
	const cardArea = document.getElementById("cardArea")
	cardArea.innerHTML += cardHTML;
	cards.push(new Card(cardCount));

	update();
}

function update() {
	// Update font sizes
	window.addEventListener('resize', () => { update() }, {once: true});
	cards.forEach((card, index) => { card.update(); });
}

// To Initialize all event listeners
update();



function toggleOverlay() {
	const overlay = document.getElementById("overlay");
	overlay.style.backdropFilter == "blur(10px)" ? overlay.style.backdropFilter = "none" : overlay.style.backdropFilter = "blur(10px)";
	overlay.style.pointerEvents == "auto" ? overlay.style.pointerEvents = "none" : overlay.style.pointerEvents = "auto";
}


class Popup {
	constructor(index) {
		// this.options = options;
		this.index = index;
	}

	get self() {
		return document.querySelectorAll(".popup")[this.index];
	}

	close() {
		console.log("closed");
		this.self.style.scale = 0;
	}

	open() {
		console.log("opened");
		this.self.style.scale = 1;
	}
}

let popups = [];

document.querySelectorAll(".popup").forEach((popup, index) => {
	popups.push(new Popup(index));
});

console.log(popups);



// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
	// Expand, Close, EditImage and EditMode buttons
	document.getElementById("cardArea").addEventListener("click", function (e) {
		const card = e.target.closest(".card");
		if (!card) return;

		const expandButton = e.target.closest(".expand");
    if (expandButton && card.contains(expandButton)) {
        document.querySelectorAll(".card").forEach(el => el.classList.remove("expanded"));
        card.classList.add("expanded");
        toggleOverlay();
        return;
    }

    const xButton = e.target.closest(".xButton");
    if (xButton && card.contains(xButton)) {
        card.classList.remove("expanded", "editMode");
				document.querySelector(".tool-wheel").classList.remove("editMode");
        toggleOverlay();
        return;
    }

    const editButton = e.target.closest(".edit-button");
    if (editButton && card.contains(editButton)) {
        card.classList.toggle("editMode");
				document.querySelector(".tool-wheel").classList.toggle("editMode");
        return;
    }

		const editImage = e.target.closest(".editImage");
		if (editImage && card.contains(editImage)) {
			editImage.parentElement.parentElement.querySelector(".input-file").click();
		}

		const deleteCard = e.target.closest(".delete-card");
		if (deleteCard && card.contains(deleteCard)) {
			const index = Array.from(document.querySelectorAll(".card")).indexOf(card) - 1;
			cards.splice(index, 1);
			card.remove();
			toggleOverlay();
		}
	});

	// Image Inputs
	cardArea.addEventListener("change", function (e) {
		if (e.target.matches(".input-file")) {
			const input = e.target;
			const file = input.files[0];

			if (file) {
				const reader = new FileReader();
				reader.onload = function (event) {
					const preview = input.closest(".input-group").querySelector(".preview");
					preview.src = event.target.result;
					preview.style.display = "block";
					input.closest(".input-group").classList.add("active");
				};
				reader.readAsDataURL(file);
			}
		}
	});	

	// Popups
	document.addEventListener("click", (e) => {
		const popup = e.target.closest(".popup");
		const toolWheel = e.target.closest(".tool-wheel");
		const addElement = e.target.closest(".addElement");
		const popupIndex = Array.from(document.querySelectorAll(".popup")).indexOf(popup);
		// if (!popup && !toolWheel) return;

		// const closePopup = popup.querySelector(".close");
		if (e.target.matches(".close")) {
			popups[popupIndex].close();
		}

		if (addElement) {
			console.log("Opened");
			document.querySelector(".elements-popup").style.scale = 1;;
		}
	});
});