# -*- coding: utf-8 -*-
##############################################################################
#
#    Tech-Receptives Solutions Pvt. Ltd.
#    Copyright (C)2004-TODAY Tech Receptives(<https://www.techreceptives.com>)
#    Copyright (C)2016-TODAY Cubex Solutions (<https://cubex.solutions>)
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################
from openerp.addons.web import http
from openerp.addons.web.http import request
from openerp.addons.website_form.controllers import main

class WebsiteForm(main.WebsiteForm):

    @http.route()
    def website_form(self, model_name, **kwargs):
        if 'g-recaptcha-response' in kwargs:
            if request.website.is_captcha_valid(kwargs['g-recaptcha-response']):
                # remove the value of g-recaptcha-response
                # not to see it as a field of any model
                del kwargs['g-recaptcha-response']
                return super(WebsiteForm, self).website_form(model_name, **kwargs)
            else:
                return super(WebsiteForm, self).website_form(None, **kwargs)

        # recaptcha is not there
        return super(WebsiteForm, self).website_form(model_name, **kwargs)
