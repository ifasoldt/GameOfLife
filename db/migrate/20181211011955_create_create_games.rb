class CreateCreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.text :initial_board, array: true, default: []
      t.text :current_board, array: true, default: []


      t.timestamps null: false
    end
  end
end
