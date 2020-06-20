class AddNameToRepairables < ActiveRecord::Migration[6.0]
  def change
    add_column :repairables, :repair_name, :string
  end
end
