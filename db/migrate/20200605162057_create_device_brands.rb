class CreateDeviceBrands < ActiveRecord::Migration[6.0]
  def change
    create_table :device_brands do |t|
      t.string :name
      t.integer :position

      t.timestamps
    end
  end
end
