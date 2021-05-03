class UnfollowsController < ApplicationController
  before_action :authenticate_user!


  def create
    current_user.unfollow!(params[:profile_id]);
    render json: {status: 'unfollow'}
  end
  
end