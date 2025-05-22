// /Users/qiansui/Desktop/Freelancer/chrome_extension/js/background.js
// This file contains the background script for the Chrome extension
// It handles events that occur in the background, such as initialization and data management

// Initialize extension data when installed
chrome.runtime.onInstalled.addListener(function() {
  // Set default values
  chrome.storage.local.set({
    selectedTruck: null,
    transportPreferences: {
      origin: "Sydney, NSW",
      destination: "Melbourne, VIC",
      startDate: "May 24, 2025",
      endDate: "May 30, 2025",
      cargoType: "General Freight",
      weight: "18.5",
      volume: "42",
      preferences: {
        shortestRoute: true,
        avoidTolls: false,
        nightDriving: false
      }
    },
    selectedPlan: null
  });
  
  console.log('Loadshift Assistant extension installed successfully');
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getData") {
    // Retrieve data from storage and send it back
    chrome.storage.local.get([request.key], function(result) {
      sendResponse({data: result[request.key]});
    });
    return true; // Required for async sendResponse
  }
});
