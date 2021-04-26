class CommentsController < ApplicationController

  def index
    # @card = Card.find(params[:card_id])
    # @comments = @card.comments
    # @comment_and_user = {}
    # @a = []
    # @comments.each do |comment|
    #   @comment_and_user['content'] = comment.content
    #   @comment_and_user['name'] = User.find(comment.user_id).username
    #   @comment_and_user['url'] = url_for(User.find(comment.user_id).avatar)
    #   # @comment_and_user.push(User.find(comment.user_id).username)
    #   # @comment_and_user.push(url_for(User.find(comment.user_id).avatar))
    #   @a.push(@comment_and_user)
    # end
    
    # render json:  @comments.to_json(include: :user)
  end

  def json
    card = Card.find(params[:card_id])
    comments = card.comments;

    render json: comments, include: [ :user] 
  end
    
  
  def create
    comment = current_user.comments.build(comment_params)
    # @comment.card_id = params[:card_id]
    comment.save!
    render json: comment, include: [ :user] 
  end
  
  private
  def comment_params
      params.require(:comment).permit(:content, :card_id)
  end

end