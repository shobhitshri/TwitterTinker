// Handles the toggle switch in the popup
const toggle = document.getElementById('toggleHide');

// Load the saved state
chrome.storage.sync.get(['twitterHideInfoEnabled'], (result) => {
  toggle.checked = result.twitterHideInfoEnabled !== false; // default ON
});

toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.sync.set({ twitterHideInfoEnabled: enabled });
  // Notify content script in the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'TWITTER_HIDE_INFO_TOGGLE', enabled });
    }
  });
});

// Add event listener for the Reveal All button
const revealAllBtn = document.getElementById('revealAllBtn');
if (revealAllBtn) {
  revealAllBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'REVEAL_ALL_TWITTER_INFO' });
      }
    });
  });
} 