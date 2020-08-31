/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cookie-consent-js
 * License: MIT, see file 'LICENSE'
 */

;function CookieConsent(props) {
    var self = this
    this.props = {
        cookieName: "cookie-consent-accept-all",
        buttonPrimaryClass: "btn btn-primary",
        buttonSecondaryClass: "btn btn-secondary",
        linkPrivacyPolicy: "privacy-policy.html",
        content: {
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
        modalId: "cookieConsentModal",
        lang: navigator.language
    }
    for (var property in props) {
        // noinspection JSUnfilteredForInLoop
        this.props[property] = props[property]
    }
    if (this.props.content[this.props.lang] !== undefined) {
        this.lang = this.props.lang
    } else {
        this.lang = "en" // fallback
    }
    var _t = this.props.content[this.lang]
    var linkPrivacyPolicy = '<a href="' + this.props.linkPrivacyPolicy + '">' + _t.privacyPolicy + '</a>'
    this.modalContent = '<div class="cookie-consent-modal">' +
        '<div class="modal-content">' +
        '<div class="modal-header">--header--</div>' +
        '<div class="modal-body">--body--</div>' +
        '<div class="modal-footer">--footer--</div>' +
        '</div>'
    this.modalContent = this.modalContent.replace(/--header--/, "<h3>" + _t.title + "</h3>")
    this.modalContent = this.modalContent.replace(/--body--/,
        _t.body.replace(/--privacy-policy--/, linkPrivacyPolicy)
    )
    this.modalContent = this.modalContent.replace(/--footer--/,
        "<div class='buttons'>" +
        "<button class='btn-accept-technical " + this.props.buttonSecondaryClass + "'>" + _t.buttonAcceptTechnical + "</button>" +
        "<button class='btn-accept-all " + this.props.buttonPrimaryClass + "'>" + _t.buttonAcceptAll + "</button>" +
        "</div>"
    )

    function setCookie(name, value, days) {
        var expires = ""
        if (days) {
            var date = new Date()
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
            expires = "; expires=" + date.toUTCString()
        }
        document.cookie = name + "=" + (value || "") + expires + "; Path=/; SameSite=Strict;"
    }

    function getCookie(name) {
        var nameEQ = name + "="
        var ca = document.cookie.split(';')
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i]
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

    function hideDialog() {
        this.modal.style.display = "none"
    }

    function showDialog() {
        this.modal = document.getElementById("cookieConsentModal")
        if (!this.modal) {
            this.modal = document.createElement("div")
            this.modal.id = self.props.modalId
            this.modal.innerHTML = self.modalContent
            document.body.append(this.modal)
            // modal.style.display = "block"
            this.modal.querySelector(".btn-accept-technical").addEventListener("click", function () {
                setCookie(self.props.cookieName, "false", 365)
                hideDialog()
            })
            this.modal.querySelector(".btn-accept-all").addEventListener("click", function () {
                setCookie(self.props.cookieName, "true", 365)
                hideDialog()
            })
        } else {
            this.modal.style.display = "block"
        }
    }

    if (getCookie(self.props.cookieName) === undefined) {
        showDialog()
    }

    // API
    this.reset = function () {
        removeCookie(this.props.cookieName)
        showDialog()
    }

    this.isTrackingCookieAllowed = function () {
        return getCookie(this.props.cookieName) === "true"
    }

}
