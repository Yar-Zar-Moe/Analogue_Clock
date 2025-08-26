// Function to set up the clock numbers and markers
function setupClockFace() {
    const clockFace = document.querySelector('.clock-face');
    
    
    
    // Create minute markers
    for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) { // Skip positions where hour numbers are
            const marker = document.createElement('div');
            marker.className = 'minute-marker';
            
            const angle = (i * 6) - 90; // 6 degrees per minute
            const angleRad = angle * Math.PI / 180;
            
            // Position the marker (92% from center for minute markers)
            const radius = 92;
            const x = 50 + radius * Math.cos(angleRad);
            const y = 50 + radius * Math.sin(angleRad);
            
            marker.style.left = x + '%';
            marker.style.top = y + '%';
            marker.style.width = '2px';
            marker.style.height = '6px';
            marker.style.backgroundColor = '#bdc3c7';
            marker.style.position = 'absolute';
            marker.style.transformOrigin = 'center bottom';
            marker.style.transform = `rotate(${angle}deg)`;
            
            clockFace.appendChild(marker);
        }
    }
}

// Function to update the clock hands
function setClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12; // Convert to 12-hour format
    
    // Calculate degrees for each hand
    const secondDegrees = ((seconds / 60) * 360) + 90;
    const minuteDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
    const hourDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
    
    // Get hand elements
    const secondHand = document.querySelector('.second-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const hourHand = document.querySelector('.hour-hand');
    
    // Update hand rotations
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    
    // Update digital clock
    updateDigitalClock(now);
}

// Function to update digital clock display
function updateDigitalClock(time) {
    const digitalClock = document.getElementById('digitalClock');
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    
    digitalClock.textContent = `${hours}:${minutes}:${seconds}`;
}

// Initialize the clock
function initClock() {
    setupClockFace();
    setClock(); // Set initial time
    setInterval(setClock, 1000); // Update every second
}

// Start the clock when the page loads
document.addEventListener('DOMContentLoaded', initClock);

// Add smooth transition for clock hands
function addSmoothTransition() {
    const hands = document.querySelectorAll('.hand');
    hands.forEach(hand => {
        hand.style.transition = 'all 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)';
    });
}

// Call smooth transition setup
addSmoothTransition();
