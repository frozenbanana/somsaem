class ApplicationController < ActionController::Base
    before_action :set_cart

    private

    def is_admin?
        # check if user is a admin
        # if not admin then redirect to where ever you want 
        redirect_to root_path unless current_user.admin? 
    end
  
    def set_cart
    #   @cart = Cart.find(session[:cart_id])
    # rescue ActiveRecord::RecordNotFound
    #   @cart = Cart.create
    #   session[:cart_id] = @cart.id
    if session[:cart_id]
      @cart ||= Cart.find(session[:cart_id])
    end
    if session[:cart_id].nil?
      @cart = Cart.create!
      session[:cart_id] = @cart.id
    end
    @cart
    end
    
    
end
