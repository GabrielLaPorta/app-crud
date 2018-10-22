class Client < ActiveRecord::Base
    self.table_name = 'Clients'
    self.primary_key = 'id'
end

