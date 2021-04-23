Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: 'cards#index'

  resources :cards do
    resource :like, only: [:show, :create, :destroy]
  end

  resource :profile
  resource :avatar

end
