FactoryBot.define do
  factory :deal do
    name { Faker::Lorem.word }
    status { %w[pending won lost].sample }
    amount { rand(10..1000) }
    company { Company.order(Arel.sql('RAND()')).first || association(:company) }
  end
end
