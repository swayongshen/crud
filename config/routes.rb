Rails.application.routes.draw do
  resources :books do
    collection do
      get 'privileged', to: 'books#privileged_mode'
    end
  end
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :quotes
    end
  end

  get 'books/privileged', to: 'books#privileged_mode'
end
