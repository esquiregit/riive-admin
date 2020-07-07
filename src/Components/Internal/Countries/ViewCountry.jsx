import React, { useState } from 'react';
import EditCountry from './EditCountry';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { TableRow, TableCell, Button } from '@material-ui/core';

function ViewParent({ length, country, countryAction, closeExpandable }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const editCountry = () => {
        setShowEditModal(true);
    };
    const closeModal  = () => { setShowEditModal(false); };

    return (
        <>
            { showEditModal && <EditCountry
                country={country}
                closeModal={closeModal}
                closeExpandable={closeExpandable} />}
            <TableRow>
                <TableCell colSpan={length + 1}>
                    <div className="cell-options-button">
                            <Button
                                onClick={() => editCountry(country)}
                                variant="contained"
                                color="primary"
                                startIcon={<EditOutlinedIcon className="white" />}>
                                    Edit {country.country_name}
                            </Button>
                        {
                            country.status.toLowerCase() === 'active' &&
                            <Button
                                onClick={() => countryAction(country.id, 'Block')}
                                variant="contained"
                                color="secondary"
                                startIcon={<NotInterestedIcon className="white" />}>
                                    Block {country.country_name}
                            </Button>
                        }
                        {
                            country.status.toLowerCase() === 'inactive' &&
                            <Button
                                onClick={() => countryAction(country.id, 'Unblock')}
                                variant="contained"
                                className="success"
                                startIcon={<RefreshIcon className="white" />}>
                                    Unblock {country.country_name}
                            </Button>
                        }
                    </div>
                </TableCell>
            </TableRow>
        </>
    )
}

export default ViewParent;
