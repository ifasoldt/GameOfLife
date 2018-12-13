class AddStageToGame < ActiveRecord::Migration[5.0]
  def change
    add_column :games, :stage, :integer, default: 0
  end
end
