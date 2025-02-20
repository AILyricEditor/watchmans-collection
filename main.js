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
}

let cards = [];

document.addEventListener("DOMContentLoaded", () => { cards.push(new Card(cardCount)); });

function addCard() {
	cardCount++;
	const cardArea = document.getElementById("cardArea")
	cardArea.innerHTML += cardHTML;
	cards.push(new Card(cardCount));
	// setElements();

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
	const overlay = document.querySelector(".overlay");
  const popups = Array.from(document.querySelectorAll('.expanded'));

  if (popups.length > 0) {
    // Find the highest z-index among open popups
    const highestZIndex = Math.max(
      ...popups.map(popup => Number(window.getComputedStyle(popup).zIndex) || 0)
    );

    overlay.style.zIndex = highestZIndex;

		overlay.style.backdropFilter = "blur(10px)";
		overlay.style.pointerEvents = "auto";
  } else {
    overlay.style.backdropFilter = "none";
		overlay.style.pointerEvents = "none";
  }
}

class Popup {
	constructor(id) {
		// this.options = options;
		this.id = id;
	}

	get self() {
		return document.querySelector(this.id);
	}

	close() {
		console.log("closed");
		this.self.classList.remove("expanded");
		toggleOverlay();
	}

	open() {
		console.log("opened");
		this.self.classList.add("expanded");
		toggleOverlay();
	}
}

const elementsPopup = new Popup(".elements-popup")

// let popups = [];

// document.querySelectorAll(".popup").forEach((popup, index) => {
// 	popups.push(new Popup(index));
// });

// console.log(popups);

// class Element {
// 	constructor(element) {
// 		this.self = element;
// 		// this.index = Array.from(document.querySelectorAll(".element")).indexOf(element);
// 	}

// 	// get self() {
// 	// 	console.log(this.index);
// 	// 	return document.querySelectorAll(this.element)[this.index];
// 	// }

// 	remove() {
// 		console.log("closed");
// 		this.self.style.display = "none";
// 	}

// 	add() {
// 		console.log("opened");
// 		this.self.style.display = "block";
// 	}
// }

// let elements = [];

// function setElements() {
// 	const card = Array.from(document.querySelectorAll(".card")).pop();
// 	elements.push({
// 		main: new Element(card.querySelector(".main")),
// 		face: new Element(card.querySelector(".face")),
// 		name: new Element(card.querySelector(".name")),
// 		license: new Element(card.querySelector(".license-plate"))
// 	});
// 	console.log(elements);
// }

// setElements();


// Add the class "autoInput" to input fields that you want to auto adjust width
// Auto adjust width of input fields with the class autoInput
const autoInput = document.querySelectorAll('.autoInput');

autoInput.forEach(input => {
	input.addEventListener('input', () => {
		const hiddenSpan = input.closest(".nameTypeGroup").querySelector(".text-measurer");
		hiddenSpan.textContent = input.value || input.placeholder;
		input.style.width = hiddenSpan.offsetWidth + 20 + 'px'; // Add padding
	});
});



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
			elementsPopup.close();
		}

		if (e.target.matches(".addToCard")) {
			let option = e.target.closest(".option").getAttribute("data-option");
			document.querySelector(".expanded").querySelector(`.${option}`).style.display = "flex";
			// let expanded = document.querySelector(".expanded");
			// let index = Array.from(document.querySelectorAll(".card")).indexOf(expanded);
			// elements[index - 1][option].remove();
			// console.log(index);
			// console.log(elements[index - 1][option]);
		}

		if (addElement) {
			console.log("Opened");
			elementsPopup.open();
		}
	});
});