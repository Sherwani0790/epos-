import React, { useState } from 'react';
import { BreadCrumb } from "primereact/breadcrumb";
import { REPORTS } from '../../service/global';
import { useHistory } from 'react-router-dom';
import "./reports.scss"
import GlobalInputField from '../../ui-components/globalinputfield';
import { FilterMatchMode } from "primereact/api";

const Reports = () => {
    // Filter Global 
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const onGlobalFilterChange = (e) => {
        // const value = e.target.value;
        // let _filters = { ...filters };
        // _filters["global"].value = value;
        // setFilters(_filters);
        // setGlobalFilterValue(value);
        const value = e.target.value.toLowerCase(); // Convert search term to lowercase for case-insensitive search
        let _filters = { ...filters };
        _filters["global"].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const history = useHistory();

    const handleReportClick = (reportId) => {
        history.push(`/report-details/${reportId}`);
    };



    const items = [{ label: `Reports` }];
    const home = { icon: 'pi pi-home', to: '/api/report' };

    return (
        <>
            <div className="">
                <BreadCrumb model={items} home={home} />
            </div>

            <div className='reports-card'>

                <div className='grid'>
                    <div className="md:col-8"></div>
                    <div className="md:col-4 col-12">
                        <div className="equal_space inlineFlex">
                            <GlobalInputField
                                id="searchField"
                                name="searchField"
                                type="text"
                                placeholder="Search..."
                                className="input_position"
                                value={globalFilterValue}
                                onChange={onGlobalFilterChange}
                            />

                        </div>
                    </div>
                </div>

                <div className=''>
                    {REPORTS.category.map((category, index) => (
                        <React.Fragment key={index}>
                            <div className='grid'>
                                <div className='col-md-12'>
                                    <h5>{category}</h5>
                                </div>
                            </div>
                            <div className='grid mb-0'>
                                {REPORTS.data[category].filter(item => item.title.toLowerCase().includes(globalFilterValue)) 
                                    .map((item, itemIndex) => (
                                        <div key={itemIndex} className='col-12 md:col-4' onClick={() => handleReportClick(item.id)}>
                                            <div className='reports-card-style'>
                                                <div className='report-card-align'>
                                                    <div className='icon-style'>
                                                        {item.icon} {/* Render icon */}
                                                    </div>
                                                    <div>
                                                        {item.title} {/* Render title */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Reports;
