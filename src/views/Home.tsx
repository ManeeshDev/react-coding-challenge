import React, {useState} from 'react';
import EditPage from "./EditPage";
import DetailsPage from "./DetailsPage";

export function Home(props: any) {

    const [showHomePage, setStateHomePage] = useState<boolean>(true);
    const [showEditPage, setStateEditPage] = useState<boolean>(false);
    const [showViewPage, setStateViewPage] = useState<boolean>(false);

    const handlePageView = (page: any) => {
        setStateHomePage(false);
        setStateEditPage(false);
        setStateViewPage(false);
        switch(page) {
            case "EditPage":
                return setStateEditPage(true);
            case "DetailsPage":
                return setStateViewPage(true);
            default:
                return setStateHomePage(true);
        }
    }

    return (
        <>
            {(() => {
                if (showHomePage) {
                    return (
                        <div className="container p-md-5">
                            <div
                                className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light-indigo">
                                <div className="card-header bg-transparent border-0 text-center"></div>
                                <div className="card-body">
                                    <div className="row d-md-flex justify-content-center">
                                        <div className="col-md-6 my-4 mx-2">
                                            <div className="card card-btn border-0 px-3 rounded-4 p-5 text-center"
                                                 onClick={(e) => handlePageView("EditPage")}>
                                                <h2>Add Sectors Involved</h2>
                                            </div>
                                        </div>
                                        <div className="col-md-6 my-4 mx-2">
                                            <div className="card card-btn border-0 px-3 rounded-4 p-5 text-center"
                                                 onClick={(e) => handlePageView("DetailsPage")}>
                                                <h2>View Involved Sectors</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                } else if (showEditPage) {
                    return ( <EditPage props={ {id: null} }/> )
                } else if (showViewPage) {
                    return ( <DetailsPage/> )
                }
            })()}
        </>
    )
}

export default Home;
