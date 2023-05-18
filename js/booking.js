let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);

let destinationValue = params.get("destination");
let destination = document.getElementById("destination");

destination.value = destinationValue;


function submitResult() {
    console.log()
    return false;
}

document.getElementById('bookingInputs').addEventListener('submit', function (event) {
    event.preventDefault();
    var destination = document.getElementById('destination').value;
    performHotelSearch(destination, checkIn, checkOut);
});

function elementBlur(input) {
    input.style.outline = '2px solid transparent';
    if (input.value.trim() === '') {
        input.style.border = '2px solid red';
    } 
    else {
        input.style.border = '2px solid green';
    }
}

function elementFocus(input) {
    input.style.outline = '2px solid green';
    input.style.border = '2px solid transparent';
}