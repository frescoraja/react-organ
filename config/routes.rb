Rails.application.routes.draw do
  root to: "static_pages#root"
  namespace :api, default: {format: :json} do
    resources :tracks, only: [:index, :create, :destroy]
  end
end
