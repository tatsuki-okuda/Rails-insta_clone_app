FactoryBot.define do
  factory :card do
    content {Faker::Lorem.characters(number: 10)}

    # after(:build) do |card|
    #   card.imgs << FactoryBot.build(:imgs, card: card)
    # end  
    imgs { Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec/fixtures/test.png'))}
  end


  # factory :imgs do
  #   photo  { Rack::Test::UploadedFile.new(File.join(Rails.root, "spec/fixtures/test.png"), 'image/png') }
  # end  
end