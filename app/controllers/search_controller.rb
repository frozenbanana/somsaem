class SearchController < ApplicationController
  def index
    if params[:query].present?
      @repairables = Repairable.search(params[:query])
    else
      # @repairables = Repairable.all
    end
  end
end