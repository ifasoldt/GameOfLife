class GamesController < ApplicationController

  def index
    render_success(run_array_serializer(paginate(Game.order(id: 'desc'), per_page: 5), GameSerializer))
  end


  def show
    render_success(run_object_serializer(game, GameSerializer))
  end

  def new
  end

  def create
    # yuck, but see note on game_params method below.
    game.assign_attributes(initial_board: params[:initial_board], current_board: params[:current_board])
    if game.save
      render_success(run_object_serializer(game, GameSerializer))
    else
      render_validation_failed(game.errors.full_messages)
    end
  end

  def advance
    if game.advance!
      render_success(run_object_serializer(game, GameSerializer))
    else
      render_validation_failed(game.errors.full_messages)
    end
  end

  def reset
    if game.reset!
      render_success(run_object_serializer(game, GameSerializer))
    else
      render_validation_failed(game.errors.full_messages)
    end
  end

  private

  def game_params
    # this doesn't work, seems like my version of rails has a bug with strong params and multi-dimensional arrays.
    # https://github.com/rails/rails/issues/23640
    # params.require(:game).permit(initial_board: [], current_board: [])
  end

  def game
    @game ||= params[:game_id] || params[:id] ? Game.find(params[:game_id] || params[:id]) : Game.new
  end

end
