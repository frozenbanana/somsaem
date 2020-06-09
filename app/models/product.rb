class Product < ApplicationRecord
    has_one_attached :productimage
    has_many :line_items

    include PgSearch::Model
    pg_search_scope :search, against: [:name, :model, :manufacturer]

    before_destroy :not_referenced_by_any_line_item
    belongs_to :user, optional: true

    private
  
     def not_referenced_by_any_line_item
      unless line_items.empty?
        errors.add(:base, 'Line items present')
        throw :abort
      end
     end
end
