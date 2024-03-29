let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);

let destinationText = params.get("destination");
let destination = document.getElementById("destination");

destination.value = destinationText;

let destinationValue = destination.value;

let locationFrom = document.getElementById("from");

let locationFromValue = locationFrom.value; 

let result = document.getElementById("resultDisplay");
let addOns = document.getElementById("customizationDisplay");

document.getElementById('bookingInputs').addEventListener('submit', function (event) {
    event.preventDefault();

    doLocationInfo(destination.value);
    result.style.display = "block";
    addOns.style.display ="block";
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
            timezone: '2',
        },
        {
            value: 'Santorini-Greece',
            location: 'Santorini, Greece',
            timezone: '3',
        },
        {
            value: 'Tokyo-Japan',
            location: 'Tokyo, Japan',
            timezone: '9',
        },
        {
            value: 'South-Africa',
            location: 'South Africa',
            timezone: '2',
        },
        {
            value: 'Petra-Jordan',
            location: 'Petra, Jordan',
            timezone: '3',
        },
        {
            value: 'Australia',
            location: 'Australia',
            timezone: '10',
        },
        {
            value: 'Tanzania',
            location: 'Tanzania',
            timezone: '3',
        },
        {
            value: 'Peru',
            location: 'Peru',
            timezone: '-5',
        },
        {
            value: 'New-York-City-USA',
            location: 'New York City, USA',
            timezone: '-4',
        },
        {
            value: 'Italy',
            location: 'Italy',
            timezone: '1',
        },
        {
            value: 'Iceland',
            location: 'Iceland',
            timezone: '0',
        },
        {
            value: 'Sydney-Australia',
            location: 'Sydney, Australia',
            timezone: '10',
        },
        {
            value: 'Brazil',
            location: 'Brazil',
            timezone: '-3',
        },
        {
            value: 'Croatia',
            location: 'Croatia',
            timezone: '1',
        },
        {
            value: 'Morocco',
            location: 'Morocco',
            timezone: '1',
        },
        {
            value: 'Toronto-Canada',
            location: 'Toronto, Canada',
            timezone: '-4',
        },
        {
            value: 'Los-Angeles-USA',
            location: 'Los Angeles, USA',
            timezone: '-7',
        },
        {
            value: 'Beijing-China',
            location: 'Beijing, China',
            timezone: '8',
        },
        {
            value: 'Bangkok-Thailand',
            location: 'Bangkok, Thailand',
            timezone: '7'
        },
        {
            value: 'Manila-Philippines',
            location: 'Manila, Philippines',
            timezone: '8',
        },
        {
            value: 'Seoul-South-Korea',
            location: 'Seoul, South Korea',
            timezone: '9',
        },
        {
            value: 'Vatican-City',
            location: 'Vatican-City',
            timezone: '1',
        },
        {
            value: 'Hong-Kong',
             location: 'Maldives',
            timezone: '5',
        },
        {
            value: 'Hanoi-Vietnam',
            location: 'Hanoi, Vietnam',
            timezone: '7',
        },
        {
            value: 'Kuala-Lumpur-Malaysia',
            location: 'Kuala Lumpur, Malaysia',
            timezone: '8',
        },
        {
            value: 'Berlin-Germany',
              location: 'Hong Kong',
            timezone: '8',
        },
        {
            value: 'Maldives',
         location: 'Berlin, Germany',
            timezone: '2',
        },
        {
            value: 'Madrid-Spain',
            location: 'Madrid, Spain',
            timezone: '2',
        },
        {
            value: 'Oslo-Norway',
            location: 'Oslo, Norway',
            timezone: '1',
        },
        {
            value: 'Stockholm-Sweden',
            location: 'Stockholm, Sweden',
            timezone: '1',
        },
        {
            value: 'Amsterdam-Netherlands',
            location: 'Amsterdam, Netherlands',
            timezone: '1',
        },
        {
            value: 'Belgium',
            location: 'Belgium',
            timezone: '2',
        },
            ];
        var resultTo = data.filter(function(to) {
            return to.value === destination.value;
        });
        var resultFrom = data.filter(function(from) {
            return from.value === locationFrom.value;
        });    

        var timezoneFrom = parseInt(resultFrom[0].timezone);
        var timezoneTo = parseInt(resultTo[0].timezone); 

        let output = "<h1 style='color: black'> Ticket </h1>"
        
        // -----------------------------Flight Times--------------------------------- //
        let flightDuration = 0;
        
        flightDuration = Math.abs((1.5)*((timezoneFrom+12)-(timezoneTo+12)));
    
        let flightStart = document.getElementById("flightStart").value;
        let flightStartInput = convertToStandardTime(flightStart);

        // Adds Take off and Duration to the Output
        output += "Flight Take Off: " + flightStartInput;
        output += "<br> Maximum Flight Duration: " + flightDuration;
        
        // Found from internet 💀
        let [hours, minutes] = flightStart.split(":");
        let addMinutes = 30+((flightDuration%1)/0.5);
        // Adding all the hours
        console.log(addMinutes);
        hours = parseInt(hours) - parseInt(timezoneFrom) + parseInt(timezoneTo) + Math.floor(flightDuration);
        minutes = parseInt(minutes) + addMinutes;    

        // Making Sure the hours is still in military time
        hours = hours % 24;

        // Finalizing hour
        let formattedHours = hours.toString().padStart(2, "0");
        let formattedMinutes = minutes.toString().padStart(2, "0");
        
        // Connecting Hours and Minutes

        let militaryTime = formattedHours + ":" + formattedMinutes;

        // Converting to Standard
        let flightArrival = convertToStandardTime(militaryTime);
        
        // Add to Output
        output += "<br> Flight Arrival " + flightArrival;

        // ------------------------------- Flight Times End ----------------------------------- //

        // Add From to Output
        resultFrom.forEach(function(from) {
        output += "<br> From: " + from.location + "<br>";
    }); 
        // Add To to Output
        resultTo.forEach(function(to) {
        output += "To: " + to.location + "<br>";
    });

        // Checks if the results are not empty
        if (resultTo.length > 0 && resultFrom.length > 0) {
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
    else{
        
    }

return hour + ":" + minute + " " + period;
}

function timeChange(){
    doLocationInfo(destination.value);
}

document.getElementById('customization').addEventListener('submit', function (event) {
    event.preventDefault();
    customization()
});

function customization(){
    doLocationInfo();

    let output = document.getElementById("result").innerHTML;
    let classes = document.getElementById("class").value ;
    let price = 0;

    if (classes == 1){
        classes = "First Class" ;
        price += 60000;
    }
    else if (classes == 2){
        classes = "Buisness Class" ;
        price += 40000;
    }
    else {
        classes = "Economy Class"
        price += 20000;
    }
    
    output += "<h4 style='color: black;'> Class: " + classes + "</h4>";

    output += "<strong><h2 style='color: black'> Add Ons: </h2><strong>"  ;

    let wifi = document.getElementById("wifi");
    let space = document.getElementById("space");
    let food = document.getElementById("food");
    let boarding = document.getElementById("boarding");
    
    if (wifi.checked == true){
        output += "<h4 style='color:black; font-weight: 200'> In FLight Wifi  &#x2713 </h4>";
        price += 250;
    }
    if (space.checked == true){
        output += "<h4 style='color:black; font-weight: 200'> Extra Leg Space  &#x2713 </h4>";
        price += 300;
    }
    if (food.checked == true){
        output += "<h4 style='color:black; font-weight: 200'> Premium Food  &#x2713 </h4>";
        price += 500;
    }
    if (boarding.checked == true){
        output += "<h4 style='color:black; font-weight: 200'> Priority Boarding  &#x2713 </h4>";
        price += 400;
    }
    if (boarding.checked == false && food.checked == false && space.checked == false && wifi.checked == false){
        output += "<h4 style='color:black; font-weight: 600'> None  &#x2713 </h4>";
    }
    output += "<strong><h2 style='color: black'> Price: </h2><strong>" + `<strong><h2 style='color: black'> P ${price} </h2><strong>`;
    output += "<button id='doneButton' onclick='redirect()'> Done </button>";
    document.getElementById("result").innerHTML = output;

}

function redirect(){
    location.replace("../index.html");
}