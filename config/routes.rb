Rails.application.routes.draw do

  namespace :admin do
    resources :articles
    resources :article_categories
  end
  # mount Fae below your admin namespec
  mount Fae::Engine => '/admin'

  root 'pages#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
