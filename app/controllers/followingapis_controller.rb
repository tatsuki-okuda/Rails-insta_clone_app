class FollowingapisController < ApplicationController

  def show
    user = User.find(params[:profile_id])
    followings = user.followings
    render json: followings
  end
  
end