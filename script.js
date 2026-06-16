// ================================
// VOLUNTEER REGISTRATION SYSTEM
// ================================

const volunteerForm =
document.getElementById("volunteerForm");

if (volunteerForm) {

    volunteerForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const college =
                document.getElementById("college").value.trim();

            const department =
                document.getElementById("department").value;

            const reason =
                document.getElementById("reason").value.trim();

            // Validation

            if (
                name === "" ||
                email === "" ||
                phone === "" ||
                college === ""
            ) {

                alert(
                    "Please fill all required fields."
                );

                return;
            }

            // Get Existing Data

            let volunteers =
                JSON.parse(
                    localStorage.getItem("volunteers")
                ) || [];

            // Duplicate Email Check

            const duplicateEmail =
                volunteers.some(
                    volunteer =>
                        volunteer.email.toLowerCase() ===
                        email.toLowerCase()
                );

            if (duplicateEmail) {

                alert(
                    "This email is already registered."
                );

                return;
            }

            // Create Volunteer Object

            const volunteer = {

                id: Date.now(),

                name: name,

                email: email,

                phone: phone,

                college: college,

                department: department,

                reason: reason,

                registeredAt:
                    new Date().toLocaleString()

            };

            // Save

            volunteers.push(volunteer);

            localStorage.setItem(
                "volunteers",
                JSON.stringify(volunteers)
            );

            // Success Popup

            showPopup();

            // Reset Form

            volunteerForm.reset();

        }
    );

}


// ================================
// SUCCESS POPUP
// ================================

function showPopup() {

    const popup =
        document.getElementById("successPopup");

    if (!popup) return;

    popup.style.display = "block";

    setTimeout(() => {

        popup.style.display = "none";

    }, 3000);

}


// ================================
// DASHBOARD LOADER
// ================================

function loadVolunteers() {

    const tableBody =
        document.getElementById("tableBody");

    const count =
        document.getElementById("count");

    if (!tableBody) return;

    let volunteers =
        JSON.parse(
            localStorage.getItem("volunteers")
        ) || [];

    tableBody.innerHTML = "";

    volunteers.forEach(volunteer => {

        tableBody.innerHTML += `

        <tr>

            <td>${volunteer.name}</td>

            <td>${volunteer.email}</td>

            <td>${volunteer.phone}</td>

            <td>${volunteer.college}</td>

            <td>${volunteer.department}</td>
         <td>
            <button
            class="delete-btn"
            onclick="deleteVolunteer(${volunteer.id})">
            Delete
            </button>
            </td>
        </tr>

        `;

    });

    if (count) {

        count.innerText =
            "Total Volunteers : " +
            volunteers.length;

    }

}


// ================================
// SEARCH VOLUNTEERS
// ================================

function searchVolunteer() {

    const searchInput =
        document
        .getElementById("search")
        .value
        .toLowerCase();

    let volunteers =
        JSON.parse(
            localStorage.getItem("volunteers")
        ) || [];

    const filtered =
        volunteers.filter(volunteer =>

            volunteer.name
                .toLowerCase()
                .includes(searchInput) ||

            volunteer.email
                .toLowerCase()
                .includes(searchInput) ||

            volunteer.department
                .toLowerCase()
                .includes(searchInput)

        );

    const tableBody =
        document.getElementById("tableBody");

    tableBody.innerHTML = "";

    filtered.forEach(volunteer => {

        tableBody.innerHTML += `

        <tr>

            <td>${volunteer.name}</td>

            <td>${volunteer.email}</td>

            <td>${volunteer.phone}</td>

            <td>${volunteer.college}</td>

            <td>${volunteer.department}</td>

        </tr>

        `;

    });

}
function deleteVolunteer(id){

    let volunteers =
    JSON.parse(localStorage.getItem("volunteers")) || [];

    volunteers =
    volunteers.filter(v => v.id !== id);

    localStorage.setItem(
        "volunteers",
        JSON.stringify(volunteers)
    );

    loadVolunteers();

}

// ================================
// AUTO LOAD DASHBOARD
// ================================

window.onload = function () {

    loadVolunteers();

};