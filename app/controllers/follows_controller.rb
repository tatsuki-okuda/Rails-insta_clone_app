class FollowsController < ApplicationController

  def show
    if current_user.has_followed?(params[:profile_id])
      render json: {status: 'follow'}
    else
      render json: {status: 'unfollow'}
    end
  end

  def create
    current_user.follow!(params[:profile_id]);
    render json: {status: 'follow'}
  end
  
end