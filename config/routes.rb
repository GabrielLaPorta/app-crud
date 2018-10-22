Rails.application.routes.draw do
  root to: 'application#index'

  resources :clients, only: [:index, :show, :create, :destroy, :update] do
    collection do
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
end