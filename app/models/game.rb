class Game < ApplicationRecord
  validates_presence_of :initial_board, :current_board

  def advance!
    self.current_board = current_board.map.with_index do |row, row_index|
      row.map.with_index do |cell, cell_index|
        determine_new_cell_value(cell, row_index, cell_index)
      end
    end
    self.stage +=1
    save
  end

  def determine_new_cell_value(cell, row_index, cell_index)
    live_neighbors = 0
    dead_neighbors = 0

    # Could make all of these procs methods?
    # Advantage --smaller method size, ability to name them with question marks to indicate bool return value
    # Disadvantage -- have to pass around arguments all over the place, methods get spread out over the model file--feels a bit cluttering.

    # determination conditions
    overpopulated = -> { live_neighbors > 3 }
    underpopulated = -> { dead_neighbors > total_neighbors(cell_index, row_index) - 2 }
    two_live_neighbors_and_already_alive = -> { (live_neighbors == 2 && cell == "t") }
    two_live_neighbors_and_already_dead = -> { (live_neighbors == 2 && cell == "f") }
    # helper procs
    all_counted = -> { (live_neighbors + dead_neighbors) == total_neighbors(cell_index, row_index) }
    three_live_neighbors = -> { live_neighbors == 3 }


    catch :done do
      # iterate through all of the neighboring cells
      (-1..1).each do |row_adder|
       (-1..1).each do |cell_adder|
          next if (row_adder == 0) && (cell_adder == 0) # don't check self
          next unless current_board[row_index + row_adder] # if trying access row off the edge
          neighbor_value = current_board[row_index + row_adder][cell_index + cell_adder]
          if neighbor_value == "t"
            live_neighbors +=1
          else # accounts for nil (off the board) which we treat as dead for our purposes
            dead_neighbors +=1
          end
          # trying to leave early potentially for performance reasons
          throw :done, "f" if overpopulated.call || underpopulated.call || (all_counted.call && two_live_neighbors_and_already_dead.call)
          throw :done, "t" if (all_counted.call && (three_live_neighbors.call || two_live_neighbors_and_already_alive.call ))
        end
      end
    end
  end

  def total_neighbors(cell_index, row_index)
    on_edge = ->(index) { index == 0 || index == (current_board.length - 1) }
    if on_edge.call(cell_index) && on_edge.call(row_index)
      3
    elsif on_edge.call(cell_index) || on_edge.call(row_index)
      5
    else
      8
    end
  end

  def reset!
    self.current_board = initial_board
    self.stage = 0
    save
  end

end
