# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  username               :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthabler
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  
  has_many :cards, dependent: :destroy
  has_one_attached :avatar, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  # 自分がフォローしている人との関連
  has_many :following_relationships, foreign_key: 'follower_id', class_name: 'Relationship', dependent: :destroy
  has_many :followings, through: :following_relationships, source: :following

  # フォロワーとの関連
  has_many :follower_relationships, foreign_key: 'following_id', class_name: 'Relationship', dependent: :destroy
  has_many :followers, through: :follower_relationships, source: :follower


  

  # ******************************
  # アバターメソッド
  # ******************************
  def avataor_image 
    if avatar.attached?
      avatar
    else
      'Ellipse.png'
    end
  end

  # ******************************
  # いいねメソッド
  # ******************************
  def has_liked?(card)
    likes.exists?(card_id: card.id)
  end

  # ******************************
  # フォローしているかどうかのチェック
  # ******************************
  def has_followed?(user_id)
    following_relationships.exists?(following_id: user_id)
  end
  
  # ******************************
  # フォローメソッド
  # ******************************
  # フォローを作る時はフォロする人のIDをfollowing_idとして保存する。
  # この時のfollower_idには自分のIDが入る。
  def follow!(user)
    user_id = get_user_id(user)
    following_relationships.create!(following_id: user_id);
  end

  # ******************************
  # アンフォローメソッド
  # ******************************
  def unfollow!(user)
    user_id = get_user_id(user)
    relation_record = following_relationships.find_by!(following_id: user_id)
    relation_record.destroy!
  end


  private
  def get_user_id(user)
    if user.is_a?(User)
      user.id
    else
      user
    end
  end
  


  
end
