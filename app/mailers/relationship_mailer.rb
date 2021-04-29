class  RelationshipMailer < ApplicationMailer

  def new_comment(user,card)
    @user = user
    @card = card
    mail to: user.email, subject: '新いメンションがあります。'
  end
  
end