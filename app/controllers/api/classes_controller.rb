class Api::ClassesController < ActionController::Base
    
    def index
        classes = Classes.all.as_json
        
        render json: classes
    end

    def show
        cls = Classes.find(params[:id]).as_json
        
        render json: cls
    end

    def create
        cls = Classes.new
        cls.name = params[:name]
        cls.description = params[:description]
        cls.save
    
        render json: cls
    end

    def update
        cls = Classes.find(params[:id])
        cls.name = params[:name]
        cls.description = params[:description]
        cls.save

        render json: cls
    end

    def destroy
        cls = Classes.find(params[:id])
        cls.destroy
    
        render json: cls
    end 

end