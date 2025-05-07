// CSS to hide info and reveal on hover
const STYLE_ID = 'twitter-hide-info-style';
const HIDE_CLASS = 'twitter-hide-info-active';

function generateCSS(options) {
  const blurAmount = options.blurAmount || 12;
  
  let selectors = [];
  
  if (options.hideNames) {
    selectors.push(`body.${HIDE_CLASS} [data-testid="User-Name"]`);
  }
  if (options.hideUsernames) {
    selectors.push(`body.${HIDE_CLASS} [data-testid="user-link"]`);
  }
  if (options.hideProfilePics) {
    selectors.push(
      `body.${HIDE_CLASS} [data-testid="User-Avatar-Container"]`,
      `body.${HIDE_CLASS} [data-testid="User-Avatar-Container"] img`,
      `body.${HIDE_CLASS} [data-testid="UserAvatar-Container"]`,
      `body.${HIDE_CLASS} [data-testid="UserAvatar-Container"] img`,
      `body.${HIDE_CLASS} [data-testid="user-avatar"]`,
      `body.${HIDE_CLASS} [data-testid="user-avatar"] img`,
      `body.${HIDE_CLASS} [data-testid="Tweet-User-Avatar"]`,
      `body.${HIDE_CLASS} [data-testid="app-bar-user-avatar"]`,
      `body.${HIDE_CLASS} [data-testid="app-bar-user-avatar"] img`
    );
  }
  if (options.hideEngagement) {
    selectors.push(
      `body.${HIDE_CLASS} [data-testid="like"] span`,
      `body.${HIDE_CLASS} [data-testid="retweet"] span`,
      `body.${HIDE_CLASS} [data-testid="reply"] span`
    );
  }
  if (options.hideViewCount) {
    selectors.push(
      `body.${HIDE_CLASS} [data-testid="viewCount"]`,
      `body.${HIDE_CLASS} [aria-label*="View"]`
    );
  }
  if (options.hideSocialContext) {
    selectors.push(
      `body.${HIDE_CLASS} [data-testid="socialContext"]`,
      `body.${HIDE_CLASS} [data-testid="UserCell"]`
    );
  }
  if (options.hideVideos) {
    selectors.push(
      `body.${HIDE_CLASS} [data-testid="videoPlayer"]`,
      `body.${HIDE_CLASS} [data-testid="videoPlayer"] video`,
      `body.${HIDE_CLASS} [data-testid="videoPlayer"] div[style*="background-image"]`,
      `body.${HIDE_CLASS} [data-testid="videoPlayer"] div[style*="background"]`
    );
  }

  const baseCSS = `
    ${selectors.join(',\n')} {
      filter: blur(${blurAmount}px);
      transition: filter 0.1s;
      pointer-events: auto;
    }

    ${selectors.map(selector => `${selector}:hover`).join(',\n')} {
      filter: none !important;
      pointer-events: auto !important;
    }

    body.${HIDE_CLASS} [data-testid="videoPlayer"] {
      cursor: pointer;
    }

    body.${HIDE_CLASS} [data-testid="videoPlayer"]:hover {
      filter: none !important;
      pointer-events: auto !important;
    }

    body.${HIDE_CLASS} [data-testid="videoPlayer"]:hover video,
    body.${HIDE_CLASS} [data-testid="videoPlayer"]:hover div[style*="background-image"],
    body.${HIDE_CLASS} [data-testid="videoPlayer"]:hover div[style*="background"] {
      filter: none !important;
      pointer-events: auto !important;
    }
  `;

  return baseCSS;
}

function injectStyle(options) {
  removeStyle();
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = generateCSS(options);
  document.head.appendChild(style);
}

function removeStyle() {
  const style = document.getElementById(STYLE_ID);
  if (style) style.remove();
}

function setHideActive(active, options) {
  if (active) {
    injectStyle(options);
    document.body.classList.add(HIDE_CLASS);
  } else {
    document.body.classList.remove(HIDE_CLASS);
    removeStyle();
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'TWITTER_HIDE_INFO_TOGGLE') {
    chrome.storage.sync.get({
      hideNames: true,
      hideUsernames: true,
      hideProfilePics: true,
      hideEngagement: true,
      hideViewCount: true,
      hideSocialContext: true,
      hideVideos: true,
      blurAmount: 12
    }, (options) => {
      setHideActive(msg.enabled, options);
    });
  }
  if (msg.type === 'REVEAL_ALL_TWITTER_INFO') {
    setHideActive(false);
  }
});

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey) {
    chrome.storage.sync.get(['enableShortcuts'], (result) => {
      if (result.enableShortcuts) {
        const key = e.key.toLowerCase();
        if (key === 'h') {
          chrome.runtime.sendMessage({ type: 'TWITTER_HIDE_INFO_TOGGLE' });
        } else if (key === 'r') {
          chrome.runtime.sendMessage({ type: 'REVEAL_ALL_TWITTER_INFO' });
        }
      }
    });
  }
});

// On load, check storage and set state
chrome.storage.sync.get({
  twitterHideInfoEnabled: true,
  hideNames: true,
  hideUsernames: true,
  hideProfilePics: true,
  hideEngagement: true,
  hideViewCount: true,
  hideSocialContext: true,
  hideVideos: true,
  blurAmount: 12
}, (result) => {
  const enabled = result.twitterHideInfoEnabled;
  const options = {
    hideNames: result.hideNames,
    hideUsernames: result.hideUsernames,
    hideProfilePics: result.hideProfilePics,
    hideEngagement: result.hideEngagement,
    hideViewCount: result.hideViewCount,
    hideSocialContext: result.hideSocialContext,
    hideVideos: result.hideVideos,
    blurAmount: result.blurAmount
  };
  setHideActive(enabled, options);
});