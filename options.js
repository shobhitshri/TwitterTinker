// options.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('optionsForm');
  const status = document.getElementById('status');

  // Load saved options
  chrome.storage.sync.get(
    ['hideNames', 'hideUsernames', 'hideProfilePics', 'hideEngagement'],
    (result) => {
      document.getElementById('hideNames').checked = result.hideNames !== false;
      document.getElementById('hideUsernames').checked = result.hideUsernames !== false;
      document.getElementById('hideProfilePics').checked = result.hideProfilePics !== false;
      document.getElementById('hideEngagement').checked = result.hideEngagement !== false;
    }
  );

  // Save options
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    chrome.storage.sync.set({
      hideNames: document.getElementById('hideNames').checked,
      hideUsernames: document.getElementById('hideUsernames').checked,
      hideProfilePics: document.getElementById('hideProfilePics').checked,
      hideEngagement: document.getElementById('hideEngagement').checked,
    }, () => {
      status.textContent = 'Options saved!';
      setTimeout(() => status.textContent = '', 1500);
    });
  });
}); 