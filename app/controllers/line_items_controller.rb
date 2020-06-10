class LineItemsController < ApplicationController
  before_action :set_line_item, only: [:destroy]
  before_action :set_cart, only: [:create]

  def create
    @product = Product.find(params[:product_id])
    @line_item = LineItem.new(product_id: @product.id, cart_id: session[:cart_id])


    respond_to do |format|
      if @line_item.save
        format.html { redirect_to @cart, notice: 'Item added successfully.' }
        format.json { render :show, status: :created, location: @line_item }
      else
        format.html { redirect_to @product, notice: 'Could not add item to cart.  Please try again.'}
        format.json { render json: @line_item.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @line_item.destroy
    respond_to do |format|
      format.html { redirect_to Cart.find(session[:cart_id]), notice: 'Item removed from cart successfully.' }
      format.json { head :no_content }
    end
  end

  private

    def set_line_item
      @line_item = LineItem.find(params[:id])
    end

end