# frozen_string_literal: true

class Client < ApplicationRecord
    has_many :addresses
    connection = ActiveRecord::Base.connection

    self.table_name = 'Clients'
    self.primary_key = 'id'

    def as_json(options = nil)
    serializable_hash(options)
    end

    def self.find_clients
        clients_with_classes = []

        clients = connection.exec_query(
            "SELECT
                CLT.id,
                CLT.name,
                CLT.email,
                CLT.age,
                CLS.name_class,
                CLS.description
            FROM Clients AS CLT
            LEFT JOIN Clients_Classes AS CC
                ON CLT.id = CC.client_id
            LEFT JOIN Classes AS CLS
                ON CC.class_id = CLS.id
            ORDER BY CLT.name"
        )

        clients.to_hash.each do |client|
            index_client = clients_with_classes.index {|cl| cl[:id] == client['id']}

            if index_client.nil?
                clients_with_classes.push({
                    id: client['id'],
                    name: client['name'],
                    email: client['email'],
                    age: client['age'],
                    classes: [
                        {
                            name: client['name_class'],
                            description: client['description']
                        }
                    ]
                })
            else
                clients_with_classes[index_client][:classes].push(
                    {
                        name: client['name_class'],
                        description: client['description']
                    }
                )
            end 
        end

        clients_with_classes

    end

    def self.find_by_id(client_id)
        classes = []
        addresses = []
        classes_id = []

        client = connection.exec_query(
            "SELECT
                CLT.id AS client_id,
                CLT.name,
                CLT.email,
                CLT.age,
                CLS.id AS class_id,
                CLS.name_class,
                CLS.description,
                ADR.id AS address_id,
                ADR.address,
                ADR.city,
                ADR.zip_code
            FROM Clients AS CLT
            LEFT JOIN Clients_Classes AS CC
                ON CLT.id = CC.client_id
            LEFT JOIN Classes AS CLS
                ON CC.class_id = CLS.id
            LEFT JOIN Addresses AS ADR
                ON ADR.client_id = CLT.id
            WHERE CLT.id = #{client_id}
            ORDER BY CLT.name"
        )

        client.to_hash.each do |item|
            has_address = addresses.detect do |address|
            address[:id] == item['address_id']
            end
            has_class_id = classes_id.include? item['class_id'].to_s
            has_classes = classes.detect do |cls|
                cls[:id] == item['class_id']
            end
            unless has_address
                addresses.push(
                    id: item['address_id'],
                    address: item['address'],
                    city: item['city'],
                    zip_code: item['zip_code']
                )
            end

            unless has_classes
                classes.push(
                    id: item['class_id'],
                    name: item['name_class'],
                    description: item['description']
                )
            end

            classes_id.push(item['class_id'].to_s) unless has_class_id
        end

        result = {
            id: client.to_hash[0]['client_id'],
            name: client.to_hash[0]['name'],
            email: client.to_hash[0]['email'],
            age: client.to_hash[0]['age'],
            classes: classes,
            classes_id: classes_id,
            addresses: addresses
        }

        result
    end
end
