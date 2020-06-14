# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_14_005604) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "first_name", default: "", null: false
    t.string "last_name", default: "", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_accounts_on_email", unique: true
    t.index ["reset_password_token"], name: "index_accounts_on_reset_password_token", unique: true
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "admins", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
  end

  create_table "app_settings", force: :cascade do |t|
    t.float "serviceProviderLockedFactor", default: 0.2
    t.float "wearLevelFactor", default: 0.1
    t.float "cloudLockedFactor", default: 0.9
    t.float "screenDefectFactor", default: 0.375
    t.float "bootupDefectFactor", default: 0.3
    t.float "previousRepairFactor", default: 0.1
    t.integer "singleton_guard"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["singleton_guard"], name: "index_app_settings_on_singleton_guard", unique: true
  end

  create_table "article_categories", force: :cascade do |t|
    t.string "name"
    t.integer "position"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "articles", force: :cascade do |t|
    t.string "title"
    t.string "slug"
    t.text "introduction"
    t.text "body"
    t.date "date"
    t.bigint "article_category_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["article_category_id"], name: "index_articles_on_article_category_id"
  end

  create_table "carts", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "device_brands", force: :cascade do |t|
    t.string "name"
    t.integer "position"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "device_types", force: :cascade do |t|
    t.string "name"
    t.integer "position"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "devices", force: :cascade do |t|
    t.string "title"
    t.string "slug"
    t.text "introduction"
    t.text "body"
    t.date "date"
    t.bigint "device_type_id", null: false
    t.bigint "device_brand_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["device_brand_id"], name: "index_devices_on_device_brand_id"
    t.index ["device_type_id"], name: "index_devices_on_device_type_id"
  end

  create_table "fae_changes", id: :serial, force: :cascade do |t|
    t.integer "changeable_id"
    t.string "changeable_type"
    t.integer "user_id"
    t.string "change_type"
    t.text "updated_attributes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["changeable_id"], name: "index_fae_changes_on_changeable_id"
    t.index ["changeable_type"], name: "index_fae_changes_on_changeable_type"
    t.index ["user_id"], name: "index_fae_changes_on_user_id"
  end

  create_table "fae_files", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "asset"
    t.string "fileable_type"
    t.integer "fileable_id"
    t.integer "file_size"
    t.integer "position", default: 0
    t.string "attached_as"
    t.boolean "on_stage", default: true
    t.boolean "on_prod", default: false
    t.boolean "required", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["attached_as"], name: "index_fae_files_on_attached_as"
    t.index ["fileable_type", "fileable_id"], name: "index_fae_files_on_fileable_type_and_fileable_id"
  end

  create_table "fae_images", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "asset"
    t.string "imageable_type"
    t.integer "imageable_id"
    t.string "alt"
    t.string "caption"
    t.integer "position", default: 0
    t.string "attached_as"
    t.boolean "on_stage", default: true
    t.boolean "on_prod", default: false
    t.integer "file_size"
    t.boolean "required", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["attached_as"], name: "index_fae_images_on_attached_as"
    t.index ["imageable_type", "imageable_id"], name: "index_fae_images_on_imageable_type_and_imageable_id"
  end

  create_table "fae_options", id: :serial, force: :cascade do |t|
    t.string "title"
    t.string "time_zone"
    t.string "colorway"
    t.string "stage_url"
    t.string "live_url"
    t.integer "singleton_guard"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["singleton_guard"], name: "index_fae_options_on_singleton_guard", unique: true
  end

  create_table "fae_roles", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "fae_static_pages", id: :serial, force: :cascade do |t|
    t.string "title"
    t.integer "position", default: 0
    t.boolean "on_stage", default: true
    t.boolean "on_prod", default: false
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_fae_static_pages_on_slug"
  end

  create_table "fae_text_areas", id: :serial, force: :cascade do |t|
    t.string "label"
    t.text "content"
    t.integer "position", default: 0
    t.boolean "on_stage", default: true
    t.boolean "on_prod", default: false
    t.integer "contentable_id"
    t.string "contentable_type"
    t.string "attached_as"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["attached_as"], name: "index_fae_text_areas_on_attached_as"
    t.index ["contentable_id"], name: "index_fae_text_areas_on_contentable_id"
    t.index ["contentable_type"], name: "index_fae_text_areas_on_contentable_type"
    t.index ["on_prod"], name: "index_fae_text_areas_on_on_prod"
    t.index ["on_stage"], name: "index_fae_text_areas_on_on_stage"
    t.index ["position"], name: "index_fae_text_areas_on_position"
  end

  create_table "fae_text_fields", id: :serial, force: :cascade do |t|
    t.string "contentable_type"
    t.integer "contentable_id"
    t.string "attached_as"
    t.string "label"
    t.string "content"
    t.integer "position", default: 0
    t.boolean "on_stage", default: true
    t.boolean "on_prod", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["attached_as"], name: "index_fae_text_fields_on_attached_as"
    t.index ["contentable_type", "contentable_id"], name: "index_fae_text_fields_on_contentable_type_and_contentable_id"
    t.index ["on_prod"], name: "index_fae_text_fields_on_on_prod"
    t.index ["on_stage"], name: "index_fae_text_fields_on_on_stage"
    t.index ["position"], name: "index_fae_text_fields_on_position"
  end

  create_table "fae_users", id: :serial, force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.string "first_name"
    t.string "last_name"
    t.integer "role_id"
    t.boolean "active"
    t.string "language"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_fae_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_fae_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_fae_users_on_reset_password_token", unique: true
    t.index ["role_id"], name: "index_fae_users_on_role_id"
    t.index ["unlock_token"], name: "index_fae_users_on_unlock_token", unique: true
  end

  create_table "line_items", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.bigint "cart_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "quantity", default: 1
    t.bigint "order_id"
    t.index ["cart_id"], name: "index_line_items_on_cart_id"
    t.index ["order_id"], name: "index_line_items_on_order_id"
    t.index ["product_id"], name: "index_line_items_on_product_id"
  end

  create_table "order_items", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.bigint "product_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["order_id"], name: "index_order_items_on_order_id"
    t.index ["product_id"], name: "index_order_items_on_product_id"
  end

  create_table "orders", force: :cascade do |t|
    t.string "email"
    t.float "total"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "pg_search_documents", force: :cascade do |t|
    t.text "content"
    t.string "searchable_type"
    t.bigint "searchable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id"
  end

  create_table "products", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.text "description"
    t.integer "quantity"
    t.float "price"
    t.string "manufacturer"
    t.string "model"
    t.boolean "isRepairable", default: false
    t.float "basePrice"
    t.string "storage"
  end

  create_table "repairables", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "model"
    t.string "manufacturer"
    t.integer "model_year"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "admin", default: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "articles", "article_categories"
  add_foreign_key "devices", "device_types"
  add_foreign_key "line_items", "carts"
  add_foreign_key "line_items", "orders"
  add_foreign_key "line_items", "products"
  add_foreign_key "order_items", "orders"
  add_foreign_key "order_items", "products"
end
