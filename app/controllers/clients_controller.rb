class ClientsController < ActionController::Base

    def index
        clients = Client.all.as_json
        clients.map { |client|
            client['addresses'] = Address.where(client_id: client['id'])
        }

        render json: clients
    end
    
    def show
        client = Client.find(params[:id]).as_json
        addresses = Address.where(client_id: params[:id])
        client['addresses'] = addresses
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