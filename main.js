class Card {
	constructor(index) {
		this.index = index;
	}

	get self() {
		return document.querySelectorAll(".card")[this.index];
	}

	get innerHTML() {
		return this.self.innerHTML;
	}

	expand() {
		document.querySelectorAll(".card").forEach(el => el.classList.remove("expanded"));
		this.self.classList.add("expanded");
		adjustFontSize();
		toggleOverlay();
	}

	close() {
		this.self.classList.remove("expanded");
		this.self.classList.remove("editMode");
		document.querySelector(".tool-wheel").classList.remove("editMode");
		toggleOverlay();
		adjustFontSize();
		update();
	}

	toggleEdit() {
		this.self.classList.toggle("editMode");
		document.querySelector(".tool-wheel").classList.toggle("editMode");
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
	adjustFontSize();
}

// To Initialize all event listeners
window.addEventListener('resize', () => { update() });
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

const elementsPopup = new Popup(".elements-popup");

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
			adjustFontSize();
			return;
    }

    const xButton = e.target.closest(".xButton");
    if (xButton && card.contains(xButton)) {
			card.classList.remove("expanded", "editMode");
			document.querySelector(".tool-wheel").classList.remove("editMode");
			toggleOverlay();
			adjustFontSize();
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

	document.addEventListener("input", function (e) {
		e.stopPropagation();
		const autoInput = document.querySelectorAll('.autoInput');
		if (e.target.matches(".autoInput")) {
			autoInput.forEach(input => {
				input.addEventListener('input', () => {
					const hiddenSpan = input.parentElement.querySelector(".text-measurer");
					hiddenSpan.textContent = input.value || input.placeholder;
					input.style.width = hiddenSpan.offsetWidth + 10 + 'px'; // Add padding
				});
			});
		}
	});

	// Popups
	document.addEventListener("click", (e) => {
		e.stopPropagation();
		const addElement = e.target.closest(".addElement");

		if (e.target.matches(".close")) {
			elementsPopup.close();
		}

		if (e.target.matches(".addToCard")) {
			e.stopPropagation();
			let optionIndex = Array.from(e.target.closest(".expanded").querySelectorAll(".option")).indexOf(e.target.closest(".option"));
			e.target.closest(".option").style.display = "none";
			document.querySelectorAll(".expanded .element")[optionIndex].style.display = "flex";
			elementsPopup.close();
		}

		if (addElement) {
			console.log("Opened");
			elementsPopup.open();
		}
	});
});

function adjustFontSize() {
	document.querySelectorAll(".card").forEach(card => {
		card.style.fontSize = `${card.offsetWidth / 400}em`;
	});
}