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
    // Check if the data is an array
    if (Array.isArray(data)) {
      data.forEach(doctor => {
        // Clone the template to create a new instance of the doctor card
        const doctorCard = doctorTemplate.content.cloneNode(true);

        // Check if specialty exists before adding it as a class
        if (doctor.specialty) {
          doctorCard.querySelector(".Doctors").classList.add(doctor.specialty);
        } else {
          console.error(`No specialty provided for doctor: ${doctor.name}`);
        }

        // Assign doctor information to the card
        doctorCard.querySelector(".doctor-name").textContent = doctor.name || "Name not available";
        doctorCard.querySelector(".doctor-speciality").textContent = doctor.specialty || "Specialty not available";
        doctorCard.querySelector(".doctor-experience").textContent = doctor.experience || "Experience not available";
        doctorCard.querySelector(".doctor-location").textContent = doctor.area || "Location not available";

        // Handle phone field - remove it if not needed
        const doctorPhone = doctorCard.querySelector(".doctor-phone");
        if (doctorPhone) {
          doctorPhone.style.display = 'none';
        }

        // Set the image source, check if it exists
        const doctorImage = doctorCard.querySelector(".doctor-image");
        doctorImage.src = doctor.image ? doctor.image : "https://raw.githubusercontent.com/alliyawajed/doctor-search/main/img/defaultimage.jpg";
        doctorImage.alt = `Photo of Dr. ${doctor.name}`;

        // Add the doctor card to the container
        doctorsContainer.appendChild(doctorCard);
      });
    } else {
      console.error("Invalid data format. Expected an array.");
    }
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

    // Loop through the specialDoctors (which are filtered by specialty)
    specialDoctors.forEach(doctor => {
      const doctorArea = doctor.querySelector(".doctor-location").textContent.trim().toLowerCase();
      if (doctorArea.includes(value)) {
        doctor.classList.add("visible");
        noResult = false;
      } else {
        doctor.classList.remove("visible");
      }
    });

    if (noResult) {
      noResultFound.style.display = "block"; // Show "No results found" message
    } else {
      noResultFound.style.display = "none"; // Hide message
    }
  });
