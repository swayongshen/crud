require 'rails_helper'

describe "PUT /api/v1/quotes/:id" do
  before(:each) do
    @quote = create(:random_quote)
  end

  it 'updates a quote' do
    @new_quote_title = Faker::Lorem.sentence
    put "/api/v1/quotes/#{@quote.id}", params: { quote: { title: @new_quote_title} }

    expect(response.status).to eq(200)
    expect(Quote.find(@quote.id).title).to eq(@new_quote_title)
  end
end
