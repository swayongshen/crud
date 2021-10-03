require 'rails_helper'

# Generates 20 random quotes and check that GET /api/v1/quotes returns 20 quotes.
describe "get all quotes route", :type => :request do
  let!(:quotes) { FactoryBot.create_list(:random_quote, 20) }
  before { get '/api/v1/quotes' }

  it 'returns all questions' do
    expect(JSON.parse(response.body).size).to eq(20)
  end

  it 'returns status code 200' do
    expect(response).to have_http_status(:success)
  end
end
