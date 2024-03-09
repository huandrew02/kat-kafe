var modal = document.getElementById('bookingModal');
var close = document.getElementsByClassName("close")[0];


function openNav() {
  document.getElementById("mySidepanel").style.width = "100%";
}
  
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

function toggleModal(display, bookingType = '') {
  modal.style.display = display;
  if (display === 'none') {
    document.getElementById('bookingForm').reset();
  } else {
    document.getElementById('bookingType').value = bookingType;
    populateTimes(); // Only populate times when opening the modal
  }
}

// Helper function to iterate over buttons and add event listeners
function addBookingButtonListeners(buttons, bookingType) {
  Array.from(buttons).forEach(button => {
    button.addEventListener('click', () => toggleModal('block', bookingType));
  });
}

// Add listeners to booking buttons
addBookingButtonListeners(document.getElementsByClassName('regular-visit-btn'), 'Regular visit');
addBookingButtonListeners(document.getElementsByClassName('kids-hour-btn'), 'Kids hour');

// Close button and outside click listener
close.addEventListener('click', () => toggleModal('none'));
window.addEventListener('click', event => {
  if (event.target === modal) toggleModal('none');
});

populateDropdowns();
document.getElementById('adults').addEventListener('change', updateChildrenOptions);
document.getElementById('children').addEventListener('change', updateAdultOptions);

document.getElementById('bookingForm').addEventListener('submit', function(event) {
  event.preventDefault();
  submitForm(event.target);
});

function submitForm(form) {
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      console.log('Form successfully submitted');
      toggleModal('none');
      alert("see you soon!");
    } else {
      throw new Error('Form submission failed');
    }
  }).catch(error => {
    console.error('Error:', error);
  });
}

function populateDropdowns() {
  const adultsDropdown = document.getElementById('adults');
  const childrenDropdown = document.getElementById('children');

  // Initially fill the dropdowns
  fillDropdown(adultsDropdown, 1, 5);
  fillDropdown(childrenDropdown, 0, 5);
}

function fillDropdown(dropdown, min, max) {
  const currentValue = parseInt(dropdown.value, 10);
  dropdown.innerHTML = '';
  for (let i = min; i <= max; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    dropdown.appendChild(option);
  }
  if (currentValue >= min && currentValue <= max) {
    dropdown.value = currentValue;
  }
}

function updateChildrenOptions() {
  const adults = parseInt(document.getElementById('adults').value, 10);
  const maxChildren = Math.max(0, 5 - adults);
  fillDropdown(document.getElementById('children'), 0, maxChildren);
}

function updateAdultOptions() {
  const children = parseInt(document.getElementById('children').value, 10);
  const adultsDropdown = document.getElementById('adults');
  const currentAdults = parseInt(adultsDropdown.value, 10);
  const maxAdults = 5 - children;

  // If current selection of adults is still valid, preserve it, else reset to 1
  if (currentAdults > maxAdults || isNaN(currentAdults)) {
    fillDropdown(adultsDropdown, 1, maxAdults); // At least 1 adult if there are children
    adultsDropdown.value = Math.min(currentAdults, maxAdults);
  } else {
    // Adjust the maximum number of adults without changing the current selection
    fillDropdown(adultsDropdown, 1, maxAdults);
    adultsDropdown.value = currentAdults;
  }
}

function populateTimes() {
  const dateInput = document.getElementById('date');
  const timeSelect = document.getElementById('time');

  dateInput.onchange = function() {
    // Clear the previous options
    timeSelect.innerHTML = '';

    const chosenDate = new Date(this.value);
    const dayOfWeek = chosenDate.getDay();
    //console.log(dayOfWeek);

    const timesByDay = {
      '0': ['10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm'], // Monday
      '1': ['10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm'], // Tuesday
      '3': ['10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm'], // Thursday
      '4': ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'], // Friday
      '5': ['11am', '12pm', '1pm', '2pm', '3pm', '4pm'], // Saturday
    };

    // Check if the chosen day is in our object of available times
    if (dayOfWeek in timesByDay) {
      // If yes, loop over the times and create option elements for each one
      timesByDay[dayOfWeek].forEach((time) => {
        const timeOption = document.createElement('option');
        timeOption.value = time;
        timeOption.textContent = time;
        timeSelect.appendChild(timeOption);
      });
    } else {
      // If the chosen day is not in the object, it's a closed day, so add an option that says 'Closed'
      const closedOption = document.createElement('option');
      closedOption.value = '';
      closedOption.textContent = 'Closed';
      timeSelect.appendChild(closedOption);
    }
  };
}
