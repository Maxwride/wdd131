// Data for pickleball paddles
const paddles = [
    {
        name: 'Spin Double Clutch Master',
        url: 'https://www.istockphoto.com/photo/pickleball-paddle-for-playing-pickleball-isolated-on-a-white-background-gm1469774233-500861422?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_photo&utm_content=srp_inline_media&utm_term=pickle%20ball%20paddle',
        description: 'This paddle brings incredible spin to your game by offering a carbon double synchronized design.',
        image: './images/Paddle1.jpg', // Make sure these image paths are correct relative to the HTML
        paddleType: 'Spin',
        rating: 4,
    },
    {
        name: 'The Power Play 23',
        description: 'This paddle brings incredible power to your game by offering a power hexagonal twin plate design.',
        image: './images/Paddle2.jpeg',
        paddleType: 'Power',
        rating: 5,
    },
    {
        name: 'The General 55',
        description: 'This paddle is a great value for the average player! It performs like a paddle beyond its price!',
        image: './images/Paddle3.jpg',
        paddleType: 'General',
        rating: 3,
    },
];

// --- DOM Element Selection ---
// Select elements that are used multiple times
const searchResultsContainer = document.querySelector('#searchResults');
const searchButton = document.querySelector(".search-button");
// *** MODIFIED: Select input by its ID ***
const searchInput = document.querySelector("#searchInput");
const searchForm = document.querySelector("#searchForm"); // Select form to prevent submission


// --- Helper Functions ---

// Gets a random paddle from a given list
function getRandomPaddle(paddleList) {
    if (!Array.isArray(paddleList) || paddleList.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * paddleList.length);
    return paddleList[randomIndex];
}

// Generates HTML for tags
function tagsTemplate(tags) {
    if (Array.isArray(tags) && tags.length > 0) {
        // Added 'tag-button' class for potential styling
        return tags.map(tag => `<button type="button" class="tag-button">${tag}</button>`).join(' ');
    }
    return '';
}

// Generates HTML for star rating
function ratingTemplate(rating) {
    let html = '';
    const maxRating = 5;
    for (let i = 1; i <= maxRating; i++) {
        if (i <= rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star">☆</span>`;
        }
    }
    return html;
}

// Generates the HTML structure for a single paddle card
function paddleTemplate(paddle) {
    if (!paddle) return '';

    // Added classes for easier CSS targeting
    return `
        <section class="paddle-card">
            <div class="paddle-image-container">
                <img class="search-img" src="${paddle.image}" alt="${paddle.name}" />
            </div>
            <div class="paddle-content">
                <div class="paddle-tags">
                    ${tagsTemplate(paddle.tags)}
                </div>
                <h3>${paddle.name}</h3>
                <span class="rating" role="img" aria-label="Rating: ${paddle.rating} out of 5 stars">
                    ${ratingTemplate(paddle.rating)}
                </span>
                <p>${paddle.description}</p>
                ${paddle.url ? `<a href="${paddle.url}" target="_blank" rel="noopener noreferrer" class="paddle-link button-style">View Details</a>` : ''}
            </div>
        </section>
    `;
}

// Renders a list of paddles into the designated container
function renderPaddles(paddleList, containerElement) {
    if (!containerElement) {
        console.error("Search results container not found!");
        return;
    }
    containerElement.innerHTML = ''; // Clear previous results

    if (!Array.isArray(paddleList) || paddleList.length === 0) {
        containerElement.innerHTML = '<p>No paddles found matching your criteria.</p>';
        return;
    }

    const paddlesHTML = paddleList.map(paddle => paddleTemplate(paddle)).join('');
    containerElement.innerHTML = paddlesHTML;
}


// --- Initialization ---

function init() {
    const initialPaddleType = 'General'; // Or 'Spin' or 'Power'
    const paddlesOfType = paddles.filter(paddle => paddle.paddleType === initialPaddleType);
    let paddleToShow = null;

    if (paddlesOfType.length > 0) {
        paddleToShow = getRandomPaddle(paddlesOfType);
    } else {
        console.warn(`No paddles found with type "${initialPaddleType}". Displaying a random paddle instead.`);
        paddleToShow = getRandomPaddle(paddles);
    }

    if (paddleToShow) {
        renderPaddles([paddleToShow], searchResultsContainer);
    } else if(searchResultsContainer) {
         searchResultsContainer.innerHTML = '<p>No paddles available to display.</p>';
         console.error("Could not find any paddle to display during initialization.");
    } else {
        console.error("Search results container not found during init!");
    }
}

// --- Event Listeners ---

// Function to handle the search logic
function handleSearch() {
    if (!searchInput) {
         console.error("Search input element not found!");
         return;
     }
    const userInput = searchInput.value.trim().toLowerCase();
    const filteredPaddles = paddles.filter(function (item) {
        const nameMatch = item.name.toLowerCase().includes(userInput);
        const descriptionMatch = item.description.toLowerCase().includes(userInput);
        const tagsMatch = Array.isArray(item.tags) && item.tags.some(tag => tag.toLowerCase().includes(userInput));
        // Optional: Also search by paddleType
        const typeMatch = item.paddleType.toLowerCase().includes(userInput);

        return nameMatch || descriptionMatch || tagsMatch || typeMatch; // Added typeMatch
    });
    const sortedPaddles = filteredPaddles.sort((a, b) => a.name.localeCompare(b.name));
    renderPaddles(sortedPaddles, searchResultsContainer);
}

// Add listener to the button
if (searchButton) {
    searchButton.addEventListener("click", handleSearch); // Use the search handler function
} else {
    console.error("Search button element not found!");
}

// *** ADDED: Prevent default form submission if user presses Enter in the input ***
if(searchForm) {
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop the form from submitting normally
        handleSearch(); // Trigger the search logic
    });
} else {
    console.error("Search form element not found!");
}


// --- Run Initialization ---
// Wait for the DOM to be fully loaded before running init
document.addEventListener('DOMContentLoaded', init);
// init(); // If script tag is at the end of body or has 'defer', direct call is usually fine too. DOMContentLoaded is safest.