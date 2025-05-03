// Handles the toggle switch in the popup
const toggle = document.getElementById('toggleHide');
const toggleLabel = document.getElementById('toggleLabel');

function updateToggleLabel(enabled) {
  toggleLabel.textContent = enabled ? 'Show Twitter Info' : 'Hide Twitter Info';
}

// Load the saved state
chrome.storage.sync.get(['twitterHideInfoEnabled'], (result) => {
  const enabled = result.twitterHideInfoEnabled !== false; // default ON
  // Invert the toggle state - checked means info is shown
  toggle.checked = !enabled;
  updateToggleLabel(enabled);
});

toggle.addEventListener('change', () => {
  // Invert the toggle state - checked means info is shown
  const enabled = !toggle.checked;
  chrome.storage.sync.set({ twitterHideInfoEnabled: enabled });
  updateToggleLabel(enabled);
  
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