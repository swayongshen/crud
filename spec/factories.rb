FactoryBot.define do
  factory :random_quote, class: Quote do
    title { Faker::Lorem.sentence }
  end
end