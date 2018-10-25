class Client < ApplicationRecord
    has_many :addresses

    self.table_name = 'Clients'
    self.primary_key = 'id'

    def as_json(options = nil)
        serializable_hash(options)
    end
end

