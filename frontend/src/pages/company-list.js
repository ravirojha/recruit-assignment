import React, {useContext, useEffect, useState} from 'react';
import CompanyCard from "../components/molecules/CompanyCard";
import styled from 'styled-components';
import { Loader, Pagination } from 'semantic-ui-react';
import {AuthContext} from "../App";
import CompanyService from "../api-services/company-service";
import {toast} from "react-toastify";
import NoItemsFound from "../components/atoms/no-items-found";
import TableHeader from "../components/atoms/table-header";
import Logout from "../components/atoms/logout";
import AddCompany from "../components/atoms/addCompany";

function CompanyList(props) {
    const [page, setPage] = useState('1');
    const [pageCount, setPageCount] = useState('10');
    const [isNew, setIsNew] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [bit, setBit] = useState(false);
    const {user} = useContext(AuthContext);
    const [companyData, setCompanyData] = useState(null);

    const reload = () => {
        setIsLoading(true);
        setBit(!bit);
    }

    function change(updateParam, value) {
        if(updateParam === 'new') {
            setIsNew(value);
        } else if(updateParam === 'page') {
            setPage(value);
        } else if(updateParam === 'pageCount') {
            setPageCount(value);
        }
    }

    useEffect(() => {

        CompanyService.fetchCompanies({ page}, user)
            .then((res) => {
                setPageCount(res?.data.pageCount)
                setCompanyData(res?.data.companyData);
                if (page > res?.data.pageCount){

                    setPage(res?.data.pageCount);
                }
                setIsLoading(false)
            })
            .catch((error) => toast.error(error.response.data.message));

    }, [ page, bit]);


    return (
        isLoading ? <Loader active/> :
            <StyledComponent>
                <div className="company-page">
                    <AddCompany isNew={isNew} change={change}/>
                    {isNew && <CompanyCard companyItem={{name: '', website: '', phone: '', address: '', city: '', state: '', country: '', industry: ''}} isNew={isNew} change={change} reload={reload}/>}
                    <TableHeader/>
                    <div className="company-list">
                        {companyData.length > 0 ? (companyData?.map((company) => (
                            <CompanyCard key={company.id} isNew={false} companyItem={company} reload={reload} change={change}/>
                        ))) : <NoItemsFound /> }
                    </div>
                    {!isLoading ? (
                        <div className="pagination">
                            <Pagination
                                boundaryRange={0}
                                defaultActivePage={page}
                                ellipsisItem={null}
                                firstItem={null}
                                lastItem={null}
                                siblingRange={1}
                                totalPages={pageCount || 0}
                                onPageChange={(event, data) => {
                                    setPage(data.activePage);
                                    reload();
                                }}
                            />
                        </div>
                    ) : null}
                </div>
            </StyledComponent>
    );
}

export default CompanyList;

const StyledComponent = styled.div`
  .company-page {
    display: flex;
    flex-direction: column;
    width: 95%;
    padding-top: 6rem;
  }
  .company-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
  .header {
    display: flex;
    align-items: center;
  }
  .filter {
    margin-left: 20px;
    height: 2.2rem;
    width: 12rem;
    font-size: 1.2rem;
  }
  .pagination {
  margin: auto;
  }
`;