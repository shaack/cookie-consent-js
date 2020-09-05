# cookie-consent-js
A simple dialog and framework to handle the German and EU law (may 2020) about cookies in a website

- [Demo page](https://shaack.com/projekte/cookie-consent-js/index.html)
- [npm package](https://www.npmjs.com/package/cookie-consent-js)

## Usage

### Include the js and css
```html
<link rel="stylesheet" href="./src/cookie-consent.css"/>
<script src="./src/cookie-consent.js"></script>
```

### Initialize the script
```js
var cookieConsent = new CookieConsent(props)
```

In `props` you should at least define `privacyPolicyUrl`. 
See below "Configuration properties". 

## JavaScript API

### Reset cookie settings
```js
cookieConsent.reset()
```
Use this to allow the user to reconfigure the cookie settings. Use it for example in your service navigation as "cookie settings".

### Read the status
```js
cookieConsent.isTrackingCookieAllowed()
```
Use this function to disable tracking. 
Suround for example the Analytics code with
```js
if(cookieConsent.isTrackingCookieAllowed()) {
    // Google Analytics code and other tracking code
}
``` 


### Configuration properties
With default values.

```js
this.props = {
    buttonPrimaryClass: "btn btn-primary",
    buttonSecondaryClass: "btn btn-secondary",
    privacyPolicyUrl: "privacy-policy.html",
    autoShowModal: true, // disable autoShowModal on the privacy policy page, to make this page readable
    lang: navigator.language, // the language, in which the modal is shown
    content: { // the content in all needed languages
        de: {
            title: "Cookie-Einstellungen",
            body: "Wir nutzen Cookies, um Inhalte zu personalisieren und die Zugriffe auf unsere Website zu analysieren. " +
                "Sie können wählen, ob Sie nur für die Funktion der Website notwendige Cookies akzeptieren oder auch " +
                "Tracking-Cookies zulassen möchten. Weitere Informationen finden Sie in unserer --privacy-policy--.",
            privacyPolicy: "Datenschutzerklärung",
            buttonAcceptAll: "Alle Cookies akzeptieren",
            buttonAcceptTechnical: "Nur technisch notwendige Cookies akzeptieren"
        },
        en: {
            title: "Cookie settings",
            body: "We use cookies to personalize content and analyze access to our website. " +
                "You can choose whether you only accept cookies that are necessary for the functioning of the website " +
                "or whether you also want to allow tracking cookies. For more information, please refer to our --privacy-policy--.",
            privacyPolicy: "privacy policy",
            buttonAcceptAll: "Accept all cookies",
            buttonAcceptTechnical: "Only accept technically necessary cookies"
        }
    },
    modalId: "cookieConsentModal", // this may not be changed
    cookieName: "cookie-consent-accept-all"  // this may not be changed
}
```

#### Disable autoShow
You should disable `autoShowModal` in the privacy policy page to make this page readable. 
```js
var cookieConsent = new CookieConsent({linkPrivacyPolicy: "privacy-policy.html", autoShowModal: false})
```

## Styling
See `./src/cookie-consent.scss` and overwrite values as you need in your projects stylesheet. 

