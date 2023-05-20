let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);

let destinationText = params.get("destination");
let destination = document.getElementById("destination");

destination.value = destinationText;

let destinationValue = destination.value;

let locationFrom = document.getElementById("from");

let locationFromValue = locationFrom.value; 

let result = document.getElementById("resultDisplay");

document.getElementById('bookingInputs').addEventListener('submit', function (event) {
    event.preventDefault();

    doLocationInfo(destination.value);
    result.style.display = "block";
});

function doLocationInfo() {
    var data = [
        {
            value: 'Bali-Indonesia',
            location: 'Bali, Indonesia',
            timezone: '8',
        },
        {
            value: 'Kyoto-Japan',
            location: 'Kyoto, Japan',
            timezone: '9',
        },
        {
            value: 'Paris-France',
            location: 'Paris France',
        },
        {
            value: 'Santorini-Greece',
            location: 'Santorini, Greece',
        },
        {
            value: 'Tokyo-Japan',
            location: 'Tokyo, Japan',
        },
        {
            value: 'South-Africa',
            location: 'South Africa',
        },
        {
            value: 'Petra-Jordan',
            location: 'Petra, Jordan',
        },
        {
            value: 'Australia',
            location: 'Australia',
        },
        {
            value: 'Tanzania',
            location: 'Tanzania',
        },
        {
            value: 'Peru',
            location: 'Peru',
        },
        {
            value: 'New-York-City-USA',
            location: 'New York City, USA',
        },
        {
            value: 'Italy',
            location: 'Italy',
        },
        {
            value: 'Iceland',
            location: 'Iceland',
        },
        {
            value: 'Sydney-Australia',
            location: 'Sydney, Australia',
        },
        {
            value: 'Brazil',
            location: 'Brazil',
        },
        {
            value: 'Croatia',
            location: 'Croatia',
        },
        {
            value: 'Morocco',
            location: 'Morocco',
        },
        {
            value: 'Toronto-Canada',
            location: 'Toronto, Canada',
        },
        {
            value: 'Los-Angeles-USA',
            location: 'Los Angeles, USA',
        },
        {
            value: 'Beijing-China',
            location: 'Beijing, China',
        },
        {
            value: 'Bangkok-Thailand',
            location: 'Bangkok, Thailand',
        },
        {
            value: 'Manila-Philippines',
            location: 'Manila, Philippines',
        },
        {
            value: 'Seoul-South-Korea',
            location: 'Seoul, South Korea',
        },
        {
            value: 'Vatican-City',
            location: 'Vatican-City',
        },
        {
            value: 'Hong-Kong',
            location: 'Hong Kong',
        },
        {
            value: 'Maldives',
            location: 'Maldives',
        },
        {
            value: 'Hanoi-Vietnam',
            location: 'Hanoi, Vietnam',
        },
        {
            value: 'Kuala-Lumpur-Malaysia',
            location: 'Kuala Lumpur, Malaysia',
        },
        {
            value: 'Berlin-Germany',
            location: 'Berlin, Germany',
        },
        {
            value: 'Madrid-Spain',
            location: 'Madrid, Spain',
        },
        {
            value: 'Oslo-Norway',
            location: 'Oslo, Norway',
        },
        {
            value: 'Stockholm-Sweden',
            location: 'Stockholm, Sweden',
        },
        {
            value: 'Amsterdam-Netherlands',
            location: 'Amsterdam, Netherlands',
        },
        {
            value: 'Belgium',
            location: 'Belgium',
        },
            ];
        var resultTo = data.filter(function(to) {
            return to.value === destination.value;
        });
        var resultFrom = data.filter(function(from) {
            return from.value === locationFrom.value;
        });    

        // Checks if the results are not empty
        if (resultTo.length > 0 && resultFrom.length > 0) {
            var timezoneFrom = resultFrom[0].timezone;
            var timezoneTo = resultTo[0].timezone; 

            let output = "<h1 style='color: black'> Ticket </h1>"
            
            // -----------------------------Flight Times--------------------------------- //

            let flightDuration = parseInt(document.getElementById("flightDura").value);
            let flightStart = document.getElementById("flightStart").value;
            
            // Convertion of flightStart to Standard Time
            flightStart = convertToStandardTime(flightStart);

            // Adds Take off and Duration to the Output
            output += "Flight Take Off: " + flightStart;
            output += "<br> Flight Duration: " + flightDuration;
            
            // Found from internet 💀
            let [hours, minutes] = flightStart.split(":");
      
            // Adding all the hours
            hours = parseInt(hours) - parseInt(timezoneFrom) + parseInt(timezoneTo) + parseInt(flightDuration);
            minutes = parseInt(minutes);
            
            // Making Sure the hours is still in military time
            hours = hours % 24;
            
            // Finalizing hour
            let formattedHours = hours.toString().padStart(2, "0");
            let formattedMinutes = minutes.toString().padStart(2, "0");
            
            // Connecting Hours and Minutes
            let militaryTime = formattedHours + ":" + formattedMinutes;
            
            // Converting to Standard
            let flightArrival = convertToStandardTime(militaryTime);
            console.log(flightArrival);
            // Add to Output
            output += "<br> Flight Arrival: " + flightArrival;

            // ------------------------------- Flight Times End ----------------------------------- //

            // Add From to Output
            resultFrom.forEach(function(from) {
            output += "<br> From: " + from.location + "<br>";
        }); 
            // Add To to Output
            resultTo.forEach(function(to) {
            output += "To: " + to.location + "<br>";
        });
            // Display result
            document.getElementById("result").innerHTML = output;
        } 

        else {
            // Triggers if their is no input
            document.getElementById("result").innerHTML = "No results found.";
        }
    }

// Adds indication with blur
function elementBlur(input) {
    input.style.outline = '2px solid transparent';
    if (input.value.trim() === '') {
        input.style.border = '2px solid red';
    } 
    else {
        input.style.border = '2px solid green';
    }
}
// Adds indication with focus
function elementFocus(input) {
    input.style.outline = '2px solid green';
    input.style.border = '2px solid transparent';
}
// The converter from Military Time to Standard Time
function convertToStandardTime(militaryTime) {
    var hour = parseInt(militaryTime.substr(0, 2));
    var minute = militaryTime.substr(3, 2);
    var period = "AM";

    if (hour === 0) {
        hour = 12;
    } else if (hour === 12) {
        period = "PM";
    } else if (hour > 12) {
        hour -= 12;
        period = "PM";
    }

return hour + ":" + minute + " " + period;
}