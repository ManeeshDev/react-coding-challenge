import React, {useCallback, useEffect, useState} from 'react';
import {SectorService} from "../services/SectorService";
import {UserInvolvedSectorsData} from "../models/UserInvolvedSectorsForm";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import EditPage from "./EditPage";
import Home from "./Home";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckSquare} from '@fortawesome/free-solid-svg-icons';

export function DetailsPage(props: any) {

    // Data states
    const [showViewPage, setStateViewPage] = useState<boolean>(true);
    const [showHomePage, setStateHomePage] = useState<boolean>(false);
    const [showEditPage, setStateEditPage] = useState<boolean>(false);
    const [involvedSectorData, setInvolvedSectorData] = useState<UserInvolvedSectorsData[]>();
    const [sectorsList, setSectorsList] = useState<any>([]);
    const [involvedSectorId, setInvolvedSectorId] = useState<string>('');

    const initSectors = async () => {
        const {data} = await SectorService.getSectors();
        const dataList = data.map((sector: { value: any; title: any; }) => ({
            value: sector.value,
            label: sector.title,
        }));
        await setSectorsList(dataList);
        return dataList;
    }

    const initInvolvedSectors = async () => {
        const {data} = await SectorService.getInvolvedSectors();
        const dataList: UserInvolvedSectorsData[] = data.map((
            involvedSector: {
                id: string, name: string, sectors: string, isAgreedToTerms: any,
            }) => ({
            id: involvedSector.id,
            name: involvedSector.name,
            sectors: mapSectorsWithValues(JSON.parse(involvedSector.sectors)),
            agreeToTerms: involvedSector.isAgreedToTerms,
        }));
        setInvolvedSectorData(dataList);
    }

    const mapSectorsWithValues = (arr: any[]) => {
        let sectorTitles: string[] = [];
        if (!sectorsList || sectorsList.length === 0) {
            initSectors().then(data => {
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        if (data[j].value === arr[i].toString()) {
                            sectorTitles.push(data[j].label);
                        }
                    }
                }
            });
        }
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < sectorsList.length; j++) {
                if (sectorsList[j].value === arr[i].toString()) {
                    sectorTitles.push(sectorsList[j].label);
                }
            }
        }
        return sectorTitles;
    }

    const fetchInitData = useCallback(async () => {
        await initSectors();
        await initInvolvedSectors();
    }, []);

    useEffect(() => {
        fetchInitData().catch(console.error);
    }, []);

    const handleCardClick = (id: string) => {
        if (id) {
            setInvolvedSectorId(id);
        }
        setStateHomePage(false);
        setStateViewPage(false);
        setStateEditPage(true);
    }

    return (
        <>
            {(() => {
                if (showViewPage) {
                    return (
                        <div className="container p-md-5">
                            <div
                                className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light-indigo w-md-75">
                                <div className="card-header bg-transparent border-0 text-center">
                                    <h3 className="text-uppercase">sectors of user involved</h3>
                                </div>
                                <div className="card-body">
                                    {(() => {
                                        return (
                                            involvedSectorData?.map((involvedSector, i) => {
                                                return (
                                                    <div
                                                        className="row mb-5 shadow-sm border-0 px-3 rounded-2 p-3 bg-light"
                                                        key={involvedSector.id}>
                                                        <div className="col-md-4">
                                                            <h5>Name:</h5>
                                                        </div>
                                                        <div className="col-md-8 text-secondary">
                                                            <Link onClick={(e) => handleCardClick(involvedSector.id!)}
                                                                  to={''}>
                                                                <h5>{involvedSector.name}</h5>
                                                            </Link>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <h5>Involved Sectors:</h5>
                                                        </div>
                                                        <div className="col-md-8 text-secondary">
                                                            <div className="my-1">
                                                                {involvedSector.sectors.map((value, i) => value + ", ")}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <h5>Agreed to Terms:</h5>
                                                        </div>
                                                        <div className="col-md-8 text-success">
                                                            {involvedSector.agreeToTerms ?
                                                                <span><FontAwesomeIcon icon={faCheckSquare} size="1x"/> Agreed</span> :
                                                                <h6 className="text-danger">Not Agreed to Terms</h6>}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    })()}
                                </div>
                                <div className="card-footer bg-transparent rounded-2 ">
                                    <Button className="btn btn-secondary"
                                            onClick={(e) => window.location.reload()}>Home</Button>
                                </div>
                            </div>
                        </div>
                    )
                } else if (showEditPage) {
                    return (<EditPage props={{id: involvedSectorId}}/>)
                } else if (showHomePage) {
                    return (<Home/>)
                }
            })()}
        </>
    )
}

export default DetailsPage;
