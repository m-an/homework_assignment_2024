class Company < ApplicationRecord
  has_many :deals

  ransacker :deals_amount do
    Arel.sql("SELECT SUM(amount) FROM deals WHERE deals.company_id = company.id GROUP BY deals.company_id")
  end

  def self.ransackable_attributes(auth_object = nil)
    ["industry", "name", "employee_count"]
  end

  def self.ransackable_associations(auth_object = nil)
     ["deals"]
   end
end
