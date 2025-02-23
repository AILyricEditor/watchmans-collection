let cardCount = 1;

const cardHTML = `
	<section class="card">
		<h1 class="cardCount">${cardCount}</h1>
		<svg class="expand" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z"/></svg>
		<div class="cardTools">
			<svg class="edit-button editImage" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
			<svg class="xButton" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
		</div>

		<!-- Main Image Input -->
		<div class="input-group main element">
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
		<div class="input-group face element">
			<!-- Face Circle Container -->
			<div class="preview-wrap">
				<img class="preview" alt="Blank">
				<svg class="editImage" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
			</div>

			<h6 class="input-info" data-fontsize="2">Add face</h6>
			<svg class="icon-upload" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
			<input type="file" class="input-file" accept="image/*">
		</div>

		<div class="name element">
			<h4>Name: </h4>
			<label for="name">First</label>
			<input type="text" class="input info-input autoInput" id="name" maxlength="15" name="name" value="John">
			<span class="text-measurer"></span>
			<label class="nameType" for="last">Last</label>
			<input type="text" class="input info-input autoInput" id="last" maxlength="15" value="Doe">
			<span class="text-measurer"></span>
		</div>

		<!-- License Plate -->
		<div class="license-plate element">
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