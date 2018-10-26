# class ClientsClasses < ApplicationRecord
    
#     connection = ActiveRecord::Base.connection
#         result = connection.execute "SELECT CLT.name, CLT.email, CLT.age, CLS.name, CLS.description FROM Clients AS CLT INNER JOIN Clients_Classes AS CC
#         ON CLT.id = CC.client_id
#         INNER JOIN Classes CLS ON CC.class_id = CLS.id"

#     # has_many :Clients

#     # self.table_name = 'Classes'
#     # self.table_id = 'id'

# end
