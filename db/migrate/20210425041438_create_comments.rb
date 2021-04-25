class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.references :card, null: false
      t.text :content
      t.timestamps
    end
  end
end
