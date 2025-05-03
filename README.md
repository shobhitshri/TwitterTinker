# Twitter Info Hider

A Chrome extension that hides bias by focusing on **what is being said, rather than who is saying it**

Details here - https://x.com/shri_shobhit/status/1918660119916839314

## Features

- Hides user names and usernames
- Conceals profile pictures
- Masks engagement metrics (likes, retweets, replies)
- Hides view counts
- Blurs social context information
- All hidden information is revealed on hover
- Toggle functionality to enable/disable the feature
- Option to temporarily reveal all information

## Installation

1. Clone this repository or download the ZIP file
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

Once installed, the extension will automatically start hiding information on Twitter. You can:

- Click the extension icon to toggle the feature on/off
- Use the "Reveal All" option to temporarily show all information
- Hover over any hidden element to reveal it

## What Gets Hidden

- User names and usernames
- Profile pictures
- Like counts
- Retweet counts
- Reply counts
- View counts
- Social context information
- User avatars in various contexts

## Privacy Benefits

This extension helps you:
- Focus on content rather than engagement metrics
- Reduce unconscious bias from profiles
- Make more objective decisions about content
- Maintain privacy while browsing Twitter

## Screenshots

*Coming soon: Before and after screenshots demonstrating the extension's effect*

## Technical Details

The extension works by:
- Injecting custom CSS to blur sensitive information
- Using CSS transitions for smooth reveal effects
- Targeting Twitter's data-testid attributes for reliable element selection
- Persisting user preferences using Chrome's storage API

## Development

### Prerequisites
- Chrome browser
- Basic knowledge of JavaScript and CSS
- Chrome extension development experience (helpful but not required)

### Building from Source
1. Clone the repository
2. Make your changes
3. Test locally by loading the extension in Chrome
4. Submit a pull request

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Follow the existing code style
- Add comments for complex logic
- Keep the code DRY (Don't Repeat Yourself)

## Troubleshooting

Common issues and solutions:
- If elements aren't being hidden, try refreshing the page
- If the extension isn't working, ensure it's enabled in Chrome
- Clear your browser cache if you notice any styling issues

## Roadmap

### Considered Approaches

1. **Customizable Blur Intensity** (Selected)
   - Simple CSS variable-based approach
   - User can adjust blur amount (0-20px)
   - Minimal code changes required
   - Easy to implement and maintain

2. **Keyboard Shortcuts** (Selected)
   - Quick toggle with Alt+H
   - Reveal all with Alt+R
   - Simple event listener implementation
   - No UI changes needed

3. ~~Whitelist/Blacklist System~~
   - Complex state management
   - Requires UI for configuration
   - Higher maintenance overhead
   - More prone to bugs

4. ~~Multiple Social Platforms~~
   - Requires platform-specific selectors
   - Complex maintenance
   - Higher chance of breaking changes
   - Resource intensive

5. ~~Custom Themes~~
   - Complex CSS management
   - Requires UI for theme selection
   - Higher maintenance burden
   - Potential performance impact

### Implementation Priority

1. **Blur Intensity Control**
   ```css
   :root {
     --blur-amount: 12px;
   }
   ```
   - Add simple range input in popup
   - Store preference in chrome.storage
   - Update CSS variable on change
   - Default to current 12px if not set

2. **Keyboard Shortcuts**
   ```javascript
   document.addEventListener('keydown', (e) => {
     if (e.altKey && e.key === 'h') {
       // Toggle hide
     }
     if (e.altKey && e.key === 'r') {
       // Reveal all
     }
   });
   ```
   - Simple event listeners
   - No UI changes required
   - Easy to test and maintain
   - Clear user feedback

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Thanks to all contributors who have helped improve this extension
- Inspired by the need for more objective content consumption on social media 