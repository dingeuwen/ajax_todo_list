class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :task
      t.boolean :completed
      t.date :deadline
      t.boolean :removed

      t.timestamps
    end
  end
end
