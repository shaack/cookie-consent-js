# cookie-consent-js

A simple dialog and framework to handle the German and EU law (as written by EuGH, 1.10.2019 – C-673/17) about cookies in a website

- [Demo pages in plain HTML or with Bootstrap 4](https://shaack.com/projekte/cookie-consent-js/index.html)
- [npm package](https://www.npmjs.com/package/cookie-consent-js)

## Usage

Follow these easy steps to integrate the cookie settings in your page.

### 1. Install cookie-consent-js in your project with `npm install cookie-consent-js` 

Alternatively you can download the [git repository](https://github.com/shaack/cookie-consent-js).

### 2. Include `cookie-consent.css`

```html
<link rel="stylesheet" href="/node_modules/cookie-consent-js/src/cookie-consent.css"/>
```
This should be done before any bootstrap or other frameworks css. You can
overwrite styling in your projects css, take a look at [cookie-consent.scss](https://github.com/shaack/cookie-consent-js/blob/master/src/cookie-consent.scss).

### 3. Include `cookie-consent.js`

```html
<script src="/node_modules/cookie-consent-js/src/cookie-consent.js"></script>
```
In your `<head>` or at the bottom of your `<body>`.

### 4. Initialize the Script

```js
var cookieConsent = new CookieConsent({privacyPolicyUrl: "/privacy-policy.html"})
```
In `props` you should at least define `privacyPolicyUrl`. 
See below "Configuration properties". 

### 5. Enable "Cookie settings" in your service navigation

```html
<a href="javascript:cookieConsent.reset()">Cookie settings</a>
```
So the user can anytime reconfigure, if he wants tracking or not.
 
...done! [Contact me](https://shaack.com), if you have questions.
 
### 6. Enable or disable tracking depending on configuration

Client side JavaScript: Surround your tracking code with

```js
if(cookieConsent.trackingAllowed()) {
    // Google Analytics code and/or other tracking code
}
``` 

Server side PHP: Surround your tracking code with
```php
if($_COOKIE['cookie-consent-tracking-allowed'] === 'true') {
    // do some tracking
}
```

All other languages: Just read, if the cookie `cookie-consent-tracking-allowed` is "true"

## API

This framework writes a cookie (it's default name is `cookie-consent-tracking-allowed`)
with the value `"true"`, if the user has accepted tracking. You can read the value with the JavaScript 
API (`cookieConsent.trackingAllowed()`) or from any other language, server or client side, which can read cookies.  

### JavaScript API

#### Show the settings dialog again

```js
cookieConsent.reset()
```
Use this to allow the user to reconfigure the cookie settings, for example, in your 
service navigation as "Cookie settings".

#### Read the status

```js
cookieConsent.trackingAllowed()
```
Returns `true` if the user did accept tracking cookies. 
Use this function to disable tracking. Surround tracking code, like the Google Analytics code with
```js
if(cookieConsent.trackingAllowed()) {
    // Google Analytics code and/or other tracking code
}
``` 

### Read the status from PHP

Read the cookie from a PHP server with
```php
if($_COOKIE['cookie-consent-tracking-allowed'] === 'true') {
    // do some tracking
}
```

## Configuration properties

With default values.

```js
this.props = {
    buttonPrimaryClass: "btn btn-primary", // the "accept all" buttons class, only used for styling
    buttonSecondaryClass: "btn btn-secondary", // the "accept necessary" buttons class, only used for styling
    privacyPolicyUrl: "privacy-policy.html",
    autoShowModal: true, // disable autoShowModal on the privacy policy page, to make that page readable
    lang: navigator.language, // the language, in which the modal is shown
    blockAccess: false, // set "true" to block the access to the website _before_ choosing a cookie configuration
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
    cookieName: "cookie-consent-tracking-allowed",  // the name of the cookie, the cookie is `true` if tracking was accepted
    modalId: "cookieConsentModal" // the id of the modal dialog element
}
```

### Disable autoShow

You can disable `autoShowModal`, for instance, in the privacy policy and legal notice pages to make _these_ pages (better) readable.
 
```js
var cookieConsent = new CookieConsent({linkPrivacyPolicy: "privacy-policy.html", autoShowModal: false})
```

## Styling

See `./src/cookie-consent.scss` and overwrite values as you need in your projects stylesheet.

## Disclaimer

cookie-consent-js is a project of [shaack.com](https://shaack.com). 
If you use anything from this project, do so under the [MIT-License](./LICENSE). 

