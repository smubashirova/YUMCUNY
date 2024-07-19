// TODO: Query for button with an id "theme-button"
let themeButton = document.getElementById("theme-button");

// TODO: Complete the toggleDarkMode function
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}

// TODO: Register a 'click' event listener for the theme button
// Set toggleDarkMode as the callback function.
themeButton.addEventListener("click", toggleDarkMode);

// Add your query for the sign now button here
let count = 3;
const signNowButton = document.getElementById('sign-now-button');

const addSignature = (person) => {
  // Get the input values
  const name = document.getElementById('name').value;
  const hometown = document.getElementById('hometown').value;

  // Create a new paragraph element for the new signature
  const newSignature = document.createElement('p');
  newSignature.textContent = `🖊️ ${name} from ${hometown} supports this.`;

  // Find the signatures section and append the new signature
  const signaturesSection = document.querySelector('.signatures');
  signaturesSection.appendChild(newSignature);

  // Counter logic
  const oldCounter = document.getElementById('counter');
  oldCounter.remove();
  count = count + 1;

  // Creating new counter element
  const newCounter = document.createElement('p');
  newCounter.setAttribute("id", "counter");
  newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
  signaturesSection.appendChild(newCounter);
  toggleModal(person);
}

// Add a click event listener to the sign now button here

// Add event listener for validateForm()

// TODO: Remove the click event listener that calls addSignature()

// TODO: Complete validation form
const validateForm = () => {
  let containsErrors = false;

  // Get input values
  const name = document.getElementById('name').value;
  const hometown = document.getElementById('hometown').value;
  const email = document.getElementById('email').value;

  // Define person object
  const person = {
    name: name,
    hometown: hometown,
    email: email
  };

  // Validate name
  if (person.name.length < 2) {
    document.getElementById('name').classList.add('error');
    containsErrors = true;
  } else {
    document.getElementById('name').classList.remove('error');
  }

  // Validate hometown
  if (person.hometown.length < 2) {
    document.getElementById('hometown').classList.add('error');
    containsErrors = true;
  } else {
    document.getElementById('hometown').classList.remove('error');
  }

  // Validate email
  if (!person.email.includes('.com')) {
    document.getElementById('email').classList.add('error');
    containsErrors = true;
  } else {
    document.getElementById('email').classList.remove('error');
  }

  // If no errors, add signature and clear fields
  if (!containsErrors) {
    addSignature(person);
    toggleModal(person);
    const petitionInputs = document.getElementById("sign-petition").elements;
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }
  }
};

signNowButton.addEventListener('click', validateForm);

// TODO: Define animation object
let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

// TODO: Define reduceMotion function
const reduceMotion = () => {
  // Update animation properties as needed
  animation.transitionTimingFunction = 'linear';
  animation.revealDistance = 50;
  animation.transitionDelay = '0s';

  // Apply updated animation properties to revealableContainers
  const revealableContainers = document.querySelectorAll('.revealable');
  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.transition = `all ${animation.transitionDuration} ${animation.transitionTimingFunction} ${animation.transitionDelay}`;
    revealableContainers[i].style.transform = `translateY(${animation.revealDistance}px)`;
  }
};

// TODO: Add event listener for Reduce Motion button
const reduceMotionButton = document.getElementById('reduce-motion-button');

reduceMotionButton.addEventListener('click', reduceMotion);

// TODO: Implement the reveal function and add it as a scroll event listener
const revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
  let windowHeight = window.innerHeight;

  for (let i = 0; i < revealableContainers.length; i++) {
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
};

window.addEventListener('scroll', reveal);
// Define the toggleModal function


// Create a new variable outside of any functions called scaleFactor and set it to 1
let scaleFactor = 1;

// Create another variable outside any function called modalImage that selects the image within the modal
const modalImage = document.querySelector('#thanks-modal img');

// Create a new function called scaleImage that takes no arguments
const scaleImage = () => {
  // Toggle the image size between a factor of 1 and 0.8
  scaleFactor = scaleFactor === 1 ? 0.8 : 1;

  // Apply the scaleFactor to the modalImage
  modalImage.style.transform = `scale(${scaleFactor})`;
};

// Define the toggleModal function
const toggleModal = (person) => {
  // Select the modal and modal content elements
  const modal = document.getElementById('thanks-modal');
  const modalContent = document.getElementById('modal-text-container');

  // Set the display style property of the entire modal to flex
  modal.style.display = "flex";

  // Construct the thank you message
  const message = `Thank you so much, ${person.name}!`;

  // Set the text content of the modal to the thank you message
  modalContent.textContent = message;

  // Set a timeout to hide the modal after a few seconds (e.g., 4 seconds)
  const intervalId = setInterval(scaleImage, 500); // Call scaleImage every 0.5 seconds

  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId); // Stop the animation
  }, 4000); // Hide the modal after 4 seconds
};

// Select the button and save it to a variable
const closeButton = document.getElementById('close-modal-button');

// Function to hide the modal
function closeModal() {
  const modal = document.getElementById('thanks-modal');
  modal.style.display = 'none'; // Set display style property to none
}

// Add click event listener to the button
closeButton.addEventListener('click', closeModal);
