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
  has_one :profile, dependent: :destroy
  has_one :avatar, dependent: :destroy



  def avataor_image
    if profile&.avataor&.attached?
      profile.avator
    else
      'Ellipse.png'
    end
  end


  def prepare_avatar
    avatar || build_avatar
  end
  
end
