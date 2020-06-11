class AdminController < ApplicationController
    before_action :authenticate_user!, :is_admin?

    def index
    end

    def newimport
        render :new_import
    end

    def createimport
        Product.import(params[:file])
        respond_to do |format|
            format.html { redirect_to admin_index_path, notice: 'Products imported successfully.' }
        end
    end

end