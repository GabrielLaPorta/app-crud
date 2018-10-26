class Client < ApplicationRecord
    has_many :addresses

    self.table_name = 'Clients'
    self.primary_key = 'id'

    def as_json(options = nil)
        serializable_hash(options)
    end

    def self.index_with_classes
        connection = ActiveRecord::Base.connection
        connection.exec_query(
            'SELECT CLT.name,
            CLT.email,
            CLT.age,
            CLS.name_class,
            CLS.description
            FROM Clients AS CLT
            INNER JOIN Clients_Classes AS CC ON CLT.id = CC.client_id
            INNER JOIN Classes AS CLS ON CC.class_id = CLS.id'
        )

    end

    def self.show_with_classes(id)
        connection = ActiveRecord::Base.connection
        connection.exec_query(
            'SELECT CC.client_id, CC.class_id, CC.id FROM Clients_Classes AS CC WHERE CC.client_id = ' + id
        )

    end
end

