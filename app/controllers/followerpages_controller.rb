class FollowerpagesController < ApplicationController


  def show
    @user = User.find(params[:profile_id])
  end
  
end