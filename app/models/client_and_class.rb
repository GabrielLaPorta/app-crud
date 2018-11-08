class ClientAndClass < ApplicationRecord
    self.table_name = 'Clients_Classes'
    self.primary_key = 'id'

    def as_json(options = nil)
        serializable_hash(options)
    end

    connection = ActiveRecord::Base.connection

    def self.create_client_and_class(client_id, class_list)
        class_list.each do |class_id|
            connection.exec_query("INSERT INTO Clients_Classes (client_id, class_id) VALUES (#{client_id}, #{class_id})")  
        end
    end

    def self.delete_client_and_class(client_id)
        connection.exec_query("DELETE FROM Clients_Classes WHERE (client_id = #{client_id})")
    end

end