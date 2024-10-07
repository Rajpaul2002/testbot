// Get the current date and calculate the previous week's dates (Monday to Friday)
const today = new Date();
const prevWeekDays = getPreviousWeekDays(today);

// Event Listeners for Yes and No buttons
document.getElementById('yesButton').addEventListener('click', function() {
    alert('Thank you for confirming!');
    window.close(); // Exit the page (in most browsers, this may need user permission)
});

document.getElementById('noButton').addEventListener('click', function() {
    displayCheckboxes();
});

// Function to calculate previous week days (Monday to Friday)
function getPreviousWeekDays(date) {
    let days = [];
    let currentDay = date.getDay();  // Sunday = 0, Monday = 1, ..., Saturday = 6
    let mondayOffset = (currentDay + 6) % 7; // Calculate Monday of the previous week

    for (let i = 0; i < 5; i++) {
        let prevDay = new Date(date);
        prevDay.setDate(date.getDate() - mondayOffset + i - 7); // Get dates from last Monday to Friday
        days.push({ day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][i], date: prevDay.toDateString() });
    }
    return days;
}

// Function to display checkboxes for previous week days
function displayCheckboxes() {
    const form = document.getElementById('weekDaysForm');
    form.innerHTML = '';  // Clear any previous content
    prevWeekDays.forEach(day => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = day.date;
        checkbox.name = day.day;
        checkbox.value = `${day.day} (${day.date})`;

        const label = document.createElement('label');
        label.htmlFor = day.date;
        label.textContent = `${day.day} (${day.date})`;

        const br = document.createElement('br');

        form.appendChild(checkbox);
        form.appendChild(label);
        form.appendChild(br);
    });

    document.getElementById('daysForm').classList.remove('hidden');
    document.getElementById('submitDaysButton').classList.remove('hidden');
}

// Submit button logic to display selected days and store in JSON
document.getElementById('submitDaysButton').addEventListener('click', function() {
    const selectedDays = [];
    const checkboxes = document.querySelectorAll('#weekDaysForm input[type="checkbox"]:checked');

    checkboxes.forEach(checkbox => {
        selectedDays.push({
            day: checkbox.name,
            date: checkbox.id
        });
    });

    if (selectedDays.length > 0) {
        document.getElementById('daysList').innerHTML = '';  // Clear previous list
        selectedDays.forEach(day => {
            const li = document.createElement('li');
            li.textContent = `${day.day} (${day.date})`;
            document.getElementById('daysList').appendChild(li);
        });

        document.getElementById('selectedDays').classList.remove('hidden');
        
        // Store selected days in JSON format
        const selectedDaysJSON = JSON.stringify(selectedDays, null, 2);
        console.log("Selected Days JSON:", selectedDaysJSON);

        // Remove the following part to stop displaying JSON on the webpage:
        // const pre = document.createElement('pre');
        // pre.textContent = selectedDaysJSON;
        // document.getElementById('selectedDays').appendChild(pre);

    } else {
        alert('Please select at least one day.');
    }
});
