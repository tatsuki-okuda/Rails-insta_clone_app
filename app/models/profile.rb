# == Schema Information
#
# Table name: profiles
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_profiles_on_user_id  (user_id)
#
class Profile < ApplicationRecord
  belongs_to :user
  # profileにavatarという画像を設定できる
  has_one_attached :avatar

  def avatar_url
    # 紐づいている画像のURLを取得する
    avatar.attached? ? url_for(avatar) : nil
  end
end
