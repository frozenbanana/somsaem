Rails.application.routes.draw do

  
  resources :line_items
  resources :carts, only: [:new, :create, :show]
  get 'search/index'
  devise_for :users
  resources :products
  resources :repairables
  resources :search, only: [:index]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'pages#index'

  get '/admin', :to => 'pages#admin'
end
