require 'rails_helper'

RSpec.describe "Quotes", type: :request do
  describe "GET /api/v1/quotes" do
    it "works! (now write some real specs)" do
      get api_v1_quotes_path
      expect(response).to have_http_status(200)
    end
  end
end
