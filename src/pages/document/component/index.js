import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react'
import { BsFileEarmarkArrowDown } from 'react-icons/bs';

const ViewDocument = () => {
    const data = [
        {
            id: 1,
            fileName: "Josep",
            uploadDate: "10/12/2023",

        },
        {
            id: 2,
            fileName: "Josep",
            uploadDate: "20/02/2024",

        },
        {
            id: 2,
            fileName: "Josep Aloy",
            uploadDate: "20/03/2024",

        },
    ];
    const actionTemplate = (rowData) => {
        return (
            <>
                <Button
                    tooltip="Download File"
                    icon={<BsFileEarmarkArrowDown/>}
                    tooltipOptions={{ position: "top" }}
                    className="eye-icon-btn"

                    onClick={(e) => {
                        e.preventDefault();

                        // history.push("/api/clientdetails" + rowData.id)
                    }
                    } />
            </>
        );
    }
    return (
        <>

            <div className='grid'>
                <div className='md:col-12'>
                    <div className='card'>
                        <DataTable
                            filter
                            value={data}
                            responsiveLayout="scroll"
                            key="id"
                            rows={5}
                            emptyMessage="No record available."
                            paginator
                        >
                            <Column field="fileName" header="File Name"></Column>
                            <Column field="uploadDate" header="Upload Date"></Column>
                            <Column body={actionTemplate} header="Action"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ViewDocument
