class Game < ApplicationRecord
  validates_presence_of :initial_board, :current_board
end
