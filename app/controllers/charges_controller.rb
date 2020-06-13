class ChargesController < ApplicationController
  before_action :set_cart

  def new
  end
  
  def create
    @amount = Integer(params[:amount].to_f * 100)
    @amount.to_i

  
    customer = Stripe::Customer.create(
      email: params[:stripeEmail],
      source: params[:stripeToken]
    )
  
    charge = Stripe::Charge.create(
      customer: customer.id,
      amount: @amount,
      description: 'Rails Stripe customer',
      currency: 'usd'
    )
  @cart.line_items.each do |item|
    item.product.quantity-=1
    item.product.save
  end
  @cart.line_items.clear

  redirect_to success_path

  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_charge_path
  end

  def thanks
    render :thanks
  end


end
