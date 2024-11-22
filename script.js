document.addEventListener("DOMContentLoaded", function () {
  // Initialize skills animations
  const skills = document.querySelectorAll("#skills ul li");
  if (skills.length > 0) {
    skills.forEach((skill, index) => {
      skill.style.animation = `fadeInUp 1s ease ${index * 0.1}s forwards`;
    });
  }

  // Initialize Typed.js
  if (typeof Typed !== "undefined") {
    var typed = new Typed(".multiple-text", {
      strings: [
        "Software Development Engineer in Test (SDET)",
        "QA Automation Engineer",
        "Software QA Analyst",
        "Backend Tester",
        "Rest & Api Tester",
        "Software Test Engineer",
        "Manual Tester",
        "Network Security & Server Administrator",
      ],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });
  } else {
    console.error("Typed.js is not loaded.");
  }

  // Toggle icon navbar
  let menuIcon = document.querySelector("#menu-icon");
  let navbar = document.querySelector(".navbar");

  if (menuIcon && navbar) {
    menuIcon.onclick = () => {
      menuIcon.classList.toggle("bx-x");
      navbar.classList.toggle("active");
    };
  }

  // Scroll sections active link and sticky navbar
  let sections = document.querySelectorAll("section");
  let navlinks = document.querySelectorAll("header nav a");
  let header = document.querySelector("header");

  window.onscroll = () => {
    if (header) {
      header.classList.toggle("sticky", window.scrollY > 100);
    }

    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navlinks.forEach((link) => {
          link.classList.remove("active");
          let activeLink = document.querySelector(
            "header nav a[href*=" + id + "]"
          );
          if (activeLink) {
            activeLink.classList.add("active");
          }
        });
      }
    });
  };

  // Remove toggle icon and navbar when clicking navbar link (scroll)
  navlinks.forEach((link) => {
    link.onclick = () => {
      if (menuIcon && navbar) {
        menuIcon.classList.remove("bx-x");
        navbar.classList.remove("active");
      }
    };
  });
});
/*====scroll reveal====*/
ScrollReveal({
  //reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container .portfolio-box, .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

/* contact email*/
const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

// Function to send the email
function sendEmail() {
  // Formulate the body message using template literals
  const bodyMessage = `
    Full Name: ${fullName.value}<br>
    Email: ${email.value}<br>
    Phone Number: ${phone.value}<br>
    Message: ${mess.value}
  `;

  // Use EmailJS or another service for sending the email (avoid storing credentials in client-side code)
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "patrick.udo50@gmail.com",
    Password: "A5EFD4A99B77EB8E6D871F146D260608ACAE", // Not secure - ideally should be server-side
    To: "patrick.udo50@gmail.com",
    From: "patrick.udo50@gmail.com",
    Subject: subject.value,
    Body: bodyMessage,
  })
    .then((message) => {
      // Display success message using SweetAlert2
      if (message === "OK") {
        Swal.fire({
          title: "Success!",
          text: "Message sent successfully!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong, please try again.",
          icon: "error",
        });
      }
    })
    .catch((error) => {
      // Handle errors and display an error message
      Swal.fire({
        title: "Error!",
        text: "Failed to send email: " + error,
        icon: "error",
      });
    });
}

// Add an event listener to the form's submit event
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Optional: Validate form fields here before sending
  if (validateForm()) {
    sendEmail(); // Call the sendEmail function if validation passes
  }
});

// Function to validate the form fields (optional but recommended)
function validateForm() {
  if (
    !fullName.value ||
    !email.value ||
    !phone.value ||
    !subject.value ||
    !mess.value
  ) {
    Swal.fire({
      title: "Error!",
      text: "All fields are required.",
      icon: "error",
    });
    return false; // Prevent form submission if validation fails
  }

  // Validate email format (basic regex check)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    Swal.fire({
      title: "Error!",
      text: "Please enter a valid email address.",
      icon: "error",
    });
    return false; // Prevent form submission if email is invalid
  }

  return true; // Validation passed
}
