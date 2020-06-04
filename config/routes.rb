Rails.application.routes.draw do

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  namespace :admin do
    resources :device2s
    resources :products
    resources :devices
    resources :repairables
  end
  # mount Fae below your admin namespec
  mount Fae::Engine => '/admin'

  root 'pages#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
