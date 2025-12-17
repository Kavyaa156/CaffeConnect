let mockCafes = []

// Screen Management System
function showScreen(screenId) {
    console.log('Switching to:', screenId); // For debugging
    
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the target screen
    document.getElementById(screenId).classList.add('active');
}

// Test function - we'll remove this later
function testScreens() {
    console.log('Testing screen system...');
    showScreen('cafe-list-screen');
}

//fetch the cafe data
function fetchCafe() {
fetch('http://localhost:3000/api/cafes')
    .then(response => response.json())
    .then(cafes => {
        mockCafes = cafes
        displayCafes(cafes)})
    .catch(err => console.error('Error fetching cafes:', err))
}

// Function to display cafes
function displayCafes(cafes) {
    const cafeListScreen = document.getElementById('cafe-list-screen');
    
    if(!cafes || cafes.length === 0){
        cafeListScreen.innerHTML =`<p>No cafes found</p>`;
        return;
    }

    // Create the HTML for cafe list
    let cafeHTML = `
        <h2>☕ Nearby Cafes</h2>
        <button onclick="showScreen('Home-screen')" style="margin-bottom: 20px;">← Back to Home</button>
        <div class="cafe-container">
    `;
    
    // Loop through each cafe and create a card
    cafes.forEach(cafe => {
        cafeHTML += `
            <div class="cafe-card" onclick="showCafeDetails('${cafe._id}')">
                <img src="${cafe.image}" alt="${cafe.name}" class="cafe-image">
                <div class="cafe-info">
                    <h3>${cafe.name}</h3>
                    <p class="location">📍 ${cafe.location}</p>
                    <div class="cafe-details">
                        <span class="rating">⭐ ${cafe.rating}</span>
                    </div>
                    <p class="description">${cafe.description}</p>
                </div>
            </div>
        `;
    });
    
    cafeHTML += `</div>`;
    
    // Put the HTML into the screen
    cafeListScreen.innerHTML = cafeHTML;
}

// Function to show specific cafe details
function showCafeDetails(cafeId) {
    const cafe = mockCafes.find(c => c._id === cafeId);
    const cafeDetailScreen = document.getElementById('cafe-detail-screen');
    
    cafeDetailScreen.innerHTML = `
        <button onclick="showScreen('cafe-list-screen')">← Back to List</button>
        <div class="cafe-detail">
            <img src="${cafe.image}" alt="${cafe.name}" class="detail-image">
            <h2>${cafe.name}</h2>
            <p class="location">📍 ${cafe.location}</p>
            <p class="rating">⭐ Rating: ${cafe.rating}/5</p>
            <div class="action-buttons">
                <button onclick="showBookingModal('${cafe._id}')">📅 Book Table</button>
                <button onclick="showDeliveryModal('${cafe._id}')">🚚 Order Delivery</button>
            </div>
        </div>
    `;
    
    showScreen('cafe-detail-screen');
}

//lOCATION DETECTION

let userLocation = null;

function getCurrentLocation() {
    const locationBtn = document.querySelector('.location-btn');
    const statusDiv = document.querySelector('.location-status');
    
    // Create status div if it doesn't exist
    if (!statusDiv) {
        const status = document.createElement('div');
        status.className = 'location-status';
        locationBtn.parentNode.appendChild(status);
    }
    
    const status = document.querySelector('.location-status');
    status.style.display = 'block';
    status.innerHTML = '📍 Getting your location...';
    status.className = 'location-status loading';
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // Success callback
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                status.className = 'location-status success';
                status.innerHTML = '✅ Location found! Finding nearby cafes...';
                
                // Show cafes after a short delay
                setTimeout(() => {
                    fetchCafe();
                    showScreen('cafe-list-screen');
                }, 1500);
            },
            // Error callback
            (error) => {
                status.className = 'location-status error';
                
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        status.innerHTML = '❌ Location access denied. Showing default cafes.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        status.innerHTML = '❌ Location unavailable. Showing default cafes.';
                        break;
                    case error.TIMEOUT:
                        status.innerHTML = '❌ Location timeout. Showing default cafes.';
                        break;
                }
                
                // Show default cafes anyway
                setTimeout(() => {
                    fetchCafe();
                    showScreen('cafe-list-screen');
                }, 2000);
            },
            // Options
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    } else {
        status.className = 'location-status error';
        status.innerHTML = '❌ Geolocation not supported. Showing default cafes.';
        
        setTimeout(() => {
            fetchCafe();
            showScreen('cafe-list-screen');
        }, 2000);
    }
}