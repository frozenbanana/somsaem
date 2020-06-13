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

  # POST /products/estimate_price
  # POST /products.json
  def estimate_price
    # binding.pry
    product = Product.find_by(model: price_estimate_params[:model])
   # binding.pry
    # product.calc_price(params)
    render json: product  
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
      params.permit(:model, :storage, :serviceProviderLockedFactor, :wearLevelFactor, :cloudLockedFactor, :bootupDefectFactor, :previousRepairFactor)
    end

end
