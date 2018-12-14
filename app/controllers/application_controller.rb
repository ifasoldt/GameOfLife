class ApplicationController < ActionController::Base
  include Rails::Pagination

  def render_success(serialized_data = {}, errors = nil, success = nil)
    json = {
      date: Time.now.utc,
      status: 200,
      messages: {errors: errors, success: success},
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
