class Api::ClientsController < ApplicationController

    def index
        client = Client.find_clients.as_json

        render json: client
    end
    
    def show
        client = Client.find_by_id(
            params[:id]
        ).as_json

        render json: client
    end

    def create
        client = Client.new
        client.name = params[:name]
        client.email = params[:email]
        client.age = params[:age]
        client.save

        render json: client
    end

    def update
        client = Client.find(params[:id])
        client.name = params[:name]
        client.email = params[:email]
        client.age = params[:age]
        client.save

        ClientAndClass.delete_client_and_class(
            params[:id]
        )
        ClientAndClass.create_client_and_class(
            params[:id], 
            params[:classList]
        )

        render json: client
    end

    def destroy
        client = Client.find(params[:id])
        addresses = Address.where(
            client_id: params[:id]
        )
        addresses.destroy_all
        cls = ClientAndClass.where(
            client_id: params[:id]
        )
        cls.destroy_all
        client.destroy

        render json: client
    end
end