require 'rails_helper'

RSpec.describe 'Card', type: :system do
  let!(:user) { create(:user)}
  let!(:followings) { create(:user)}
  let!(:cards) { create_list(:card, 3, user: followings) }

  describe 'rootでフォローしているユーザーのいいねがついている投稿を表示される' do

    context 'ログインしていない場合' do
      it 'ログイン画面に遷移' do
        get root_path
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context 'ログインしている時' do
      before do
        sign_in user
      end

      context 'ユーザーをフォローしている時' do
        before do
          user.follow!(followings)
        end
  
        context 'いいねしている時' do
          before do
            cards.each do |card|
              card.likes.create!(user_id: user.id)
            end
          end
  
          it 'いいねがついている投稿を表示する' do
            visit root_path
            cards.each do |card|
              expect(page).to have_content(card.content)
              expect(page).to have_css('.text_first',text: card.content)
              expect(page).to have_content(card.user.username)
              expect(page).to have_css('.user_name', text: card.user.username)
            end
          end

          it '投稿詳細が表示される' do
            visit root_path
            card = cards.first
            # click_link(first(:css, '.index_link'))
            first(:css, '.index_link').click
            expect(page).to have_css('.user_name', text: card.user.username)
            expect(page).to have_css('.text_first',text: card.content)
          end
        end

        context 'いいねがない時' do
          it '記事がない' do
            visit root_path
            expect(page).to have_content(nil)
          end
        end
      end

      context 'フォローしていない時' do
        it '記事がない' do
          visit root_path
          expect(page).to have_content(nil)
        end
      end
    end
  end

  
end