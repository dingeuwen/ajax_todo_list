class Todo < ActiveRecord::Base
  attr_accessible :completed, :deadline, :removed, :task
end
