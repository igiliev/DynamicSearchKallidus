import React from 'react';
import PropTypes from 'prop-types';

const ManagersWarningBlock = ( props, { strings }) => {

    return (
        <section className="managers-administration__info-container">
            <p className="managers-administration__info-container-paragraph">{strings.MANAGER_LIST_INFO()}</p>
        </section>
    )
}


ManagersWarningBlock.contextTypes = {
    strings: PropTypes.object,
  };

export default ManagersWarningBlock;