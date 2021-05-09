class CardsController < ApplicationController
  before_action :authenticate_user!, only: [:index, :show, :new, :create,]
  
  def index
    # ログインしてない時はログイン画面に飛ばす
    redirect_to new_user_session_path unless user_signed_in?
    if(current_user)
      user_ids = current_user.followings.pluck(:id)
      # @cards = Card
      #           .where(updated_at: (Time.now - 24.hours)..Time.now)
      #           .where(user_id: user_ids).joins(:likes)
      #           .order(created_at: :desc)
      #           .limit(5)
      #           .uniq
      #           .sort {|a,b| b.likes.size <=> a.likes.size}

      @cards = Card
                .where(user_id: user_ids).joins(:likes)
                .order(created_at: :desc)
                .limit(5)
                .uniq
                .sort {|a,b| b.likes.size <=> a.likes.size}
    end
  end

  def show
    # ログインしてない時はログイン画面に飛ばす
    # redirect_to new_user_session_path unless user_signed_in?
    if(current_user)
      @card =  Card.find(params[:id])
    end
  end
  
  def  new
    @card = current_user.cards.build
  end

  def create
    @card = current_user.cards.build(card_params)

    if @card.save
        redirect_to root_path, notice: '保存できました'
    else
        flash.now[:error] = '保存に失敗しました'
        render :new
    end
  end
  
  
  private
  def card_params
    params.require(:card).permit(:content, imgs:[])
  end
end