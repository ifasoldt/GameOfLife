class ApplicationController < ActionController::Base
  include Rails::Pagination

  rescue_from Exception do |exception|
    Rails.logger.error exception
    render_failure(400)
  end

  def render_success(serialized_data = {}, errors = nil)
    json = {
      date: Time.now.utc,
      status: 200,
      messages: {errors: errors},
      data: serialized_data
    }
    render json: json
  end

  def render_validation_failed(errors = nil)
    json = {
      date: Time.now.utc,
      status: 400,
      messages: {errors: errors}
    }
    render json: json
  end

  def render_failure(status, errors = ['Something went wrong'])
    json = {
      date: Time.now.utc,
      status: status,
      messages: {errors: errors}
    }
    render json: json
  end


  def run_object_serializer(object, each_serializer)
    ActiveModelSerializers::SerializableResource.new(
      object, { serializer: each_serializer }
    )
  end

  def run_array_serializer(relation, each_serializer)
    ActiveModelSerializers::SerializableResource.new(
      relation, { each_serializer: each_serializer }
    )
  end

end
