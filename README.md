# cookie-consent-js

A simple dialog and framework to handle the EU law (as written by EuGH, 1.10.2019 – C-673/17) about cookies in a
website.

## Features

- **Internationalizable** with [language files](https://github.com/shaack/cookie-consent-js/tree/master/cookie-consent-content)
- **No external dependencies** (and it works also with Bootstrap)
- **Responsive**, it works on mobile and desktop devices
- **Style** cookie-consent-js via `css` or `scss` to fit your website
- It is fully **Customizable** with properties

## Internationalizable cookie consent banner

There are already language files for [cz, de, en, es, fr, gr, it, oc and tr](https://github.com/shaack/cookie-consent-js/tree/master/cookie-consent-content). If you add one, please make a pull request to have it added here as well, thanks.

## See it in action

- [Demo pages with usage examples](https://shaack.com/projekte/cookie-consent-js/index.html)

## Usage

Follow these easy steps to integrate the cookie settings in your page.

### 1. Install cookie-consent-js in your project with `npm install cookie-consent-js`

Alternatively you can download the [git repository](https://github.com/shaack/cookie-consent-js).

### 2. Include `cookie-consent.css`

```html
<link rel="stylesheet" href="/node_modules/cookie-consent-js/src/cookie-consent.css"/>
```

This should be done before any bootstrap or other frameworks css. You can overwrite styling in your projects css, take a
look at [cookie-consent.scss](https://github.com/shaack/cookie-consent-js/blob/master/src/cookie-consent.scss).

### 3. Include `cookie-consent.js`

```html

<script src="/node_modules/cookie-consent-js/src/cookie-consent.js"></script>
```

In your websites `<head>` or at the bottom of the `<body>`.

### 4. Initialize the Script

```js
const cookieConsent = new CookieConsent({
    contentUrl: "/node_modules/cookie-consent-js/cookie-consent-content", // location of the language files
    privacyPolicyUrl: "/privacy-policy.html"
})
```

In `props` you should at least define `contentUrl` and `privacyPolicyUrl`. See below "Configuration properties".

### 5. Enable "Cookie settings" in your service navigation

```html
<a href="javascript:cookieConsent.reset()">Cookie settings</a>
```

So the user can anytime reconfigure, if he wants tracking or not.

### 6. Enable or disable tracking depending on configuration

Client side JavaScript: Surround your tracking code with

```js
if (cookieConsent.trackingAllowed()) {
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

...that's all! [Contact me](https://shaack.com), if you have questions.

## API

This framework writes a cookie (it's default name is `cookie-consent-tracking-allowed`)
with the value `"true"`, if the user has accepted tracking. You can read the value with the JavaScript
API (`cookieConsent.trackingAllowed()`) or from any other language, server or client side, which can read cookies.

### JavaScript API

#### Show the settings dialog again

```js
cookieConsent.reset()
```

Use this to allow the user to reconfigure the cookie settings, for example, in your service navigation as "Cookie
settings".

#### Read the status

```js
cookieConsent.trackingAllowed()
```

Returns `true` if the user did accept tracking cookies. Use this function to disable tracking. Surround tracking code,
like the Google Analytics code with

```js
if (cookieConsent.trackingAllowed()) {
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
self.props = {
    buttonPrimaryClass: "btn btn-primary", // the "accept all" buttons class, only used for styling
    buttonSecondaryClass: "btn btn-secondary", // the "accept necessary" buttons class, only used for styling
    autoShowModal: true, // disable autoShowModal on the privacy policy page, to make that page readable
    blockAccess: false, // set "true" to block the access to the website before choosing a cookie configuration
    position: "right", // position ("left" or "right"), if blockAccess is false
    postSelectionCallback: undefined, // callback, after the user has made a selection
    lang: navigator.language, // the language, in which the dialog is shown
    defaultLang: "en", // default language, if the `lang` is not available as translation in `cookie-consent-content`
    content: [], // deprecated, we now have a `content` folder, which contains the language files
    contentUrl: "./cookie-consent-content", // the url of the "cookie-consent-content" folder, which contains the language files
    privacyPolicyUrl: "privacy-policy.html",
    cookieName: "cookie-consent-tracking-allowed",  // the name of the cookie, the cookie is `true` if tracking was accepted
    modalId: "cookieConsentModal" // the id of the modal dialog element
}
```

### Disable autoShow

You can disable `autoShowModal`, for instance, in the privacy policy and legal notice pages to make _these_ pages better
readable.

```js
var cookieConsent = new CookieConsent({
    autoShowModal: false,
    privacyPolicyUrl: "privacy-policy.html",
    contentUrl: "./cookie-consent-content"
})
```

## Styling

See `./src/cookie-consent.scss` and overwrite values as you need in your project's stylesheet.

## Disclaimer

You can use this banner for your website free of charge under the [MIT-License](./LICENSE).

The banner and framework was designed in cooperation with data protection officers and lawyers. However, we can not
guarantee whether the banner is correct for your website and assume no liability for its use.

cookie-consent-js is a project of [shaack.com](https://shaack.com).
