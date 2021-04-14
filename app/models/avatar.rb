# == Schema Information
#
# Table name: avatars
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_avatars_on_user_id  (user_id)
#
class Avatar < ApplicationRecord
  belongs_to :user
end
