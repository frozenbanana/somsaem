class LineItemsController < ApplicationController
  before_action :set_line_item, only: [:destroy]
  before_action :set_cart, only: [:create, :destroy]

  def create
    @product = Product.find(params[:product_id])
<<<<<<< Updated upstream
    @line_item = LineItem.new(product_id: @product.id, cart_id: @cart.id)
    if @line_item.save
      redirect_to cart_path, notice: 'Item added successfully.'
    else
      redirect_to @product, notice: 'Could not add item to cart.  Please try again.'
=======
<<<<<<< Updated upstream
    @line_item = LineItem.new(product_id: @product.id, cart_id: session[:cart_id])


    respond_to do |format|
      if @line_item.save
        format.html { redirect_to @cart, notice: 'Item added successfully.' }
        format.json { render :show, status: :created, location: @line_item }
      else
        format.html { redirect_to @product, notice: 'Could not add item to cart.  Please try again.'}
        format.json { render json: @line_item.errors, status: :unprocessable_entity }
      end
=======
    @line_item = LineItem.new(product_id: @product.id, cart_id: @cart.id)
    if @line_item.save
      redirect_to mycart_path, notice: 'Item added successfully.'
    else
      redirect_to @product, notice: 'Could not add item to cart.  Please try again.'
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    end
  end

  def destroy
    @line_item.destroy
<<<<<<< Updated upstream
    redirect_to cart_path, notice: 'Item removed from cart successfully.'
=======
<<<<<<< Updated upstream
    respond_to do |format|
      format.html { redirect_to Cart.find(session[:cart_id]), notice: 'Item removed from cart successfully.' }
      format.json { head :no_content }
    end
=======
    redirect_to mycart_path, notice: 'Item removed from cart successfully.'
>>>>>>> Stashed changes
>>>>>>> Stashed changes
  end

  private

  def set_line_item
    @line_item = LineItem.find(params[:id])
  end

end