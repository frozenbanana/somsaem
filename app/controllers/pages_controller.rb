class PagesController < ApplicationController
  before_action :authenticate_user!, :is_admin?, only: [:admin]

  def index
  end
  
  def admin
  end

end
