class RepairableSerializer < ActiveModel::Serializer
    attributes :repair_name, :repair_price, :estimated_time
    belongs_to :product
end