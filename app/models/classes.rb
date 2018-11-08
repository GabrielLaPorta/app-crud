class Classes < ActiveRecord::Base
    self.table_name = 'Classes'
    self.primary_key = 'id'
    connection = ActiveRecord::Base.connection

    def self.index_with_clients
        classes_with_clients = []

        classes = connection.exec_query(
            "SELECT
                CLT.id AS client_id,
                CLT.name,
                CLT.email,
                CLT.age,
                CLS.name_class,
                CLS.description,
                CLS.id AS class_id
            FROM Classes AS CLS
            LEFT JOIN Clients_Classes AS CC
                ON CLS.id = CC.class_id
            LEFT JOIN Clients AS CLT
                ON CC.client_id = CLT.id
            ORDER BY CLS.name_class"
        )

        classes.to_hash.each do |cls|
            index_class = classes_with_clients.index {|cl| cl[:id] == cls['class_id']}

            if index_class.nil?
                classes_with_clients.push({
                    id: cls['class_id'],
                    name: cls['name_class'],
                    description: cls['description'],
                    clients: [
                        {
                            id: cls['client_id'],
                            name: cls['name'],
                            email: cls['email'],
                            age: cls['age']
                        }
                    ]
                })
            else
                classes_with_clients[index_class][:clients].push(
                    {
                        id: cls['client_id'],
                        name: cls['name'],
                        email: cls['email'],
                        age: cls['age']
                    }
                )
            end
        end

        classes_with_clients
        
    end
end