class ProfilesController < ApplicationController

  def show
    @user = User.find(params[:id])
    # 自分がプロフィールを見た時はプロフィールの編集にリダイレクトする
    if @user == current_user
      redirect_to profile_path
    end

    @profile = current_user.prepare_profile
    @profile.assign_attributes(profile_params)
    if @profile.save
        redirect_to profile_path, notice: 'プロフィール更新'
    else
        flash.now[:error] = '更新できませんでした'
        render :edit
    end  
  end


  private
  def profile_params
    params.request(:profile).permit(
      :avatar
    )
  end
  
  
end