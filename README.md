# cookie-consent-js
A simple dialog and framework to handle the German and EU law (may 2020) about cookies in a website

[Demo Page](https://shaack.com/projekte/cookie-consent-js/index.html)

## Usage
```js
var cookieConsent = new CookieConsent({linkPrivacyPolicy: "privacy-policy.html"})
```

## JavaScript API

### Reset cookie settings
```js
cookieConsent.reset()
```

### Read status
```js
cookieConsent.isTrackingCookieAllowed()
```

