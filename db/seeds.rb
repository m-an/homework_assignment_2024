# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#

# increase the amount of companies we seed so the pagination would make sense locally too
# i.e. improve developer experience making it closer to real life
100.times do |i|
  Company.create(
    name: Faker::Company.name,
    industry: Faker::Company.industry,
    employee_count: rand(10..1000)
  )
end

statuses = ["pending", "won", "lost"]

# increase the amount of deals for the same purpose
300.times do |i|
  Deal.create(
    name: "Deal #{i}",
    status: statuses.sample,
    amount: rand(10..1000),
    company_id: Company.order("RAND()").first.id
  )
end
