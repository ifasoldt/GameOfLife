class GameSerializer < ActiveModel::Serializer
  attributes :id, :current_board, :stage

  def current_board
    object.current_board.map {|row| row.map {|cell| cell == "f" ? false : true}}
  end
end
