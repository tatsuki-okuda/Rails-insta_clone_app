class LikesController < ApplicationController
  before_action :authenticate_user!

  def create
    card = Card.find(params[:card_id])
    card.likes.create!(user_id: current_user.id)
    redirect_to request.referer
  end

  def destroy
    card = Card.find(params[:card_id])
    like = card.likes.find_by!(user_id: current_user.id)
    like.destroy!
    redirect_to request.referer
  end
  
  
end