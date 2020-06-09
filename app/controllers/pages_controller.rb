class PagesController < ApplicationController
  before_action :authenticate_user!, :is_admin?, :set_cart, only: [:admin]

  def index
  end
  
  def admin
  end

end
