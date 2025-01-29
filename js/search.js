// Define the API endpoint URL
const API_ENDPOINT = "https://raw.githubusercontent.com/alliyawajed/doctor-search/main/newdoctorsdata.json";

// Get a reference to the template
const doctorTemplate = document.querySelector("#doctor-template");

// Get a reference to the container where the doctor cards will be inserted
const doctorsContainer = document.querySelector("#doctor-container");

// Fetch the data from the API endpoint
fetch(API_ENDPOINT)
  .then(response => response.json())
  .then(data => {
    // Loop through the data and create a doctor card for each item
    data.forEach(doctor => {
      // Clone the template to create a new instance of the doctor card
      const doctorCard = doctorTemplate.content.cloneNode(true);

      // Fix "speciality" -> "specialty"
      doctorCard.querySelector(".Doctors").classList.add(doctor.specialty);
      doctorCard.querySelector(".doctor-name").textContent = doctor.name;
      doctorCard.querySelector(".doctor-speciality").textContent = doctor.specialty;
      doctorCard.querySelector(".doctor-experience").textContent = doctor.experience;
      doctorCard.querySelector(".doctor-location").textContent = doctor.location;

      // Remove the phone field entirely
      const doctorPhone = doctorCard.querySelector(".doctor-phone");
      if (doctorPhone) {
        doctorPhone.style.display = 'none'; // Hide the phone link
      }

      // Set the image source, prevent undefined errors
      const doctorImage = doctorCard.querySelector(".doctor-image");
      doctorImage.src = doctor.image ? doctor.image : "default-image.jpg"; // Use default if missing
      doctorImage.alt = `Photo of Dr. ${doctor.name}`;

      // Add the doctor card to the container
      doctorsContainer.appendChild(doctorCard);
    });
  })
  .catch(error => {
    console.error("Error fetching doctors data:", error);
  });

// Search Functionality
const specialitySearchInput = document.querySelector(".speciality-search");
const areaSearchInput = document.querySelector(".area-search");
const noResultFound = document.getElementById("no-result-found");

let specialDoctors = []; // Initialize empty array

specialitySearchInput.addEventListener("input", e => {
  const doctors = document.querySelectorAll(".Doctors");
  const value = e.target.value.trim().toLowerCase();

  doctors.forEach(doctor => {
    if (doctor.classList.contains(value)) {
      doctor.classList.add("visible");
    } else {
      doctor.classList.remove("visible");
    }
  });

  specialDoctors = document.querySelectorAll(".visible");
});

areaSearchInput.addEventListener("input", e => {
  const value = e.target.value.trim().toLowerCase();
  let noResult = true;

  specialDoctors.forEach(specialDoctor => {
    const areaNameElement = specialDoctor.querySelector(".area-name");
    const areaName = areaNameElement ? areaNameElement.textContent.toLowerCase() : "";

    if (areaName.includes(value)) {
      specialDoctor.classList.add("visible");
      noResult = false;
    } else {
      specialDoctor.classList.remove("visible");
    }
  });

  if (noResult) {
    noResultFound.classList.add("visible");
  } else {
    noResultFound.classList.remove("visible");
  }
});
