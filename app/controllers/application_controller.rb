class ApplicationController < ActionController::Base

    private

    def is_admin?
        # check if user is a admin
        # if not admin then redirect to where ever you want 
        redirect_to root_path unless current_user.admin? 
    end
    
end
