class CardsController < ApplicationController

  def index
    # ログインしてない時はログイン画面に飛ばす
    redirect_to new_user_session_path unless user_signed_in?
    if(current_user)
      @cards = Card.all
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