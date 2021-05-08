require 'rails_helper'

RSpec.describe Card, type: :model do
  let!(:user) { create(:user)}
  

  context 'テキストが入力されていたら' do
    let!(:card) { build(:card, user: user) }

    # before do
    #   card.imgs = fixture_file_upload('spec/fixtures/test.png')
    # end
    
    it '保存ができる' do
      expect(card).to be_valid
    end
  end

  context 'テキストが空文字の時' do
    let!(:card) { build(:card, content: "", user: user) }
    
    it '保存ができない' do
      expect(card).to_not be_valid 
    end
  end

  context 'テキスト1文字' do
    let!(:card) { build(:card, content: Faker::Lorem.characters(number: 1), user: user) }
    
    before do
      card.save
    end

    it '保存ができない' do
      expect(card).to_not be_valid 
    end
  end

end
