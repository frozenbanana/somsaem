class Product < ApplicationRecord
    has_one_attached :productimage
    include PgSearch::Model
    pg_search_scope :search, against: [:name, :model, :manufacturer]
end
