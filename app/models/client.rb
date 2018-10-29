class Client < ApplicationRecord
    has_many :addresses
    connection = ActiveRecord::Base.connection

    self.table_name = 'Clients'
    self.primary_key = 'id'

    def as_json(options = nil)
        serializable_hash(options)
    end

    def self.index_with_classes
        result = connection.exec_query(
            'SELECT CLT.id,
            CLT.name,
            CLT.email,
            CLT.age,
            CLS.name_class,
            CLS.description
            FROM Clients AS CLT
            INNER JOIN Clients_Classes AS CC ON CLT.id = CC.client_id
            INNER JOIN Classes AS CLS ON CC.class_id = CLS.id'
        )

        result.rows.each do |client|
            if client[1]
            end
        end
        return result

    end

    def self.show_with_classes(id)
        result = [];
        
        classes = connection.exec_query("SELECT CC.client_id, CC.class_id, CC.id FROM Clients_Classes AS CC WHERE CC.client_id = #{id}")

        id_classes = classes.rows.map {|row| row[1]}

        id_classes.each do |id_class|
            search = connection.exec_query("SELECT Cls.name_class, Cls.description FROM Classes AS Cls WHERE Cls.id = #{id_class}")
                result.push(search[0])
        end

        client = connection.exec_query("SELECT * FROM Clients AS CTS WHERE CTS.id = #{id}")

        return result.concat client

    end

    def self.create_class(name_class, description)
        connection.exec_query("INSERT INTO Classes VALUES ('#{name_class}', '#{description}')")
    end
end
