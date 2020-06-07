class CreateRepairables < ActiveRecord::Migration[6.0]
  def change
    create_table :repairables do |t|

      t.timestamps
    end
  end
end
