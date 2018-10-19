class Address < ActiveRecord::Base
    self.table_name = 'Addresses'
    self.primary_key = 'id' 
end