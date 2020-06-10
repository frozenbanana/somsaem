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
  get 'sales', to: 'sales#index'

  get '/admin/import', :to => 'admin#newimport'
  post '/admin/import', :to => 'admin#createimport'
  resources :admin

end
