require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq' if Rails.env.development?
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  

  root to: 'cards#index'

  resources :cards do
    resource :like, only: [:show, :create, :destroy]
    resources :comments, only: [:index, :create] do
      collection do
        get :json
      end
    end
  end

  resources :profiles, only: [:show] do
    resources :follows, only: [:create]
    resource :follows, only: [:show]
    resources :unfollows, only: [:create]
    # フォロー一覧
    resource :followingpage, only: [:show]
    resource :followingapi, only: [:show]

    # フォロワー一覧
    resource :followerpage, only: [:show]
    resource :followerapi, only: [:show]
  end

  resource :avatar

end
