class Api::ClientsClassesController < ApplicationController

    def index
        clientsClasses = index_with_classes.result
        
        render json: clientsClasses
    end
end