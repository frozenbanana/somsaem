class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, :is_admin?, only: [:new, :create, :edit, :update, :destroy]

  # GET /products
  # GET /products.json
  def index
    # @products = Product.all
    if not params[:search].present?
      @products = Product.all
    else
      @products = Product.search(params[:search])
    end
  end

  # GET /products/estimate_price
  # GET /products.json
  def estimate_price
    product = Product.find_by(model: price_estimate_params[:model])
    setting = AppSetting.first_or_create

    if product.basePrice.present?
      price  = product.basePrice
    else
      price = -1
    end
    
    if price_estimate_params[:previousRepairs].present?
      price -= price * setting[:previousRepairFactor] * Float(price_estimate_params[:previousRepairs])
    end
    if price_estimate_params[:wearLevel].present?
      price -= price * setting[:wearLevelFactor] * Float(price_estimate_params[:wearLevel])
    end
    if price_estimate_params[:serviceProviderLocked] == "true"
      price *= setting[:serviceProviderLockedFactor]
    end
    if price_estimate_params[:cloudLocked] == "true"
      price *= setting[:cloudLockedFactor]
    end
    if price_estimate_params[:bootupDefect] == "true"
      price *= setting[:bootupDefectFactor]
    end
    if price_estimate_params[:screenDefect] == "true"
      price *= setting[:screenDefectFactor]
    end

    #binding.pry
    price = price - price % 25 # Around to closest 25
    render json: price
  end

  # GET /products/1
  # GET /products/1.json
  def show
  end

  # GET /products/new
  def new
    @product = Product.new
  end

  # GET /products/1/edit
  def edit
  end

  # POST /products
  # POST /products.json
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

  # PATCH/PUT /products/1
  # PATCH/PUT /products/1.json
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

  # DELETE /products/1
  # DELETE /products/1.json
  def destroy
    @product.destroy
    respond_to do |format|
      format.html { redirect_to products_url, notice: 'Product was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def product_params
      # params.fetch(:product, {})
      params.require(:product).permit(:name, :description, :manufacturer, :model, :quantity, :price, :productimage)
    end

     # Only allow a list of trusted parameters through.
     def price_estimate_params
      # params.fetch(:product, {})
      params.permit(:model, :storage, :serviceProviderLocked, :wearLevel, :cloudLocked, :bootupDefect, :screenDefect, :previousRepairs)
    end

end
