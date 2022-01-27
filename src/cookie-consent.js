/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cookie-consent-js
 * License: MIT, see file 'LICENSE'
 */

"use strict";
function CookieConsent(props) {

    const self = this
    self.props = {
        buttonPrimaryClass: "btn btn-primary", // the "accept all" buttons class, only used for styling
        buttonSecondaryClass: "btn btn-secondary", // the "accept necessary" buttons class, only used for styling
        privacyPolicyUrl: "privacy-policy.html",
        autoShowModal: true, // disable autoShowModal on the privacy policy page, to make that page readable
        blockAccess: false, // set "true" to block the access to the website before choosing a cookie configuration
        position: "right", // position ("left" or "right"), if blockAccess is false
        postSelectionCallback: undefined, // callback, after the user has made his selection
        lang: navigator.language, // the language, in which the dialog is shown
        defaultLang: "en", // default language, if the `lang` is not available as translation in `content`
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
    for (let property in props) {
        if(property !== "content") {
            // noinspection JSUnfilteredForInLoop
            self.props[property] = props[property]
        }
    }
    for (let contentProperty in props.content) {
        // noinspection JSUnfilteredForInLoop
        self.props.content[contentProperty] = props.content[contentProperty]
    }
    self.lang = self.props.lang
    if (self.lang.indexOf("-") !== -1) {
        self.lang = self.lang.split("-")[0]
    }
    if (self.props.content[self.lang] === undefined) {
        self.lang = self.props.defaultLang
    }
    const _t = self.props.content[self.lang]
    const linkPrivacyPolicy = '<a href="' + self.props.privacyPolicyUrl + '">' + _t.privacyPolicy + '</a>'
    let modalClass = "cookie-consent-modal"
    if (self.props.blockAccess) {
         modalClass += " block-access"
    }
    self.modalContent = '<!-- cookie banner => https://github.com/shaack/cookie-consent-js -->' +
        '<div class="' + modalClass + '">' +
        '<div class="modal-content-wrap ' + self.props.position + '">' +
        '<div class="modal-content">' +
        '<div class="modal-header">--header--</div>' +
        '<div class="modal-body">--body--</div>' +
        '<div class="modal-footer">--footer--</div>' +
        '</div></div><!-- end cookie-consent.js -->'
    self.modalContent = self.modalContent.replace(/--header--/, "<h3 class=\"modal-title\">" + _t.title + "</h3>")
    self.modalContent = self.modalContent.replace(/--body--/,
        _t.body.replace(/--privacy-policy--/, linkPrivacyPolicy)
    )
    self.modalContent = self.modalContent.replace(/--footer--/,
        "<div class='buttons'>" +
        "<button class='btn-accept-necessary " + self.props.buttonSecondaryClass + "'>" + _t.buttonAcceptTechnical + "</button>" +
        "<button class='btn-accept-all " + self.props.buttonPrimaryClass + "'>" + _t.buttonAcceptAll + "</button>" +
        "</div>"
    )

    function setCookie(name, value, days) {
        let expires = ""
        if (days) {
            const date = new Date()
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
            expires = "; expires=" + date.toUTCString()
        }
        document.cookie = name + "=" + (value || "") + expires + "; Path=/; SameSite=Strict;"
    }

    function getCookie(name) {
        const nameEQ = name + "="
        const ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length)
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length)
            }
        }
        return undefined
    }

    function removeCookie(name) {
        document.cookie = name + '=; Path=/; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }

    function documentReady(fn) {
        if (document.readyState !== 'loading') {
            fn()
        } else {
            document.addEventListener('DOMContentLoaded', fn)
        }
    }

    function hideDialog() {
        self.modal.style.display = "none"
    }

    function showDialog() {
        documentReady(function () {
            self.modal = document.getElementById(self.props.modalId)
            if (!self.modal) {
                self.modal = document.createElement("div")
                self.modal.id = self.props.modalId
                self.modal.innerHTML = self.modalContent
                document.body.append(self.modal)
                self.modal.querySelector(".btn-accept-necessary").addEventListener("click", function () {
                    setCookie(self.props.cookieName, "false", 365)
                    hideDialog()
                    if(self.props.postSelectionCallback) {
                        self.props.postSelectionCallback()
                    }
                })
                self.modal.querySelector(".btn-accept-all").addEventListener("click", function () {
                    setCookie(self.props.cookieName, "true", 365)
                    hideDialog()
                    if(self.props.postSelectionCallback) {
                        self.props.postSelectionCallback()
                    }
                })
            } else {
                self.modal.style.display = "block"
            }
        }.bind(this))
    }

    if (getCookie(self.props.cookieName) === undefined && self.props.autoShowModal) {
        showDialog()
    }

    // API
    self.reset = function () {
        removeCookie(self.props.cookieName)
        showDialog()
    }

    self.trackingAllowed = function () {
        return getCookie(self.props.cookieName) === "true"
    }

}
