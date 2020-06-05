class ArticleCategory < ApplicationRecord
  include Fae::BaseModelConcern

  def fae_display_field
    name
  end


  acts_as_list add_new_at: :top
  default_scope { order(:position) }

end
