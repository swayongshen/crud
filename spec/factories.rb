FactoryBot.define do
  factory :book do
    title { "MyString" }
  end

  factory :user do
    
  end

  factory :quote do
    title { "MyString" }
  end

  factory :random_quote, class: Quote do
    title { Faker::Lorem.sentence }
  end
end