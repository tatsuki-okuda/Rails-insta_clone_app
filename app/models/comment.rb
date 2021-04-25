# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  content    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  card_id    :bigint           not null
#
# Indexes
#
#  index_comments_on_card_id  (card_id)
#
class Comment < ApplicationRecord

  belongs_to :card
  # validates :content, presence: true
end
