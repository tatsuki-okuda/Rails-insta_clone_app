class LikesController < ApplicationController
  before_action :authenticate_user!


  def show
    card = Card.find(params[:card_id])
    like_status = current_user.has_liked?(card)
    render json: { hasLiked: like_status}
  end
  

  def create
    card = Card.find(params[:card_id])
    card.likes.create!(user_id: current_user.id)
    # redirect_to request.referer
    render json: { status: 'ok' }
  end

  def destroy
    card = Card.find(params[:card_id])
    like = card.likes.find_by!(user_id: current_user.id)
    like.destroy!
    # redirect_to request.referer
    render json: { status: 'ok' }
  end
  
  
end