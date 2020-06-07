class Repairable < ApplicationRecord
    include PgSearch::Model
    pg_search_scope :search, against: [:model, :manufacturer]
end
