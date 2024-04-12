# frozen_string_literal: true

class Api::V1::CompaniesController < ApplicationController
  # basic authentication to ensure only trusted users could get the access to the data
  # ideally for production code we'll use proper user management and JWT-based authentication
  # but I chose the http_basic auth to simply save the time (also admin/admin credentials should never be used too)
  http_basic_authenticate_with name: 'admin', password: 'admin'

  def index
    pagy, companies = pagy(
      Company.ransack(company_search_params).result
             .left_outer_joins(:deals)
             .select('companies.*, SUM(deals.amount) as deals_amount') # SUM is potential bottleneck here, a good candidate for caching since indexing won't help
             .order(created_at: :desc)
             .group('companies.id'),
      items: 10 # default to 10 companies per page, could be dynamic later
    )

    render json: {
      companies: companies.as_json,
      pagination: pagy_metadata(pagy, absolute: nil)
    }
  end

  private

  def company_search_params
    params.permit(
      :name_cont,
      :industry_cont,
      :brand_ids,
      :employee_count_gteq,
      :deals_amount_gteq
    )
  end
end
