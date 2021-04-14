class AvatarsController < ApplicationController


  def update

    # @avatar = current_user.prepare_avatar
    @avatar = current_user.build_avatar
    @avatar.assign_attributes(avatar_params)

    
    @avatar.save!
    if @avatar.save
        render json: @avatar
    else
        flash.now[:error] = '更新できませんでした'
        render profile_path
    end 
    # render json: @avatar
  end
  

  private
  def avatar_params
    params.permit(:avatar)
    # {avatar: {avatar: 'aaaaa'}}
  end
  
  
end