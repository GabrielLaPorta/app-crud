class AddressesController < ActionController::Base
    
    def index
        addresses = Address.all.as_json
        addresses.map{ |addresses|
            addresses['clients'] = Client.where(id: addresses['client_id'])   
        }

        render json: addresses
    end

    def show
        address = Address.find(params[:id]).as_json
        client = Client.where(id: address['client_id'])
        address['client'] = client

        render json: address
    end

    def show_by_client
        addresses = Address.where(:client_id => params[:client_id])

        render json: addresses
    end

    def create
        address = Address.new
        address.client_id = params[:client_id]
        address.address = params[:address]
        address.city = params[:city]
        address.zip_code = params[:zip_code]
        address.save

        render json: address
    end

    def update
        address = Address.find(params[:id])
        address.address = params[:address]
        address.city = params[:city]
        address.zip_code = params[:zip_code]
        address.save

        render json: address
    end

    def destroy
        address = Address.find(params[:id])
        address.destroy

        render json: address
    end
end