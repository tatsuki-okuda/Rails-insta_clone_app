class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :username,:avatar_url


  def avatar_url
    url_for(object.avatar) if object.avataor_image
  end
end
