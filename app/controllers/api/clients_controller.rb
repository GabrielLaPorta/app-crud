class Api::ClientsController < ActionController::Base

    def index
        render json: Client.all.as_json({include: :addresses})
    end
    
    def show
        render json: Client.find(params[:id]).as_json({include: :addresses})
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

        render json: client
    end

    def destroy
        client = Client.find(params[:id])
        addresses = Address.where(client_id: params[:id])
        addresses.destroy_all
        client.destroy

        render json: client
    end
end