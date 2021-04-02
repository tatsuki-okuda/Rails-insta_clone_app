class CardsController < ApplicationController

  def index
    # ログインしてない時はログイン画面に飛ばす
    redirect_to new_user_session_path unless user_signed_in?
  end
  
end