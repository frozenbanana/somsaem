class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, :is_admin?, only: [:new, :create, :edit, :update, :destroy]

  def index
    if not params[:search].present?
      @products = Product.all
    else
      @products = Product.search(params[:search])
    end
  end

  def estimate_price
    # binding.pry
    product = Product.find_by(model: price_estimate_params[:model])
    # binding.pry
    # product.calc_price(params)
    render json: product  
  end

  def show
  end

  def new
    @product = Product.new
  end

  def edit
  end

  def create
    @product = Product.new(product_params)

    respond_to do |format|
      if @product.save
        format.html { redirect_to @product, notice: 'Product was successfully created.' }
        format.json { render :show, status: :created, location: @product }
      else
        format.html { render :new }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @product.update(product_params)
        format.html { redirect_to @product, notice: 'Product was successfully updated.' }
        format.json { render :show, status: :ok, location: @product }
      else
        format.html { render :edit }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @product.destroy
    respond_to do |format|
      format.html { redirect_to products_url, notice: 'Product was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_product
      @product = Product.find(params[:id])
    end

    def product_params
      params.require(:product).permit(:name, :description, :manufacturer, :model, :quantity, :price, :productimage, :isRepairable, :basePrice)
    end

     def price_estimate_params
      params.permit(:model, :storage, :serviceProviderLockedFactor, :wearLevelFactor, :cloudLockedFactor, :bootupDefectFactor, :previousRepairFactor)
    end
end