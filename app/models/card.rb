# == Schema Information
#
# Table name: cards
#
#  id         :bigint           not null, primary key
#  content    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Card < ApplicationRecord
  belongs_to :user
  has_many_attached :imgs
end
