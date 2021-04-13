class AvatarsController < ApplicationController


  def update
    
    
    @avatar = current_user.profile(avatar_params)

    
    @avatar.save!
    render json: @avatar
  end
  

  private
  def avatar_params
    params.require(:avatar).permit(:avatar)
    # {avatar: {avatar: 'aaaaa'}}
  end
  
  
end