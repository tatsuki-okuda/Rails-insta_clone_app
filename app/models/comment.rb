# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  content    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  card_id    :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_comments_on_card_id  (card_id)
#  index_comments_on_user_id  (user_id)
#
class Comment < ApplicationRecord

  belongs_to :user
  belongs_to :card
  # validates :content, presence: true


  after_create :send_email

  private

  def send_email
    # RelationshipMailer.new_comment(user,card).deliver_now
    RelationshipMailer.new_comment(user,card).deliver_later
  end
  
end
