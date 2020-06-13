Rails.application.routes.draw do

  
  resources :charges, only: [:new, :create]
  resources :line_items
  get '/products/estimate_price', :to => 'products#estimate_price'
  get 'search/index'
  devise_for :users
  resources :products
  resources :repairables
  resources :search, only: [:index]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'pages#index'
  get '/charges/thanks', :to => 'charges#thanks', as: "success"
  get 'sales', to: 'sales#index'

  get '/admin/import', :to => 'admin#newimport'
  post '/admin/import', :to => 'admin#createimport'
  resources :admin

  get 'cart', to: 'carts#show'



end
