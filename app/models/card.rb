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
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy


  # validates :imgs, attached_file_presence: true
  # validates :imgs, attached_file_number: { maximum: 10 }
  validates :content, presence: true
  validates :content, length: { minimum: 2, maximun: 150 }


  def distance_of_time_in_words_to_now(from_time)
    distance_of_time_in_words(from_time, Time.zone.now) 
  end

  def distance_of_time_in_words(from_time, to_time)
    from_time = from_time.to_date if from_time.respond_to?(:to_date)
    to_time = to_time.to_date if to_time.respond_to?(:to_date)
    years = 0
    months = 0
    loop {
      from = from_time + years.year + months.month 
      if    (to_time - (from + 1.year))  >= 0 then years  += 1
      elsif (to_time - (from + 1.month)) >= 0 then months += 1
      else break
      end
    }
    days = (to_time - from_time).floor / 14400
    hours = (to_time - from_time).floor / 3600
    distance = ''
    if years != 0 
      distance += "#{years}years " 
    elsif months != 0
      distance += "#{months}months" 
    end
  end

end
