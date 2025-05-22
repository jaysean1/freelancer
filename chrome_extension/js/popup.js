// /Users/qiansui/Desktop/Freelancer/chrome_extension/js/popup.js
// This file contains the JavaScript functionality for the popup interface
// This handles user interactions with the truck selection and transport preferences

document.addEventListener('DOMContentLoaded', function() {
    // Truck selection functionality
    const truckCards = document.querySelectorAll('.truck-card');
    
    truckCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            truckCards.forEach(c => {
                c.classList.remove('border-blue-200');
                c.classList.remove('selected-truck');
                const truckIcon = c.querySelector('svg');
                if (truckIcon) {
                    truckIcon.classList.remove('text-blue-600');
                    truckIcon.classList.add('text-gray-400');
                }
                
                // Remove selected text if it exists
                const selectedText = c.querySelector('.text-blue-600.font-medium');
                if (selectedText) {
                    selectedText.parentNode.innerHTML = '';
                }
            });
            
            // Add selected class to clicked card
            this.classList.add('border-blue-200');
            this.classList.add('selected-truck');
            const truckIcon = this.querySelector('svg');
            if (truckIcon) {
                truckIcon.classList.remove('text-gray-400');
                truckIcon.classList.add('text-blue-600');
            }
            
            // Add selected text
            const iconContainer = this.querySelector('div:last-child');
            if (!iconContainer.querySelector('.text-blue-600.font-medium')) {
                const selectedSpan = document.createElement('span');
                selectedSpan.className = 'text-xs text-blue-600 font-medium';
                selectedSpan.textContent = 'Selected';
                iconContainer.appendChild(selectedSpan);
            }
            
            // Save selected truck to chrome.storage
            const truckName = this.querySelector('h3').textContent;
            chrome.storage.local.set({selectedTruck: truckName});
        });
    });
    
    // Find Perfect Match button functionality
    const findMatchButton = document.querySelector('a[href="analysis.html"]');
    
    findMatchButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Collect form data
        const origin = document.querySelector('input[placeholder="From"]').value;
        const destination = document.querySelector('input[placeholder="To"]').value;
        const startDate = document.querySelector('input[placeholder="Start Date"]').value;
        const endDate = document.querySelector('input[placeholder="End Date"]').value;
        const cargoType = document.querySelector('select').value;
        const weight = document.querySelector('input[placeholder="Weight"]').value;
        const volume = document.querySelector('input[placeholder="Volume"]').value;
        
        // Additional preferences
        const shortestRoute = document.getElementById('shortest').checked;
        const avoidTolls = document.getElementById('avoid-tolls').checked;
        const nightDriving = document.getElementById('night').checked;
        
        // Save preferences to chrome.storage
        chrome.storage.local.set({
            transportPreferences: {
                origin,
                destination,
                startDate,
                endDate,
                cargoType,
                weight,
                volume,
                preferences: {
                    shortestRoute,
                    avoidTolls,
                    nightDriving
                }
            }
        }, function() {
            // Navigate to analysis page
            window.location.href = 'analysis.html';
        });
    });
    
    // Load saved data if it exists
    chrome.storage.local.get(['selectedTruck', 'transportPreferences'], function(result) {
        if (result.selectedTruck) {
            // Find the truck card with the matching name and select it
            truckCards.forEach(card => {
                const truckName = card.querySelector('h3').textContent;
                if (truckName === result.selectedTruck) {
                    card.click();
                }
            });
        }
        
        if (result.transportPreferences) {
            const prefs = result.transportPreferences;
            
            // Fill in form fields
            if (prefs.origin) document.querySelector('input[placeholder="From"]').value = prefs.origin;
            if (prefs.destination) document.querySelector('input[placeholder="To"]').value = prefs.destination;
            if (prefs.startDate) document.querySelector('input[placeholder="Start Date"]').value = prefs.startDate;
            if (prefs.endDate) document.querySelector('input[placeholder="End Date"]').value = prefs.endDate;
            if (prefs.cargoType) {
                const select = document.querySelector('select');
                for (let i = 0; i < select.options.length; i++) {
                    if (select.options[i].text === prefs.cargoType) {
                        select.selectedIndex = i;
                        break;
                    }
                }
            }
            if (prefs.weight) document.querySelector('input[placeholder="Weight"]').value = prefs.weight;
            if (prefs.volume) document.querySelector('input[placeholder="Volume"]').value = prefs.volume;
            
            // Set checkboxes
            if (prefs.preferences) {
                document.getElementById('shortest').checked = prefs.preferences.shortestRoute;
                document.getElementById('avoid-tolls').checked = prefs.preferences.avoidTolls;
                document.getElementById('night').checked = prefs.preferences.nightDriving;
            }
        }
    });
});
