class Api::ClassesController < ApplicationController
    
    def index
        classes = Classes.index_with_clients
        
        render json: classes
    end

    def show
        cls = Classes.find(params[:id]).as_json
        
        render json: cls
    end

    def create
        cls = Classes.new
        cls.name_class = params[:name]
        cls.description = params[:description]
        cls.save
    
        render json: cls
    end

    def update
        cls = Classes.find(params[:id])
        cls.name_class = params[:name]
        cls.description = params[:description]
        cls.save

        render json: cls
    end

    def destroy
        cls = Classes.find(params[:id])
        association = ClientAndClass.where(class_id: params[:id])
        association.destroy_all
        cls.destroy
    
        render json: cls
    end
end