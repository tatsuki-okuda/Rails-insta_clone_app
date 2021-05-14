require 'rails_helper'

RSpec.describe 'Api::Comments', type: :request do
  let!(:user) { create(:user)}
  let!(:card) { create(:card, user: user) }
  let!(:comment) { create_list(:comment, 3, card: card, user: user) }

  describe 'GET /comments' do
    it 'status 200' do
      get json_card_comments_path(card_id: card.id)  
      
      # *****************************
      # status 500で返ってくる
      # *****************************
      expect(response).to have_http_status(200)

      body = JSON.parse(response.body)
      expect(body.length).to eq 3
      expect(body[0]['content']).to eq comments.first.content
      expect(body[1]['content']).to eq comments.second.content
      expect(body[2]['content']).to eq comments.third.content
    end
  end

  

end
