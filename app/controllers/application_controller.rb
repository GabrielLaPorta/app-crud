class ApplicationController < ActionController::Base

    def index
        render layout: 'application', html: ''
    end

end
