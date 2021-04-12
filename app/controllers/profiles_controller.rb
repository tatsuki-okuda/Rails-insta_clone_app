class ProfilesController < ApplicationController

  def show
    # プロフィールがある時(アバターがデフォルトではなくて、保存されている時)にアバターの情報をとってくる。
    if(current_user.profile)
      profile = Profile.find(current_user)
      # avatar = profile.avatar
      render json: @profile
    end
    
  end

  def create
    
    # current_userに紐づくprofileの空箱を作る。データはavateだけ

    @profile = current_user.profile.build(profile_params)
    # @profile = current_user.build_profile(profile_params)
    
    @profile.save!
    render json: @profile
  end
  

  private
  def profile_params
    params.require(:profile).permit(:avatar)
    # params.permit(:avatar)
    # {profile: {avatar: 'aaaaa'}}
  end
  
  
end