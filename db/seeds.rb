# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Product.create(name: 'Samsung Galaxy Note 9', description: 'The best the Note line has seen yet.', quantity: 5, price: 1000, manufacturer: "samsung", model: "galaxynote9", isRepairable: true, basePrice: 500)
Product.create(name: 'Samsung Galaxy Note 10', description: 'The best the Note line has seen yet.', quantity: 5, price: 1100, manufacturer: "samsung", model: "galaxynote10", isRepairable: true, basePrice: 550)
Product.create(name: 'Samsung Galaxy Note 20', description: 'The best the Note line has seen yet.', quantity: 5, price: 1200, manufacturer: "samsung", model: "galaxynote20", isRepairable: true, basePrice: 600)
Product.create(name: 'iPhone 7', description: 'It is a phone', quantity: 1, price: 2400, manufacturer: "Apple", model: "iPhone 7", isRepairable: true, basePrice: 900)
Product.create(name: 'iPhone 8', description: 'It is a phone', quantity: 1, price: 2600, manufacturer: "Apple", model: "iPhone 8", isRepairable: true, basePrice: 1000)
Product.create(name: 'iPhone X', description: 'It is a phone', quantity: 1, price: 2700, manufacturer: "Apple", model: "iPhone X", isRepairable: true, basePrice: 1100)
Product.create(name: 'Galaxy S7', description: 'It is a phone', quantity: 1, price: 2100, manufacturer: "Apple", model: "Galaxy S7", isRepairable: true, basePrice: 900)
Product.create(name: 'Galaxy S8', description: 'It is a phone', quantity: 1, price: 2660, manufacturer: "Apple", model: "Galaxy S8", isRepairable: true, basePrice: 1100)