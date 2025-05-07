// options.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('optionsForm');
  const status = document.getElementById('status');
  const blurAmount = document.getElementById('blurAmount');
  const blurValue = document.getElementById('blurValue');

  // Load saved options
  chrome.storage.sync.get({
    // Default values
    hideNames: true,
    hideUsernames: true,
    hideProfilePics: true,
    hideEngagement: true,
    hideViewCount: true,
    hideSocialContext: true,
    hideVideos: true,
    blurAmount: 12,
    enableShortcuts: true
  }, (result) => {
    // Set checkbox states
    document.getElementById('hideNames').checked = result.hideNames;
    document.getElementById('hideUsernames').checked = result.hideUsernames;
    document.getElementById('hideProfilePics').checked = result.hideProfilePics;
    document.getElementById('hideEngagement').checked = result.hideEngagement;
    document.getElementById('hideViewCount').checked = result.hideViewCount;
    document.getElementById('hideSocialContext').checked = result.hideSocialContext;
    document.getElementById('hideVideos').checked = result.hideVideos;
    document.getElementById('enableShortcuts').checked = result.enableShortcuts;

    // Set blur amount
    blurAmount.value = result.blurAmount;
    blurValue.textContent = `${result.blurAmount}px`;
  });

  // Update blur value display
  blurAmount.addEventListener('input', (e) => {
    blurValue.textContent = `${e.target.value}px`;
  });

  // Save options
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const options = {
      hideNames: document.getElementById('hideNames').checked,
      hideUsernames: document.getElementById('hideUsernames').checked,
      hideProfilePics: document.getElementById('hideProfilePics').checked,
      hideEngagement: document.getElementById('hideEngagement').checked,
      hideViewCount: document.getElementById('hideViewCount').checked,
      hideSocialContext: document.getElementById('hideSocialContext').checked,
      hideVideos: document.getElementById('hideVideos').checked,
      blurAmount: parseInt(blurAmount.value),
      enableShortcuts: document.getElementById('enableShortcuts').checked
    };

    chrome.storage.sync.set(options, () => {
      status.textContent = 'Settings saved!';
      setTimeout(() => status.textContent = '', 1500);
    });
  });
}); 