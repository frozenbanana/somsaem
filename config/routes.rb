Rails.application.routes.draw do
  namespace :admin do
    resources :articles
    resources :article_categories
  end
  # mount Fae below your admin namespec
  mount Fae::Engine => '/admin'
  
  root 'pages#index'
   # Pass all routes to page#index making React router manage everything
  get '*path', to: 'pages#index', via: :all 


end
