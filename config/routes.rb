Rails.application.routes.draw do
  root to: 'application#index'

  namespace :api, defaults: { format: 'json' } do
    resources :clients, only: [:index, :show, :create, :destroy, :update] do
      collection do
        get :index_with_classes
        get :show_with_classes
        put :update
        delete :destroy
      end
    end
  
    resources :addresses, only: [:index, :show, :show_by_client, :create, :destroy, :update] do
      collection do
        put :update
        delete :destroy
        get :show_by_client
      end
    end

    resources :classes, only: [:index, :show, :create, :destroy, :update] do
      collection do
        put :update
        delete :destroy
      end
    end

    resources :client_classes, only: [:index, :show, :create, :destroy, :update] do
      collection do
        put :update
        delete :destroy
      end
    end
  end
  
  get '/*path' => 'application#index'
end