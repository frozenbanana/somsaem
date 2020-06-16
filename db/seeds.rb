# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Product.create(name: 'Balls', description: 'Tastes great!', quantity: 69, price: 4.20, manufacturer: "Deez", model: "Nutz")
Product.create(name: 'Stuff', description: 'Tastes great!', quantity: 69, price: 4.20, manufacturer: "Deez", model: "Nutz")
Product.create(name: 'You know', description: 'Tastes great!', quantity: 69, price: 4.20, manufacturer: "Deez", model: "Nutz")
Product.create(name: 'This one', description: 'Tastes great!', quantity: 69, price: 4.20, manufacturer: "Deez", model: "Nutz")
Product.create(name: 'Good', description: 'Tastes great!', quantity: 69, price: 4.20, manufacturer: "Deez", model: "Nutz")


Product.create(name: 'iPhone 7', description: 'It is a phone', quantity: 1, price: 2400, manufacturer: "Apple", model: "iPhone 7", isRepairable: true, basePrice: 900)
Product.create(name: 'iPhone 8', description: 'It is a phone', quantity: 1, price: 2600, manufacturer: "Apple", model: "iPhone 8", isRepairable: true, basePrice: 1000)
Product.create(name: 'iPhone X', description: 'It is a phone', quantity: 1, price: 2700, manufacturer: "Apple", model: "iPhone X", isRepairable: true, basePrice: 1100)
Product.create(name: 'Galaxy S7', description: 'It is a phone', quantity: 1, price: 2100, manufacturer: "Apple", model: "Galaxy S7", isRepairable: true, basePrice: 900)
Product.create(name: 'Galaxy S8', description: 'It is a phone', quantity: 1, price: 2660, manufacturer: "Apple", model: "Galaxy S8", isRepairable: true, basePrice: 1100)

AppSetting.create
# Repairable.create(model: 'Iphone 6s', manufacturer: 'Apple', model_year: 2016);
# Repairable.create(model: 'Iphone 7', manufacturer: 'Apple', model_year: 2017);
# Repairable.create(model: 'Iphone 7+', manufacturer: 'Apple', model_year: 2017);
# Repairable.create(model: 'Iphone 8', manufacturer: 'Apple', model_year: 2018);
# Repairable.create(model: 'Galaxy S7', manufacturer: 'Samsung', model_year: 2017);
# Repairable.create(model: 'Galaxy S8', manufacturer: 'Samsung', model_year: 2018);
# Repairable.create(model: 'Galaxy S9', manufacturer: 'Samsung', model_year: 2018);