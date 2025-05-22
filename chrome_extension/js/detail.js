// /Users/qiansui/Desktop/Freelancer/chrome_extension/js/detail.js
// This file contains the JavaScript functionality for the detail page
// It handles the display of detailed transport plan information

document.addEventListener('DOMContentLoaded', function() {
    // Get the selected plan from chrome.storage
    chrome.storage.local.get(['selectedPlan'], function(result) {
        if (result.selectedPlan) {
            // Update the plan title in the header
            const planTitle = document.querySelector('h2.text-lg.font-semibold.text-blue-800');
            if (planTitle && result.selectedPlan) {
                planTitle.textContent = result.selectedPlan;
            }
        }
    });
    
    // Handle the "Place Bid" button click
    const placeBidButton = document.querySelector('a.bg-green-600');
    if (placeBidButton) {
        placeBidButton.addEventListener('click', function(e) {
            // For demonstration purposes, we're not preventing the default behavior
            // In a real extension, you might want to track this click or perform additional actions
            console.log('Place Bid button clicked');
            
            // You could also open this in a new tab programmatically:
            // e.preventDefault();
            // chrome.tabs.create({ url: this.href });
        });
    }
    
    // Make the back button work
    const backButton = document.querySelector('a[href="analysis.html"]');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'analysis.html';
        });
    }
});
