class FollowerapisController < ApplicationController

  def show
    user = User.find(params[:profile_id])
    followers = user.followers
    render json: followers
  end
  
  
end