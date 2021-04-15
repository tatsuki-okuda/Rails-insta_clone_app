class ProfilesController < ApplicationController

  def show
    @avatar = current_user.avatar
    # render "avatar", formats: :json, handlers: "jbuilder"   
  end


  def update
    if current_user.update_attributes(avatar_params)
      # redirect_to profile_path, notice: '更新できました'
      render json: { a: 'aaaa' }
    else
      flash.now[:error] = '更新できませんでした'
      render :show
    end 
  end
  

  private
  def avatar_params
    params.permit(:avatar)
  end
  
end