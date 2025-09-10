import moment from 'moment';
import React from 'react'
export default function ClientItem({heading, value, valueColor = 'text-color', template}) {

    return (
        <div className='col-12 px-5'>
            <div className='grid'>

                <div className='col-12 md:col-6'>
                    <h4 style={{ margin: '0' }} className='color-primary font-semibold'>
                        {heading}
                    </h4>
                </div>
                <div className='col-12 md:col-6'>
                    <h4 style={{ margin: '0' }} className={`${valueColor}`}>
                        {template ? template() : value}
                    </h4>
                </div>
                {/* <div>
          {timeElapsedTemplate}
        </div>
        <div>
        {trTemplate}
        </div> */}
            </div>

        </div >
    )
}