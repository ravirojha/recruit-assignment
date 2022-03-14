import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../App';

function TableHeader() {
    const {user, setUser} = useContext(AuthContext);
    return (
        <StyledComponent>
            <div className="table-header">
                <div className="header-content">
                    <span className="name alignment">Name</span>
                    <span className="website alignment">Website</span>
                    <span className="phone alignment">Phone</span>
                    <span className="address alignment">Address</span>
                    <span className="city alignment">City</span>
                    <span className="state alignment">State</span>
                    <span className="country alignment">Country</span>
                    <span className="ind alignment">Industry</span>
                </div>
            </div>
        </StyledComponent>
    );
}

export default TableHeader;

const StyledComponent = styled.div`
  .table-header {
    display: flex;
    flex: 1;
    width: 100%;
    margin: 1% 2%;
    justify-content: flex-start;
    align-items: center;
    font-weight: bold;
    font-size: 1.2rem;
    padding: 5px;
    height: 4rem;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }

  .header-content {
      width: 90%;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    column-gap: 1px;
    justify-items: stretch;
  }
 
  .alignment {
  text-align: center;
    white-space: nowrap;
  }
`;