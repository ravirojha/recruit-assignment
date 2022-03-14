import React, { useContext, useState } from 'react';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { AuthContext } from '../../App';
import CompanyService from "../../api-services/company-service";

export default function CompanyCard({ companyItem, isNew, change, reload }) {
    const [isEditing, setIsEditing] = useState(isNew);
    const [companyItemData, setCompanyItemData] = useState(companyItem);
    const {user, setUser} = useContext(AuthContext);


    const validateData = () => {
        if (companyItemData?.name.trim().length < 1)
            toast.error("Valid company name of atleast 1 char is required");
        else if ((!String(companyItemData?.website)
            .toLowerCase()
            .match("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")))
            toast.error("Enter valid website url");
        else if (companyItemData?.phone.trim().length < 10)
            toast.error("Enter Valid phone number");
        else if (companyItemData?.address.trim().length < 1)
            toast.error("Valid company address of atleast 1 char is required");
        else if (companyItemData?.city.trim().length < 1)
            toast.error("Valid city of atleast 1 char is required");
        else if (companyItemData?.state.trim().length < 1)
            toast.error("Valid state of atleast 1 char is required");
        else if (companyItemData?.industry.length < 1)
            toast.error("Select Industry");
        else return true;
    };



    function handleDelete(id) {
        CompanyService.deleteCompany(id, user).then((res) => {
            toast.success('Deleted Successfully!');
            reload();
        }).catch((e) => {
            let error = e.response.data.message;
            toast.error(error);
        })
    }



    function handleUpdate(id) {
        if(validateData()) {
            CompanyService.updateCompany(id, {...companyItemData}, user).then(res => {
                setIsEditing(!isEditing);
                toast.success("Updated Successfully");
                reload();
            }).catch((e) => {
                let error = e.response.data.message;
                toast.error(error)
            });
        }
    }


    function handleAdd() {
        if(validateData()) {
            CompanyService.createCompany({...companyItemData}, user).then(res => {
                change('new', !isNew);
                toast.success("Company Added");
                reload();
            }).catch((e) => {
                    let error = e.response.data.message;
                    toast.error(error)
                }
            )
        }
    }



    return (
        <StyledComponent>
            <div className="company-card">
                <div className="company-details">
                    {!isEditing ? (
                        <span className="name alignment"> {companyItemData.name}</span>
                    ) : (
                        <TextField
                            id="outlined-name"
                            value={companyItemData.name}
                            placeholder="Name of company"
                            type="string"
                            minLength="4"
                            required
                            onChange={(e) =>
                                setCompanyItemData({ ...companyItemData, name: e.target.value })
                            }
                        />
                    )}
                    {
                        !isEditing ? (
                            <span className="website alignment"> {companyItemData.website}</span>
                        ) : (
                            <TextField
                                id="outlined-name"
                                value={companyItemData.website}
                                placeholder="Website"
                                type="url"
                                onChange={(e) =>
                                    setCompanyItemData( prevValue => {
                                        return  {...prevValue, website: e.target.value}
                                    })
                                }
                            />
                        )}
                    {!isEditing ? (
                        <span className="phone alignment">{companyItemData.phone}</span>
                    ) : (
                        <TextField
                            id="outlined-name"
                            value={companyItemData.phone}
                            placeholder="Phone number"
                            type="tel"
                            required
                            onChange={(e) =>
                                setCompanyItemData({ ...companyItemData, phone: e.target.value })
                            }
                        />

                    )}
                    {
                        !isEditing ? (
                            <span className="address alignment"> {companyItemData.address}</span>
                        ) : (
                            <TextField
                                id="outlined-name"
                                value={companyItemData.address}
                                placeholder="Address"
                                type="string"
                                onChange={(e) =>
                                    setCompanyItemData( prevValue => {
                                        return  {...prevValue, address: e.target.value}
                                    })
                                }
                            />
                        )}
                    {
                        !isEditing ? (
                            <span className="city alignment"> {companyItemData.city}</span>
                        ) : (
                            <TextField
                                id="outlined-name"
                                value={companyItemData.city}
                                placeholder="City"
                                type="string"
                                onChange={(e) =>
                                    setCompanyItemData( prevValue => {
                                        return  {...prevValue, city: e.target.value}
                                    })
                                }
                            />
                        )}
                    {
                        !isEditing ? (
                            <span className="state alignment"> {companyItemData.state}</span>
                        ) : (
                            <TextField
                                id="outlined-name"
                                value={companyItemData.state}
                                placeholder="State"
                                type="string"
                                onChange={(e) =>
                                    setCompanyItemData( prevValue => {
                                        return  {...prevValue, state: e.target.value}
                                    })
                                }
                            />
                        )}
                    {
                        !isEditing ? (
                            <span className="country alignment"> {companyItemData.country}</span>
                        ) : (
                            <TextField
                                id="outlined-name"
                                value={companyItemData.country}
                                placeholder="Country"
                                type="string"
                                onChange={(e) =>
                                    setCompanyItemData( prevValue => {
                                        return  {...prevValue, country: e.target.value}
                                    })
                                }
                            />
                        )}
                    {
                        !isEditing ? (
                            <span className="ind alignment"> {companyItemData.industry}</span>
                        ) : (
                        <Select
                        id="industry"
                        value={companyItemData.industry}
                        label="Industry"
                        onChange={(e) =>
                        setCompanyItemData( prevValue => {
                            return  {...prevValue, industry: e.target.value}
                        })
                    }
                        >
                        <MenuItem value={'Account'}>Account</MenuItem>
                        <MenuItem value={'IT'}>IT</MenuItem>
                        <MenuItem value={'Sales'}>Sales</MenuItem>
                        <MenuItem value={'Health Care'}>Health Care</MenuItem>
                        </Select>
                        )}
                </div>

                {isEditing ? (
                    <i
    className={'fa fa-check edit-btn'}
    onClick={() => {
        if (isNew) {
            handleAdd();
        } else {
            handleUpdate(companyItemData.id)
        }
    }}
    />
                ) : (
                    <i
    className={'fa fa-edit edit-btn'}
    onClick={() => setIsEditing(!isEditing)}
    />
                )}

                {isEditing ? (
                    <i
    className={'fa fa-close  dlt-btn'}
    onClick={() => {
        setIsEditing(!isEditing);
        change('new', false);
        setCompanyItemData(companyItem);
    }}
    />
                ) : (
                    <i
    className={'fa fa-trash dlt-btn'}
    onClick={() => handleDelete(companyItemData.id)}
    />
                )}
            </div>
        </StyledComponent>
    );
}



const StyledComponent = styled.div`
  .company-card {
    display: flex;
    width: 100%;
    margin: 1% 2%;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
    height: 5rem;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }
  .company-details {
    width: 90%;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    column-gap: 1px;
    justify-items: stretch;
  }

  .date-picker {
    height: 40px;
    border-radius: 4px;
    border: 1px solid rgba(34, 36, 38, 0.15);
  }

  button {
    border-radius: 0.375rem;
    height: 1.5rem;
    width: auto;
    outline: transparent solid 2px;
    outline-offset: 2px;
    border: none;
    color: #fff;
    font-size: 0.7rem;
    font-weight: 600;
    padding: 3px 8px;
  }

  .edit-btn {
    margin-left: auto;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .dlt-btn {
    margin-left: 2%;
    margin-right: 2%;
    font-size: 1.5rem;
    color: red;
    cursor: pointer;
  }

  .alignment {
  text-align: center;
  }
`;