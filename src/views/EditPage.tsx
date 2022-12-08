import React, {useCallback, useEffect, useState} from 'react';
import {UserInvolvedSectorsData} from "../models/UserInvolvedSectorsForm";
import {Util} from "../utils/Util";
import {SectorService} from "../services/SectorService";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {InvolvedSectors} from "../models/InvolvedSectors";
import {SectorInvolvedForm} from "../components/forms/SectorInvolvedForm";
import {Button} from "react-bootstrap";

export function EditPage(props: any) {

    const MySwal = withReactContent(Swal);
    const errorShowTime: number = 3000;
    const involvedSectorId = props["props"].id;

    const initialState: UserInvolvedSectorsData = {
        id: null,
        name: "",
        sectors: [],
        agreeToTerms: false,
    };

    // Data states
    const [formData, setFormData] = useState(initialState);
    const [sectors, setSectors] = useState<any>([]);
    const [selectedSectors, setSelectedSectors] = useState<any>([]);

    // Validations & Errors
    const [nameErrMsg, setNameErrMsg] = useState<string>('');
    const [sectorsErrMsg, setSectorsErrMsg] = useState<string>('');
    const [agreeTermsErrMsg, setAgreeTermsErrMsg] = useState<string>('');
    const [hasValidationErr, setHasValidationErr] = useState<boolean[]>([]);

    const fetchFormDataById = useCallback(async () => {
        if (involvedSectorId) {
            SectorService.getInvolvedSectorById(involvedSectorId).then(res => {
                if (res.success) {
                    setAddedSectorData(res.data);
                }
            });
        }
    }, []);

    useEffect(() => {
        fetchFormDataById().catch(console.error);
    }, [fetchFormDataById]);

    const initSectors = async () => {
        const {data} = await SectorService.getSectors();
        const dataList = data.map((sector: { value: any; title: any; }) => ({
            value: sector.value,
            label: sector.title,
        }));
        await setSectors(dataList);
        return dataList;
    }

    const fetchInitData = useCallback(async () => {
        await initSectors();
    }, []);

    useEffect(() => {
        fetchInitData().catch(console.error);
    }, [fetchInitData]);

    const setAddedSectorData = (involvedSectors: InvolvedSectors) => {
        const data: UserInvolvedSectorsData = {
            id: involvedSectors.id,
            name: involvedSectors.name,
            sectors: mapSectorsWithValues(JSON.parse(involvedSectors.sectors)),
            agreeToTerms: Number(involvedSectors.isAgreedToTerms),
        }
        setFormData(data);
        setSelectedSectors(data.sectors);
    }

    const mapSectorsWithValues = (arr: any[]) => {
        let sectorTitles = [];
        if (!sectors || sectors.length === 0) {
            initSectors().then(data => {
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        if (data[j].value === arr[i].toString()) {
                            sectorTitles.push({
                                value: data[j].value,
                                label: data[j].label,
                            });
                        }
                    }
                }
            });
        }
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < sectors.length; j++) {
                if (sectors[j].value === arr[i].toString()) {
                    sectorTitles.push({
                            value: sectors[j].value,
                            label: sectors[j].label,
                        });
                }
            }
        }
        return sectorTitles;
    }

    const submitHandler = (e: any) => {
        e.preventDefault();
        if (!formValidate(formData).includes(true)) {
            SectorService.addInvolvedSectors(formData).then(res => {
                if (res.success) {
                    setAddedSectorData(res.data);
                    MySwal.fire({
                        title: <p>{res.message}</p>,
                        icon: 'success',
                    });
                } else {
                    MySwal.fire({
                        title: <p>{res.message}</p>,
                        icon: 'error'
                    });
                }
            });
        } else {
            console.log('Failed: Please enter valid data :)');
        }
    }

    const mapSectors = () => {
        let sectorValues = selectedSectors.map((sector: { value: any; }) => sector.value);
        setFormData({...formData, sectors: sectorValues});
    }

    const handleSelect = (data: any) => setSelectedSectors(data);

    const handleCheckbox = (e: any) => setFormData({...formData, [e.target.name]: Number(e.target.checked)});

    const handleText = (e: any) => setFormData({...formData, [e.target.name]: Util.trimText(e.target.value)});

    const handleBlur = (e: any) => formValidate(formData);

    const formValidate = (user: any) => {
        mapSectors();
        setHasValidationErr([]);
        if (user.name === "") {
            setNameErrMsg('Name is a required field.');
            hasValidationErr.push(true);
            setTimeout(() => setNameErrMsg(''), errorShowTime);
        }
        if (user.sectors === "" || user.sectors.length <= 0) {
            setSectorsErrMsg('Sectors is a required field.');
            hasValidationErr.push(true);
            setTimeout(() => setSectorsErrMsg(''), errorShowTime);
        }
        if (!user.agreeToTerms) {
            setAgreeTermsErrMsg('Agree to Terms is a required field.');
            hasValidationErr.push(true);
            setTimeout(() => setAgreeTermsErrMsg(''), errorShowTime);
        }
        return hasValidationErr;
    }

    return (
        <>
            <div className="container p-md-5">
                <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light-indigo w-md-75">
                    <div className="card-header bg-transparent border-0 text-center">
                        <h3 className="text-uppercase">sectors of user involved</h3>
                        <p>Please enter your name and pick the Sectors you are currently involved in.</p>
                    </div>
                    <div className="card-body">
                        <SectorInvolvedForm
                            formData={formData}
                            submitHandler={submitHandler}
                            handleBlur={handleBlur}
                            nameErrMsg={nameErrMsg}
                            sectorsErrMsg={sectorsErrMsg}
                            agreeTermsErrMsg={agreeTermsErrMsg}
                            handleText={handleText}
                            handleSelect={handleSelect}
                            handleCheckbox={handleCheckbox}
                            sectors={sectors}
                            selectedSectors={selectedSectors}
                        />
                    </div>
                    <div className="card-footer bg-transparent rounded-2 mt-5">
                        <Button className="btn btn-secondary" onClick={(e) => window.location.reload()}>Home</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditPage;
