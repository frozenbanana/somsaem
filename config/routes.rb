Rails.application.routes.draw do
  namespace :admin do
    resources :devices
    resources :device_brands
    resources :device_types
    resources :articles
    resources :article_categories
  end
  # mount Fae below your admin namespec
  mount Fae::Engine => '/admin'
  
  root to: 'pages#index'
  devise_for :accounts

  # Pass all routes to page#index making React router manage everything
  # get '*path', to: 'pages#index', via: :all 


end
