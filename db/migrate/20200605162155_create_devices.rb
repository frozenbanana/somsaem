class CreateDevices < ActiveRecord::Migration[6.0]
  def change
    create_table :devices do |t|
      t.string :title
      t.string :slug
      t.text :introduction
      t.text :body
      t.date :date
      t.references :device_type, null: false, foreign_key: true
      t.references :device_brand, null: false, foreign_key: true

      t.timestamps
    end
  end
end
