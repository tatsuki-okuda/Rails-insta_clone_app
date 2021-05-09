require 'rails_helper'

RSpec.describe 'Cards', type: :request do

  let!(:user) { create(:user) }
  let!(:cards) { create_list(:card, 3, user: user) }

  describe 'GET /cards' do
    context 'ログインしている場合' do
      before do
        sign_in user
      end

      it 'ステータス200が返ってくる' do
        get cards_path
        expect(response).to have_http_status(200)
      end
    end
  end

  describe 'POST /cards' do
    context 'ログインしている場合' do
      before do
        sign_in user
      end

      it '投稿が保存される' do
        card_params = attributes_for(:card)
        # puts card_params
        post cards_path({card: card_params})
        expect(response).to have_http_status(302)
        expect(Card.last.content).to eq(card_params[:content])
        # expect(Card.last.imgs).to eq(card_params[:imgs])
      end
    end

    context 'ログインしていない場合' do
      it 'ログイン画面に遷移' do
        card_params = attributes_for(:card)
        post cards_path({card: card_params})
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end



end
