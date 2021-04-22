module ApplicationHelper

  def default_meta_tags
    card =  Card.find(params[:id])
    if card.imgs.attached?
      {
        twitter: {
          card: card.content,
          site: current_user.username
        },
        image: {
          _:      card.imgs[0],
          width:  100,
          height: 100,
        }
      }
    else
      {
        twitter: {
          card: card.content,
          site: current_user.username
        }
      }
    end
    
  end
end
