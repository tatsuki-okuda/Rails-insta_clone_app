class ProfilesController < ApplicationController

  def show
    # @user = User.find(current_user.id)
    # profile = Profile.find(current_user.id)
  end


  private
  def profile_params
    params.request(:profile).permit(
      :avatar
    )
  end
  
  
end