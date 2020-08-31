function CookieConsent(props) {
    var self = this
    this.props = {
        cookieName: "cookie-consent-accept-all",
        buttonPrimaryClass: "btn btn-primary",
        buttonSecondaryClass: "btn btn-secondary",
        content: {
            de: {
                title: "Cookie-Einstellungen",
                body: "Wir nutzen Cookies, um Inhalte zu personalisieren und die Zugriffe auf unsere Website zu analysieren. " +
                    "Sie können wählen, ob Sie nur für die Funktion der Website notwendige Cookies akzeptieren oder auch " +
                    "Tracking-Cookies zulassen möchten. Weitere Informationen finden Sie in unserer --privacy-policy--.",
                privacyPolicy: "Datenschutzerklärung",
                linkPrivacyPolicy: "/de/site/datenschutzerklaerung.html",
                buttonAcceptAll: "Alle Cookies akzeptieren",
                buttonAcceptTechnical: "Nur technisch notwendige Cookies akzeptieren"
            }
        },
        modalId: "cookieConsentModal"
    }
    for (var property in props) {
        // noinspection JSUnfilteredForInLoop
        this.props[property] = props[property]
    }
    var linkPrivacyPolicy = '<a href="' + this.props.content.de.linkPrivacyPolicy + '">' + this.props.content.de.privacyPolicy + '</a>'
    this.modalContent = '<div class="cookie-consent-modal">' +
        '<div class="modal-content">' +
        '<div class="modal-header">--header--</div>' +
        '<div class="modal-body">--body--</div>' +
        '<div class="modal-footer">--footer--</div>' +
        '</div>'
    this.modalContent = this.modalContent.replace(/--header--/, "<h3>" +
        this.props.content.de.title +
        "</h3>")
    this.modalContent = this.modalContent.replace(/--body--/,
        this.props.content.de.body.replace(/--privacy-policy--/, linkPrivacyPolicy)
    )
    this.modalContent = this.modalContent.replace(/--footer--/,
        "<div class='buttons'>" +
        "<button class='btn-accept-technical " + this.props.buttonSecondaryClass + "'>" + this.props.content.de.buttonAcceptTechnical + "</button>" +
        "<button class='btn-accept-all " + this.props.buttonPrimaryClass + "'>" + this.props.content.de.buttonAcceptAll + "</button>" +
        "</div>"
    )
    this.setCookie = function (name, value, days) {
        var expires = ""
        if (days) {
            var date = new Date()
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
            expires = "; expires=" + date.toUTCString()
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/"
    }
    this.getCookie = function (name) {
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
    this.removeCookie = function (name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }
    this.hideDialog = function () {
        this.modal.style.display = "none"
    }
    this.showDialog = function () {
        this.modal = document.getElementById("cookieConsentModal")
        if (!this.modal) {
            this.modal = document.createElement("div")
            this.modal.id = self.props.modalId
            this.modal.innerHTML = self.modalContent
            document.body.append(this.modal)
            // modal.style.display = "block"
            this.modal.querySelector(".btn-accept-technical").addEventListener("click", function () {
                self.setCookie(self.props.cookieName, "false", 365)
                self.hideDialog()
            })
            this.modal.querySelector(".btn-accept-all").addEventListener("click", function () {
                self.setCookie(self.props.cookieName, "true", 365)
                self.hideDialog()
            })
        }
    }
    if (this.getCookie(self.props.cookieName) === undefined) {
        this.showDialog()
    }
}

// API
CookieConsent.prototype.reset = function () {
    this.removeCookie(this.props.cookieName)
    this.showDialog()
}
CookieConsent.prototype.isTrackingCookieAllowed = function () {
    return this.getCookie(this.props.cookieName) === "false"
}