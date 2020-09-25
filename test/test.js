var assert = chai.assert

beforeEach(function () {
    removeCookie("cookie-consent-tracking-allowed")
    if(document.getElementById("cookieConsentModal")) {
        document.getElementById("cookieConsentModal").remove()
    }
})

describe('cookie-consent', function () {
    it('Should display a dialog', function () {
        // noinspection JSUnusedLocalSymbols
        var cookieConsent = new CookieConsent()
        assert.notEqual(document.getElementById("cookieConsentModal"), null)
    })
    it('Should not display a dialog if autoShowModal is false', function () {
        // noinspection JSUnusedLocalSymbols
        var cookieConsent = new CookieConsent({autoShowModal: false})
        assert.equal(document.getElementById("cookieConsentModal"), null)
    })
    it('Should display the dialog on reset()', function() {
        var cookieConsent = new CookieConsent({autoShowModal: false})
        assert.equal(document.getElementById("cookieConsentModal"), null)
        cookieConsent.reset()
        assert.notEqual(document.getElementById("cookieConsentModal"), null)
    })
    it('Should write a cookie if accepted', function() {
        var cookieConsent = new CookieConsent()
        assert.equal(cookieConsent.trackingAllowed(), false)
        document.getElementById("cookieConsentModal").querySelector(".btn-accept-all").click()
        assert.equal(cookieConsent.trackingAllowed(), true)
    })
    it('Should write a cookie if not accepted', function() {
        var cookieConsent = new CookieConsent()
        assert.equal(cookieConsent.trackingAllowed(), false)
        document.getElementById("cookieConsentModal").querySelector(".btn-accept-necessary").click()
        assert.equal(cookieConsent.trackingAllowed(), false)
    })
})

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