import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default () => {
  // List of fetched companies
  const [companies, setCompanies] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  // Table filters
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [minEmployee, setMinEmployee] = useState("");
  const [minimumDealAmount, setMinimumDealAmount] = useState("");

  // Error message
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch companies from API
  const fetchCompanies = (pageNumber = 1) => {
    const url = `/api/v1/companies?page=${pageNumber}&name_cont=${companyName}&industry_cont=${industry}&employee_count_gteq=${minEmployee}&deals_amount_gteq=${minimumDealAmount}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`HTTP error! Status: ${res.status}`);
      })
      .then((res) => {
        setCompanies(res.companies);
        setPageCount(res.pagination.pages);
      })
      .catch((error) => {
        setErrorMessage('Error fetching data:', error);
      });
  };

  // Fetch companies on page load
  useEffect(() => {
    fetchCompanies();
  }, []);

  const handlePageClick = (selectedPage) => {
    // + 1 is a dirty fix since react-paginate starts counting the pages from 0
    fetchCompanies(selectedPage.selected + 1);
  };

  return (
    <div className="vw-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Companies</h1>

          <label htmlFor="company-name">Company Name</label>
          <div className="input-group mb-3">
            <input type="text" className="form-control" id="company-name" value={companyName} onChange={e => setCompanyName(e.target.value)} />
          </div>

          <label htmlFor="industry">Industry</label>
          <div className="input-group mb-3">
            <input type="text" className="form-control" id="industry" value={industry} onChange={e => setIndustry(e.target.value)} />
          </div>

          <label htmlFor="min-employee">Minimum Employee Count</label>
          <div className="input-group mb-3">
            <input type="number" className="form-control" id="min-employee" value={minEmployee} onChange={e => setMinEmployee(e.target.value)} />
          </div>

          <label htmlFor="min-amount">Minimum Deal Amount</label>
          <div className="input-group mb-3">
            <input type="number" className="form-control" id="min-amount" value={minimumDealAmount} onChange={e => setMinimumDealAmount(e.target.value)} />
          </div>

          <button className="btn btn-primary" onClick={() => fetchCompanies()}>Search</button>

          {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Industry</th>
                <th scope="col">Employee Count</th>
                <th scope="col">Total Deal Amount</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td>{company.name}</td>
                  <td>{company.industry}</td>
                  <td>{company.employee_count}</td>
                  <td>{company.deals_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
          />
        </div>
      </div>
    </div>
  );
};
