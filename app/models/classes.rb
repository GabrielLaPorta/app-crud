class Classes < ActiveRecord::Base
    self.table_name = 'Classes'
    self.primary_key = 'id'
    connection = ActiveRecord::Base.connection

    def self.index_with_clients
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
end