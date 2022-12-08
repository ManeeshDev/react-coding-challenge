import React from 'react';
import Select from "react-select";
import {UserInvolvedSectorsData} from "../../models/UserInvolvedSectorsForm";

interface SectorInvolvedFormProps {
    formData: UserInvolvedSectorsData,
    submitHandler: (e: any) => void | undefined,
    handleBlur: (e: any) => boolean[] | undefined,
    nameErrMsg: string,
    sectorsErrMsg: string,
    agreeTermsErrMsg: string,
    handleText: (e: any) => void | undefined,
    handleSelect: (e: any) => void | undefined,
    handleCheckbox: (e: any) => void | undefined,
    sectors: any,
    selectedSectors: any,
}

export const SectorInvolvedForm: React.FC<SectorInvolvedFormProps> = ({
     formData, submitHandler, handleBlur, nameErrMsg, sectorsErrMsg,
     agreeTermsErrMsg, handleText, handleSelect, handleCheckbox, sectors, selectedSectors,
    }) => {

    return (
        <>
            <form action="/" encType="multipart/form-data" autoComplete="off"
                  onSubmit={(e) => submitHandler(e)}>
                <input type="hidden" name="added-sector-id" value={formData.id ? formData.id : ""}/>
                <div className="form-group mb-4">
                    <label className="mb-0">Name<span className="text-danger">*</span></label>
                    <input name="name" type="text"
                           className={"form-control " + (!!nameErrMsg ? "border-danger" : "")}
                           placeholder="Name" value={formData.name} onBlur={handleBlur}
                           onChange={handleText}/>
                    <small className="text-danger">{nameErrMsg}</small>
                </div>
                <div className="form-group mb-4">
                    <label className="mb-0">Sectors<span className="text-danger">*</span></label>
                    {/*<select id="sectorsSelect" name="sectors" multiple*/}
                    {/*        className={"form-control pl-6 arrow-3 h-px-48 w-100 font-size-4 " + (!!sectorsErrMsg ? "border-danger" : "")}*/}
                    {/*        value={formData.sectors} onChange={handleChange} onBlur={handleBlur}>*/}
                    {/*    <option value="0">Select Sector</option>*/}
                    {/*    {sectors.map(({value, title}, i) => <option key={i} value={value}>{title}</option>)}*/}
                    {/*</select>*/}
                    <Select
                        options={sectors} placeholder="Select Sector"
                        value={selectedSectors} onBlur={handleBlur}
                        onChange={(data: any) => handleSelect(data)}
                        isSearchable={true} isMulti
                    />
                    <small className="text-danger">{sectorsErrMsg}</small>
                </div>
                <div className="form-group mb-4">
                    <label>
                        <input name="agreeToTerms" type="checkbox"
                               onChange={handleCheckbox} onBlur={handleBlur}/>
                        &nbsp; Agree to terms<span className="text-danger">*</span>
                    </label>
                    <br/>
                    <small className="text-danger">{agreeTermsErrMsg}</small>
                </div>
                <p className="text-center mb-0">
                    <input type="submit" value="Save"
                           className="btn btn-primary btn-primary-indigo btn-lg w-100 text-uppercase"/>
                </p>
            </form>
        </>
    );
}
