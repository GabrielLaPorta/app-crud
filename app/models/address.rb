class Address < ApplicationRecord
    belongs_to :client
    
    self.table_name = 'Addresses'
    self.primary_key = 'id' 
end