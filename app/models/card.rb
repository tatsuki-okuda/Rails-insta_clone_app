# == Schema Information
#
# Table name: cards
#
#  id         :bigint           not null, primary key
#  content    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_cards_on_user_id  (user_id)
#
class Card < ApplicationRecord
  belongs_to :user
  has_many_attached :imgs, dependent: :destroy
end
