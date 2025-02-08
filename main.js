const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("preview");
const imageInputButton = document.querySelector(".image-input-wrap");
const editImages = document.querySelectorAll(".editImage");
// const noImageYet = document.getElementById("noImageYet");

imageInput.addEventListener('change', function(e) {
	addImage(e, imagePreview, imageInputButton);
});

function addImage(event, preview, inputButton) {
	const file = event.target.files[0]; // Get the selected file
		if (file) {
				const reader = new FileReader(); // Create a FileReader to read the image
				reader.onload = function(e) {
						const img = preview;
						img.src = e.target.result; // Set the image source to the uploaded file
						img.style.display = 'block'; // Show the image
						inputButton.style.display = "none";
						// plusImageElements.style.display = 'none'; // Hide the "No image yet" text
				};
				reader.readAsDataURL(file); // Read the file as a data URL
		}
}

function editImage() {
	document.getElementById("imageInput").click();
}
