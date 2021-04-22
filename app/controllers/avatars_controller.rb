class AvatarsController < ApplicationController
  

  def show
    if current_user.avatar
      @avatar = current_user.avatar
      render "avatar", formats: :json, handlers: "jbuilder"
    else

    end
    
  end
  


  def update
    # current_user.update_attributes(avatar_params)
    
    if current_user.update_attributes(avatar_params)
      @avatar = current_user.avatar
      render "avatar", formats: :json, handlers: "jbuilder"
    else
      flash.now[:error] = '更新できませんでした'
      render :show
    end 
    # render json: @avatar
  end
  

  private
  def avatar_params
    params.permit(:avatar)
    # {avatar: {avatar: 'aaaaa'}}
  end
  
  
end