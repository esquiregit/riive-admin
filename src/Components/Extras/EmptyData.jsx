import React from 'react';
import PermScanWifiIcon from '@material-ui/icons/PermScanWifi';
import ReportOffOutlinedIcon from '@material-ui/icons/ReportOffOutlined';

function EmptyData({ error, type }) {
    return (
        <div className="empty-data">
            {
                error
                ?
                <>
                    <PermScanWifiIcon />
                    <span>
                        <strong>network error!</strong>
                        &nbsp;server unreachable
                    </span>
                </>
                :
                <>
                    <ReportOffOutlinedIcon />
                    <span>
                        <strong>No {type} Found!</strong>
                    </span>
                </>
            }
        </div>
    )
}

export default EmptyData;
