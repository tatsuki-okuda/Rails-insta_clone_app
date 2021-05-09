require 'rails_helper'

RSpec.describe 'Api::Comments', type: :request do
  let!(:user) { create(:user)}
  let!(:card) { create(:card, user: user) }
  let!(:comment) { create_list(:comment, 3, card: card, user: user) }

  describe 'GET /comments' do
    it 'status 200' do
      get json_card_comments_path(card_id: card.id)
      
      expect(response).to have_http_status(200)
    end
  end

end
