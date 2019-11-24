import React, { Component } from 'react'
import '../styles/managers-administration.css';
import { PropTypes } from 'prop-types';
import groupGnfrastructure from '../assets/svgs/icon-group-structure.svg';
import CTA from './cta';
import { handleGetErrors } from '../js/utilities';
import { getPotentialManagers, updateSelectedManagers, getTopLevelManagers, removeSelectedManagers } from '../js/person-services';
import ScrollArea from 'react-scrollbar';

class ManagersAdministration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '', //Dropdown switch
            managers: [],  //managers || data - rename it
            filteredData: [],
            selectedManager: [],
            storedManagers: [],
            loop: [],
        };
    }

    componentDidMount() {
        const { services, token } = this.context;
        getPotentialManagers(services, token)
        .then( handleGetErrors )
        .then( data => { this.setState({ managers: data }) }); //rename so it sounds better, try to filter it here

        getTopLevelManagers(services, token)
        .then( handleGetErrors )
        .then(data => ( this.setState({storedManagers: data.filter((val) => val.IsTopLevelManager)}) ));
    }

    handleChange = (e) => {
        const fetchData = this.state.managers
        ? this.state.managers.map((val) => { return {name: val.Name, email: val.Email, id: val.Id} })
        : null;

        const emailFilter = fetchData.filter((val) => val.name.includes(e.target.value) && val.email.includes(e.target.value));
        this.setState({
            inputValue: e.target.value,
            filteredData: e.target.value.length ? emailFilter : [],
        });
    }

    handleSelect = (data, ev) => {
        const joinedManagerName = this.state.selectedManager.concat([data]);
        this.setState({
            selectedManager: joinedManagerName,
            filteredData: [],
            inputValue: '',
        });
    }

    handleSubmit = (el) => {
        let selectedId;
        const { services, token } = this.context;
        for(let manager of el) {
            selectedId = manager.id;
            updateSelectedManagers(services, token, selectedId);
        }
    }

    clear = ({target}) => {
        const email = target.parentNode.dataset.id;
        this.setState({selectedManager: this.state.selectedManager.filter((item) => item.email !== email)});
    }

    clearStored = (id, email) => {
        const { services, token } = this.context;
        this.setState({storedManagers: this.state.storedManagers.filter((item) => item.Email !== email)});
        removeSelectedManagers(services, token, id)
    }

    render() {
        const { strings } = this.context;
        const getClickedName = this.state.selectedManager;
        const getFilteredData = this.state.filteredData;
        let loopClickedName = [];
        if(getClickedName.length) {
            for(let uno of getClickedName) {
                loopClickedName.push(uno.name);
            }
        }


        return (
            <div className="managers-administration">
                <h3 className="managers-administration__managers">{strings.MANAGERS()}</h3>
                <h1 className="managers-administration__structure">{strings.ORGANIZATION_STRUCTURE()}</h1>
                <div className="managers-administration__beta">
                    <span className="managers-administration__beta-label">{ strings.BETA() }</span>
                    <p className="managers-administration__beta-msg" dangerouslySetInnerHTML={ {__html: strings.THIS_SECTION_IS_NEW('product@kallidus.com')} }/>
                </div>
                <section className="managers-administration__description">
                    <h2 className="managers-administration__description-heading">{strings.HIERARCHY_DATA_CHECK()}</h2>
                    <p className="managers-administration__description-msg">{strings.HIERARCHY_DATA_CHECK_TXT()}</p>
                    <p className="managers-administration__description-more-info" dangerouslySetInnerHTML={ {__html: strings.HIERARCHY_DATA_CHECK_MORE_INFO('#')} } />
                </section>
                <div className="managers-administration__form">
                    <form>
                        <h3 className="managers-administration__form-heading">{strings.RUN_HIERARCHY_CHECK()}</h3>
                        <img src={groupGnfrastructure} className="managers-administration__form-icon" />
                        <p className="managers-administration__form-txt">{strings.GETTING_STARTED_MANAGER_NAME()}</p>
                        <p className="managers-administration__form-submit-paragraph" htmlFor="managers-input">{strings.TOP_LEVEL_MANAGER()}</p>
                        <div className="managers-administration__form-input-container">
                            <label htmlFor="managers-search">
                                <ul className="managers-administration__form-ul-list">
                                { this.state.selectedManager.map(({name, email}, key) => (
                                    <div>
                                        <li className="managers-administration__form-added-manager normal" data-id={email}>
                                            { name }
                                            <a className="clear" onClick={this.clear}>X</a>
                                        </li>
                                    </div>
                                ))}
                                { this.state.storedManagers.map(({Name, Email, Id, IsTopLevelManager}) => (
                                    JSON.parse(IsTopLevelManager) ?
                                    <li className="managers-administration__form-added-manager stored" data-id={Email}>
                                        { Name }
                                        <a className="clear" onClick={this.clearStored.bind(this, Id, Email)}>X</a>
                                </li>
                                : null
                                ))}
                                    <li>
                                        <input
                                            className="managers-administration__form-list-input"
                                            type="text"
                                            id="managers-search"
                                            onChange={this.handleChange}
                                            value={this.state.inputValue}
                                            />
                                    </li>
                                </ul>
                            </label>
                        </div>
                        <div>
                            { this.state.inputValue ?
                                <div className="searchList">
                                    <ScrollArea
                                        speed={0.8}
                                        horizontal={false}
                                        minScrollSize={'500px'}
                                        vertical={true}>
                                        <ul className={"managers-administration__form-list"}>
                                         { getFilteredData.map((value, key) => (
                                            loopClickedName.length === 0 ?
                                            <li key={key} onClick={this.handleSelect.bind(this, value)} data-value={value.name} className="managers-administration__form-list-item">
                                                <div className="managers-administration__form-list-userData">{ value.name }</div>
                                                <div className="managers-administration__form-list-userData">{ value.email }</div>
                                            </li> :
                                            loopClickedName.includes(value.name) ? <li></li> :
                                                <li key={key} onClick={this.handleSelect.bind(this, value)} data-value={value.name} className="managers-administration__form-list-item">
                                                    <div className="managers-administration__form-list-userData">{ value.name }</div>
                                                    <div className="managers-administration__form-list-userData">{ value.email }</div>
                                                </li>
                                        ))}
                                        { !getFilteredData.length ? <li className="managers-administration__form-list-item">NO RESULTS</li> : null }
                                        </ul>
                                    </ScrollArea>
                                </div>
                                : null
                            }
                        </div>
                        <div className="managers-administration__form-cta">
                            <CTA
                                text={strings.START_CHECK()}
                                onClickCallback={this.handleSubmit.bind(this, this.state.selectedManager)}
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

ManagersAdministration.contextTypes = {
    strings: PropTypes.object,
    services: PropTypes.object.isRequired,
    token: PropTypes.object.isRequired
  };

export default ManagersAdministration;