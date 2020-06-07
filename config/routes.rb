Rails.application.routes.draw do

  
  get 'search/index'
  devise_for :users
  resources :products
  resources :repairables
  resources :search, only: [:index]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'pages#index'

  get '/admin', :to => 'pages#admin'
end
