Rails.application.routes.draw do
  root to: 'application#index'

  resources :clients, only: [:index, :show, :create, :destroy, :update] do
    collection do
      put :update
      delete :destroy
    end
  end
end