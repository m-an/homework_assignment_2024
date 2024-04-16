require 'rails_helper'

RSpec.describe Api::V1::CompaniesController, type: :controller do
  describe 'GET #index' do
    context 'when authenticated' do
      before do
        request.env['HTTP_AUTHORIZATION'] = ActionController::HttpAuthentication::Basic.encode_credentials(
          'admin',
          'admin'
        )
        FactoryBot.create_list(:company, 15)
      end

      it 'returns a success response' do
        get :index

        expect(response).to have_http_status(:success)
      end

      it 'returns paginated companies with pagination data' do
        get :index

        expect(JSON.parse(response.body)['companies'].length).to eq(10)
        expect(JSON.parse(response.body)['pagination']).not_to be_nil
      end
    end

    context 'when not authenticated' do
      it 'returns unauthorized' do
        get :index

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
