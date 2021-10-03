require 'rails_helper'

describe "post a quote route", :type => :request do
  before do
    post '/api/v1/quotes', params: { quote: { title: "This is a test quote" }}
  end

  it 'returns the quote' do
    expect(JSON.parse(response.body)['title']).to eq('This is a test quote')
  end

  it 'returns a created status' do
    expect(response).to have_http_status(:created)
  end
end

