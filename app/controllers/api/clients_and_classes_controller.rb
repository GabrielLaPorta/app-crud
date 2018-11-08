class Api::ClientsAndClassesController < ApplicationController

    def create
        clientCreateClass = ClientAndClass.create_client_and_class(
            params[:client_id], params[:class_id]
        )
    end

    def destroy
        clientDestroyClass = ClientAndClass.delete_client_and_class(
            params[:client_id], params[:class_id]
        )
    end

end