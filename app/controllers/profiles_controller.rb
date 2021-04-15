class ProfilesController < ApplicationController

  def show
    # プロフィールがある時(アバターがデフォルトではなくて、保存されている時)にアバターの情報をとってくる。
    # if(current_user.profile)
    #   profile = Profile.find(current_user)
    #   # avatar = profile.avatar
    #   render json: @profile
    # end
    
  end
  
end