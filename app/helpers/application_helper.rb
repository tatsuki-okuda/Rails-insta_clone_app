module ApplicationHelper

  def default_meta_tags
    cards =  Card.all
    # cards.each do |card|
    #   if card.imgs&.attached?
    #     card.imgs.each do |img| 
    #       {
    #         twitter: {
    #           card: card.content,
    #           site: current_user.username
    #         },
    #         image: {
    #           _:      img,
    #           width:  100,
    #           height: 100,
    #         }
    #       }
    #     end
    #   elsif
    #     {
    #       twitter: {
    #         card: card.content,
    #         site: current_user.username
    #       }
    #     }
    #   end
    # end

    {
      twitter: {
        card: 'テスト',
        site: 'テスト'
      },
      image: {
        _:      'hoge',
        width:  100,
        height: 100,
      }
    }
 

  end
end
