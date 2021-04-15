class AvatarsController < ApplicationController


  def update

    # @avatar = current_user.build_avatar
    # @avatar.assign_attributes(avatar_params)

    current_user.update_attributes(avatar_params)
    
    if current_user.update_attributes(avatar_params)

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