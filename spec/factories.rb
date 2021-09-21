FactoryBot.define do
  factory :quote do
    title { "MyString" }
  end

  factory :random_quote, class: Quote do
    title { Faker::Lorem.sentence }
  end
end