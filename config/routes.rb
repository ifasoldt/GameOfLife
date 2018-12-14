Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'games#new'
  resources :games, only: [:index, :show, :new, :create] do
    put :advance
    put :reset
  end
end
