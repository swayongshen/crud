require 'rails_helper'

describe "delete quotes route" do
  # Create two quotes.
  before(:each) do
    @first_quote = create(:random_quote)
    @second_quote = create(:random_quote)
  end

  # Yea
  it 'should delete the quote' do
    # Check that the quotes that were created are present.
    get "/api/v1/quotes/"
    expect(response.status).to eq(200)
    expect(JSON.parse(response.body)).to eq([YAML.load(@first_quote.to_json),YAML.load(@second_quote.to_json),])

    # Delete the first quote
    delete "/api/v1/quotes/#{@first_quote.id}"
    expect(response.status).to eq(204)

    # Should be left with second quote
    get "/api/v1/quotes/"
    expect(response.status).to eq(200)
    expect(JSON.parse(response.body)).to eq([YAML.load(@second_quote.to_json),])
  end

end
