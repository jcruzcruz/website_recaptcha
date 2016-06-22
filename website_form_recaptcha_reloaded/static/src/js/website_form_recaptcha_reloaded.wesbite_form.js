odoo.define('website_form_recaptcha_reloaded.website_form', function (require) {
    "use strict";

    var website_form = require('website_form.animation');
    var snippet_animation = require('web_editor.snippets.animation');

    snippet_animation.registry.form_builder_send.include({

        recaptcha_defined: function() {
            return typeof grecaptcha != 'undefined';
        },

        recaptcha_valid: function() {
            return grecaptcha.getResponse() != '';
        },

        check_error_fields: function(error_fields) {
            if(this.recaptcha_defined()) {
                if(!this.recaptcha_valid()) {
                    return false;
                }
            }

            return this._super(error_fields);
        }

    });

});
