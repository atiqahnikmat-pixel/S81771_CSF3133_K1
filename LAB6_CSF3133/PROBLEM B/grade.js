
// ==========================================
// STUDENT GRADE CALCULATOR
// ==========================================

// ERROR LIST FROM ORIGINAL CODE:
//
// Error 1 (grade.html, Line 9):
// Form submission needs to prevent page refresh.
//
// Error 2 (grade.html, Line 17):
// showtable() should be showTable().
//
// Error 3 (grade.html, Line 19):
// grades.js should be grade.js.
//
// Error 4 (grade.html, Head section):
// Missing CSS stylesheet link.
//
// Error 5 (grade.js, Line 5):
// Assignment operator (=) should be comparison operator (===).
//
// Error 6 (grade.js, Line 9):
// isNan() has incorrect capitalization.
// Correct function: isNaN().
//
// Error 7 (grade.js, Line 14):
// && should be || to validate the mark range.
//
// Error 8 (grade.js, Line 28):
// getElementByID() should be getElementById().
//
// Error 9 (grade.js, Line 30):
// colour should be color.
//
// Error 10 (grade.js, Line 38):
// Loop should start at 0 instead of 1.
//
// Error 11 (grade.js, Line 42):
// innerHtml should be innerHTML.


// ==========================================
// 1. checkMark()
// Check and calculate student grade
// ==========================================

function checkMark(event) {

    // Prevent page from refreshing after form submission
    event.preventDefault();

    // Get student name and mark
    let name = document.getElementById("name").value.trim();

    let markInput = document.getElementById("mark").value.trim();


    // Check empty name
    if (name === "") {

        alert("Name must be filled out.");

        return false;

    }


    // Check empty mark
    if (markInput === "") {

        alert("Mark field cannot be empty.");

        return false;

    }


    // Check whether mark is a valid number
    if (isNaN(markInput)) {

        alert("Please enter a valid numeric value.");

        return false;

    }


    // Convert mark into a number
    let mark = Number(markInput);


    // Check mark range
    if (mark < 0 || mark > 100) {

        alert("Mark must be between 0 and 100.");

        return false;

    }


    // Determine student grade
    let grade;

    if (mark >= 80) {

        grade = "A";

    } else if (mark >= 65) {

        grade = "B";

    } else if (mark >= 50) {

        grade = "C";

    } else {

        grade = "F";

    }


    // Display student result
    document.getElementById("result").innerHTML =

        name + " got grade " + grade;


    // Change result colour according to grade
    let resultElement = document.getElementById("result");

    if (grade === "A" || grade === "B") {

        resultElement.style.color = "green";

    } else if (grade === "C") {

        resultElement.style.color = "orange";

    } else {

        resultElement.style.color = "red";

    }


    // Display date and time when grade was checked
    document.getElementById("checkTime").innerHTML =

        "Checked on: " + new Date().toLocaleString();


    return false;

}



// ==========================================
// 2. showTable()
// Display all grade classifications
// ==========================================

function showTable() {

    // Store grade information in arrays
    let grades = ["A", "B", "C", "F"];

    let ranges = ["80-100", "65-79", "50-64", "0-49"];


    // Create table heading
    let tableHTML =

        "<table>" +

        "<tr>" +

        "<th>Grade</th>" +

        "<th>Mark Range</th>" +

        "</tr>";


    // Loop through all grades
    for (let i = 0; i < grades.length; i++) {

        tableHTML +=

            "<tr>" +

            "<td>" + grades[i] + "</td>" +

            "<td>" + ranges[i] + "</td>" +

            "</tr>";

    }


    // Close table
    tableHTML += "</table>";


    // Display table inside HTML
    document.getElementById("tableContainer").innerHTML =

        tableHTML;

}



// ==========================================
// 3. randomMark()
// Generate random mark from 0 to 100
// ==========================================

function randomMark() {

    // Generate random whole number
    let randomNumber = Math.floor(Math.random() * 101);


    // Put random mark into mark input
    document.getElementById("mark").value = randomNumber;

}

