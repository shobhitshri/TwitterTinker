// CSS to hide info and reveal on hover
const STYLE_ID = 'twitter-hide-info-style';
const HIDE_CLASS = 'twitter-hide-info-active';

const css = `
/* Hide name, username, profile pic, and engagement counts by default */
body.${HIDE_CLASS} [data-testid="User-Name"],
body.${HIDE_CLASS} [data-testid="User-Avatar-Container"],
body.${HIDE_CLASS} [data-testid="User-Avatar-Container"] img,
body.${HIDE_CLASS} [data-testid="UserAvatar-Container"],
body.${HIDE_CLASS} [data-testid="UserAvatar-Container"] img,
body.${HIDE_CLASS} [data-testid="user-avatar"],
body.${HIDE_CLASS} [data-testid="user-avatar"] img,
body.${HIDE_CLASS} [data-testid="Tweet-User-Avatar"],
body.${HIDE_CLASS} [data-testid="app-bar-user-avatar"],
body.${HIDE_CLASS} [data-testid="app-bar-user-avatar"] img,
body.${HIDE_CLASS} [data-testid="UserCell"],
body.${HIDE_CLASS} [data-testid="socialContext"],
body.${HIDE_CLASS} [data-testid="user-link"],
body.${HIDE_CLASS} [data-testid="viewCount"],
body.${HIDE_CLASS} [aria-label*="View"],
body.${HIDE_CLASS} [href*="/status/"] [role="link"] > div > div > span,
body.${HIDE_CLASS} [href*="/status/"] [role="link"] > div > div > div > span,
/* Hide only the like, retweet, and reply counts, not the buttons */
body.${HIDE_CLASS} [data-testid="like"] span,
body.${HIDE_CLASS} [data-testid="retweet"] span,
body.${HIDE_CLASS} [data-testid="reply"] span {
  filter: blur(12px);
  transition: filter 0.1s;
  pointer-events: auto;
}

/* Reveal on hover */
body.${HIDE_CLASS} [data-testid="User-Name"]:hover,
body.${HIDE_CLASS} [data-testid="User-Avatar-Container"]:hover,
body.${HIDE_CLASS} [data-testid="User-Avatar-Container"]:hover img,
body.${HIDE_CLASS} [data-testid="UserAvatar-Container"]:hover,
body.${HIDE_CLASS} [data-testid="UserAvatar-Container"]:hover img,
body.${HIDE_CLASS} [data-testid="user-avatar"]:hover,
body.${HIDE_CLASS} [data-testid="user-avatar"]:hover img,
body.${HIDE_CLASS} [data-testid="Tweet-User-Avatar"]:hover,
body.${HIDE_CLASS} [data-testid="app-bar-user-avatar"]:hover,
body.${HIDE_CLASS} [data-testid="app-bar-user-avatar"]:hover img,
body.${HIDE_CLASS} [data-testid="UserCell"]:hover,
body.${HIDE_CLASS} [data-testid="socialContext"]:hover,
body.${HIDE_CLASS} [data-testid="user-link"]:hover,
body.${HIDE_CLASS} [data-testid="viewCount"]:hover,
body.${HIDE_CLASS} [aria-label*="View"]:hover,
body.${HIDE_CLASS} [href*="/status/"] [role="link"] > div > div > span:hover,
body.${HIDE_CLASS} [href*="/status/"] [role="link"] > div > div > div > span:hover,
body.${HIDE_CLASS} [data-testid="like"]:hover span,
body.${HIDE_CLASS} [data-testid="retweet"]:hover span,
body.${HIDE_CLASS} [data-testid="reply"]:hover span {
  filter: none !important;
}
`;

function injectStyle() {
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }
}

function removeStyle() {
  const style = document.getElementById(STYLE_ID);
  if (style) style.remove();
}

function setHideActive(active) {
  if (active) {
    injectStyle();
    document.body.classList.add(HIDE_CLASS);
  } else {
    document.body.classList.remove(HIDE_CLASS);
    removeStyle();
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'TWITTER_HIDE_INFO_TOGGLE') {
    setHideActive(msg.enabled);
  }
  if (msg.type === 'REVEAL_ALL_TWITTER_INFO') {
    setHideActive(false); // Remove all hiding, reveal everything
  }
});

// On load, check storage and set state
chrome.storage.sync.get(['twitterHideInfoEnabled'], (result) => {
  const enabled = result.twitterHideInfoEnabled !== false; // default ON
  setHideActive(enabled);
}); 