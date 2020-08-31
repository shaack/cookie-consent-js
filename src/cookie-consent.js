function CookieConsent(props) {
    var self = this
    this.props = {
        content: {
            de: {
                title: "Cookie-Einstellungen",
                body: "Wir nutzen Cookies, um Inhalte zu personalisieren und die Zugriffe auf unsere Website zu analysieren. " +
                    "Sie können wählen, ob Sie nur für die Funktion der Website notwendige Cookies akzeptieren oder auch " +
                    "Tracking Cookies zulassen möchten. Weitere Informationen finden Sie in unserer --privacy-policy--.",
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
    var modalTemplate =
        '<div class="cookie-consent-modal">' +
        '<div class="modal-content">' +
        '<div class="modal-header">--header--</div>' +
        '<div class="modal-body">--body--</div>' +
        '<div class="modal-footer">--footer--</div>' +
        '</div>'
    this.modalContent = modalTemplate
    this.modalContent = this.modalContent.replace(/--header--/, "<h3>" + this.props.content.de.title + "</h3>")
    this.modalContent = this.modalContent.replace(/--body--/, this.props.content.de.body)
    // private
    var showDialog = function () {
        var existing = document.getElementById("cookieConsentModal")
        if (!existing) {
            var modal = document.createElement("div")
            modal.id = self.props.modalId
            modal.innerHTML = self.modalContent
            document.body.append(modal)
        }
    }
    showDialog()
}

// API
// CookieConsent.prototype.
