class Deal < ApplicationRecord
  belongs_to :company

  def self.ransackable_attributes(auth_object = nil)
    ["amount", "company_id", "created_at", "id", "name", "status", "updated_at"]
  end
end
