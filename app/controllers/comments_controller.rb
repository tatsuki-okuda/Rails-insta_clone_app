class CommentsController < ApplicationController

  def index
    @card = Card.find(params[:card_id])
    @comments = @card.comments
    # render json: {coments: @comments , username: @card.user.username, userAvatorUrl: url_for(@card.user.avatar) }
  end

  # def show
  #   @card = Card.find(params[:card_id])
  #   @comments = @card.comments
  #   render json: {coments: @comments , username: @card.user.username, userAvatorUrl: url_for(@card.user.avatar) }
  # end
  

  
  
  def create
    @comment = current_user.comments.build(comment_params)
    # @comment.card_id = params[:card_id]
    @comment.save!
    render json: @comment
  end
  
  private
  def comment_params
      params.require(:comment).permit(:content, :card_id)
  end

end