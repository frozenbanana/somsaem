class AddFieldsAgainToProducts < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :isRepairable, :bool, default: false
    add_column :products, :basePrice, :float
  end
end
