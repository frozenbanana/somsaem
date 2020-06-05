class Device < ApplicationRecord
  include Fae::BaseModelConcern

  def fae_display_field
    title
  end

  has_fae_image :image


  belongs_to :device_type
  belongs_to :device_brand
end
