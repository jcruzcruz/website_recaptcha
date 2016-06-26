odoo.define('website_form_recaptcha_reloaded.website_form', function (require) {
    "use strict";

    var core = require('web.core');
    var qweb = core.qweb;

    var website_form = require('website_form.animation');
    var snippet_animation = require('web_editor.snippets.animation');

    snippet_animation.registry.form_builder_send.include({
        start: function() {
            qweb.add_template('/website_form_recaptcha_reloaded/static/src/xml/website_form.xml');
            this._super();
        },

        recaptcha_defined: function() {
            return typeof grecaptcha != 'undefined' &&
                   $('.g-recaptcha').length > 0;
        },

        recaptcha_valid: function() {
            return grecaptcha.getResponse() != '';
        },

        send: function (e) {
            // check for error fields first
            if (!this.check_error_fields([])) {
                this.update_status('invalid');
                return false;
            }

            // then check for recaptcha...
            if(this.recaptcha_defined()) {
                if(!this.recaptcha_valid()) {
                    this.update_status('invalid_recaptcha');
                    return false;
                }
            }

            return this._super(e);
        },

    });

});
