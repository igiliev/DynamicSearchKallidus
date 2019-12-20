import React, { Component } from 'react'
import '../styles/managers-administration.css';
import { PropTypes } from 'prop-types';
import CTA from './cta';
import { handleGetErrors } from '../js/utilities';
import ScrollArea from 'react-scrollbar';
import BetaSectionBar from './beta-section-bar'
import LoadingSpinner from './loading-spinner';
import Highlighter from "react-highlight-words";
import ManagersWarningBlock from './managers-administration-warning-block';
import ManagerAdministrationWarningSummary from './manager-administration-warning-summary';
import {
    getPotentialManagers,
    updateSelectedManagers,
    getTopLevelManagers,
    removeSelectedManagers,
    getCircularRelationships,
    getNoManagers,
    getOwnManagers,
    getHealthCheck
} from '../js/person-services';

const DYNAMIC_FILTERING_TIMEOUT = 1000;

class ManagersAdministration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            managers: [],
            filteredManagers: [],
            selectedManager: [],
            storedManagers: [],
            toggleForm: false,
            toggleEdit: false,
            saveManagersOnSubmit: [],
            cancelActive: false,
        };
    }

    componentDidMount() {
        const { services, token } = this.context;
        getTopLevelManagers(services, token)
        .then( handleGetErrors )
        .then(data => ( this.setState({
            storedManagers: data.filter((value) => value.IsTopLevelManager)}) ));
    }

    handleChange = (e) => {
        if(this.timeout) {
            clearTimeout(this.timeout);
		};
        this.timeout = setTimeout(this.applyFilters, DYNAMIC_FILTERING_TIMEOUT);
        this.setState({ searchTerm: e.target.value, isSearchLoading: true });
	}

    applyFilters = () => {
        const { services, token } = this.context;
        const { searchTerm } = this.state;
        const setManagers = ( managers ) => {
            const normaliseManagerList = managers ? managers.map((manager) => { return { name: manager.GivenName + ' ' + manager.FamilyName, email: manager.PrimaryEmailAddress, id: manager.Id } }) : null;
            const filterManagers = normaliseManagerList.filter((val) => val.name.toLowerCase().includes(searchTerm.toLowerCase()));
            this.setState({
                isSearchLoading: false,
                filteredManagers: searchTerm.length ? filterManagers : [],
            });
        }

        getPotentialManagers(services, token, searchTerm)
            .then(handleGetErrors)
            .then(setManagers);
    }

    handleSelect = (data) => {
        const concatSelectedManagers = this.state.selectedManager.concat([data]);
        this.setState({
            selectedManager: concatSelectedManagers,
            filteredManagers: [],
            searchTerm: '',
        });
    }

    handleEdit = () => {
        this.setState(prevState => ({
            toggleEdit: !prevState.toggleEdit
          }));
    }

    clear = ({target}) => {
        const email = target.parentNode.dataset.id;
        this.setState({selectedManager: this.state.selectedManager.filter((item) => item.email !== email)});
    }

    clearStored = (id, email) => {
        const { services, token } = this.context;
        this.setState({storedManagers: this.state.storedManagers.filter((item) => item.PrimaryEmailAddress !== email)});
        removeSelectedManagers(services, token, id);
    }

    highlightSuggestion = (searchWords, textToHighlight) => (
        <Highlighter
            highlightClassName="highlighter"
            searchWords={ [ searchWords ] }
            autoEscape={ true }
            highlightStyle={ { fontWeight: 'bold', background: 'transparent' } }
            textToHighlight={ textToHighlight }
        />
    )

    handleCancel = () => {
        this.setState({cancelActive: true, toggleEdit: true});
        return this.state.saveManagersOnSubmit;
    }

    handleSubmit = (el) => {
        let selectedId;
        let selectedManagerNames = [];
        const { services, token, strings } = this.context;
        for(let manager of el) {
            selectedId = manager.id;
            selectedManagerNames.push({name: manager.name, email:manager.email});
            updateSelectedManagers(services, token, selectedId);
        };
        this.setState({saveManagersOnSubmit: selectedManagerNames, cancelActive: false});

        getHealthCheck(services, token)
            .then( handleGetErrors )
            .then(([{CircularRelationships, PeopleWithSelfAsManager, PeopleWithoutAManager}]) => {
                const getFullName = ({GivenName, FamilyName, UserName}) => `${GivenName} ${FamilyName} (${strings.USERNAME()}: ${UserName})`;
                const getFullNameAndTitle = ({ManagerGivenName, ManagerFamilyName, GroupTitle}) => `${ManagerGivenName} ${ManagerFamilyName} (${GroupTitle})`;
                const circularRelationshipsCount = CircularRelationships.Count;
                const peopleWithSelfAsManagerCount = PeopleWithSelfAsManager.Count;
                const peopleWithoutAManagerCount = PeopleWithoutAManager.Count;
                const issueCount = circularRelationshipsCount + peopleWithSelfAsManagerCount + peopleWithoutAManagerCount;
                const peopleWithoutAManager = PeopleWithoutAManager.Items.map(getFullName);
                const peopleWithSelfAsManager = PeopleWithSelfAsManager.Items.map(getFullName);
                const circularRelationshipItems = CircularRelationships.Items.map(getFullNameAndTitle);
                this.setState({
                    circularRelationshipsCount,
                    peopleWithSelfAsManagerCount,
                    peopleWithoutAManagerCount,
                    issueCount,
                    peopleWithoutAManager,
                    peopleWithSelfAsManager,
                    circularRelationshipItems,
                });
            });

        this.setState({toggleForm: true, toggleEdit: true});
    }

    render() {
        const { strings } = this.context;
        const {
            filteredManagers,
            selectedManager,
            circularRelationshipsCount,
            peopleWithSelfAsManagerCount,
            peopleWithoutAManagerCount,
            issueCount,
            peopleWithoutAManager,
            peopleWithSelfAsManager,
            circularRelationshipItems,
            toggleForm,
            searchTerm,
            storedManagers,
        } = this.state;
        const listUsers = (value, idx) => <li key={idx}><strong>{ value }</strong></li>;
        let selectedManagerName = [];
        let submitedManagers = [];
        let allManagersSelected;

        if(selectedManager.length) {
            selectedManager.filter((manager) => {
                return selectedManagerName.push(manager.name);
            });
        }
        if (filteredManagers.length > 0) {
            allManagersSelected = filteredManagers.length === selectedManager.length;
        }
        if (this.state.saveManagersOnSubmit !== undefined) {
            for (let singleManager of this.state.saveManagersOnSubmit) {
                submitedManagers.push(singleManager.name);
            }
        }

        return (
            <div className="managers-administration">
                <h3 className="managers-administration__managers">{strings.MANAGERS()}</h3>
                <h1 className="managers-administration__structure">{strings.ORGANISATION_STRUCTURE()}</h1>
                <BetaSectionBar />
                <section className="managers-administration__description">
                    <h2 className="managers-administration__description-heading">{strings.HIERARCHY_DATA_CHECK()}</h2>
                    <p className="managers-administration__description-msg">{strings.HIERARCHY_DATA_CHECK_TXT()}</p>
                    <p className="managers-administration__description-more-info" dangerouslySetInnerHTML={ {__html: strings.HIERARCHY_DATA_CHECK_MORE_INFO('#')} } />
                </section>
                { toggleForm ? null :
                <section className="managers-administration__form-container">
                    <form className="managers-administration__form">
                        <h3 className="managers-administration__form-heading">{strings.RUN_HIERARCHY_CHECK()}</h3>
                        <div className="managers-administration__form-icon" />
                        <p className="managers-administration__form-txt">{strings.DATA_HEALTH_CHECK()}</p>
                        <p className="managers-administration__form-submit-paragraph" htmlFor="managers-input">{strings.TOP_OF_ORGANISATION_HIERARCHY()}</p>
                        <div className={`managers-administration__form-input-container ${ this.state.toggleEdit ? "visually-hidden" : "shown" }`}>
                            <div className="managers-administration__form-preloader">
                                <label htmlFor="managers-search">
                                    <ul className="managers-administration__form-ul-list">
                                    { this.state.selectedManager.map(({name, email}, key) => (
                                        <li key={key} className="managers-administration__form-added-manager normal" data-id={email}>
                                            { name }
                                            <a className="clear-manager" onClick={this.clear}></a>
                                        </li>
                                    ))}
                                    { storedManagers.map(({FamilyName, GivenName, PrimaryEmailAddress, Id, IsTopLevelManager}, idx) => (
                                    JSON.parse(IsTopLevelManager) &&
                                    <li key={idx} data-id={ PrimaryEmailAddress } className="managers-administration__form-added-manager">
                                        { `${GivenName}  ${FamilyName}` } <a className="clear-manager" onClick={this.clearStored.bind(this, Id, PrimaryEmailAddress)}></a>
                                    </li>
                                    ))}
                                        <li className="managers-administration__form-input-container">
                                            <input
                                                className="managers-administration__form-list-input"
                                                type="text"
                                                id="managers-search"
                                                onChange={this.handleChange}
                                                value={searchTerm}
                                                placeholder={strings.START_TYPING_NAME()}
                                                />
                                        </li>
                                        { searchTerm.length > 0 && this.state.isSearchLoading ? <LoadingSpinner /> : null }
                                    </ul>
                                </label>
                            </div>
                        </div>
                        <div className="managers-administration__searchList-container">
                            { searchTerm &&
                                <div className="searchList">
                                    <ScrollArea
                                        speed={0.8}
                                        horizontal={false}
                                        minScrollSize={'500px'}
                                        vertical={true}>
                                        <ul className={"managers-administration__form-list"}>
                                            { this.state.filteredManagers.length > 0 ?
                                            <li className="managers-administration__form-first-item">
                                                <span className="managers-administration__search-suggestions">{strings.SEARCH_SUGGESTIONS()}</span>
                                            </li> : null }
                                         {
                                            filteredManagers.map((value, key) => (
                                            selectedManagerName.length === 0 ?
                                            <li key={key} onClick={this.handleSelect.bind(this, value)} data-value={value.email} className="managers-administration__form-list-item">
                                                <div className="managers-administration__form-list-userData">
                                                    { this.highlightSuggestion(searchTerm, value.name)}
                                                </div>
                                                <div className="managers-administration__form-list-userData">{ value.email }</div>
                                            </li> :
                                            selectedManagerName.includes(value.name) ? null :
                                            <li key={key} onClick={this.handleSelect.bind(this, value)} data-value={value.email} className="managers-administration__form-list-item">
                                                <div className="managers-administration__form-list-userData">
                                                    { this.highlightSuggestion(searchTerm, value.name)}
                                                </div>
                                                <div className="managers-administration__form-list-userData">{ value.email }</div>
                                            </li>
                                        ))}
                                        { searchTerm.length > 0 && filteredManagers.length === 0 && !this.state.isSearchLoading || allManagersSelected ? <li className="managers-administration__form-list-item">NO RESULT</li> : null }
                                    </ul>
                                    </ScrollArea>
                                </div>
                            }
                        </div>
                        <ManagersWarningBlock />
                        { !this.state.toggleEdit && issueCount && this.state.filteredManagers.length === 0 &&
                            <div className="managers-administration__edit-btns">
                                <CTA
                                    text={strings.SAVE()}
                                    className="cta"
                                    onClickCallback={this.handleSubmit.bind(this, this.state.selectedManager)}
                                />
                                <CTA
                                    text={strings.CANCEL()}
                                    className="cancel-cta"
                                    onClickCallback={this.handleCancel}
                                />
                            </div>
                        }
                        <div className="managers-administration__form-cta">
                            <CTA
                                text={strings.START_CHECK()}
                                onClickCallback={this.handleSubmit.bind(this, this.state.selectedManager)}
                            />
                        </div>
                    </form>
                </section>
                }
                { this.state.toggleForm && issueCount === 0 ?
                    <section className="managers-administration__cr-container">
                        <h2 className="managers-administration__cr-results">{strings.RESULTS()}</h2>
                        <div className="managers-administration__cr-org-lvl">
                            <strong><p className="managers-administration__circular-relationship-levels-detected">{strings.ORGANISATION_LEVELS_DETECTED()} </p></strong>
                            <span className="managers-administration__cr-org-lvl-number">6</span>
                        </div>
                        <hr className="horizontal-line" />
                        <div className={ `managers-administration__cr-hierarchy` }>
                            <div className="managers-administration__cr-hierarchy-people">
                                <strong className="managers-administration__circular-relationship-hierarchy-title">
                                    <p>{strings.PERSONS_TOP_LVL_HIEREARCHY()}</p>
                                </strong>
                                { this.state.toggleEdit ?
                                <div className="managers-administration__edit-container">
                                    <p className="managers-administration__circular-relationship-hierarchy-title">
                                    {   this.state.cancelActive ?
                                        <div>
                                            { submitedManagers.toString().replace(/,/g, ", ") }
                                        </div> :
                                        selectedManagerName.toString().replace(/,/g, ", ") || storedManagers.map(({FamilyName, GivenName}) => {
                                            return (`${GivenName} ${FamilyName}`);
                                        })
                                    }
                                    </p>
                                    <a className="managers-administration__cr-hierarchy-edit" onClick={this.handleEdit}>{strings.EDIT()}</a>
                                </div> : null
                                }
                            </div>
                            <a className="managers-administration__cr-hierarchy-edit" onClick={this.handleEdit}>{strings.EDIT()}</a>
                        </div>
                        {/* this should be moved to a separate component */}
                        {!this.state.toggleEdit ?
                            <form className="managers-administration__form">
                            <div className="managers-administration__form-input-container">
                                <div className="managers-administration__form-preloader">
                                    <label htmlFor="managers-search">
                                        <ul className="managers-administration__form-ul-list">
                                        { this.state.cancelActive ? this.state.saveManagersOnSubmit.map(({name, email}, key) => {
                                                return <li key={key} className="managers-administration__form-added-manager normal" data-id={email}>{name}</li>
                                            }) :
                                            this.state.selectedManager.map(({name, email}, key) => (
                                            <li key={key} className="managers-administration__form-added-manager normal" data-id={email}>
                                                { name }
                                                <a className="clear-manager" onClick={this.clear}></a>
                                            </li>
                                        ))}
                                        { this.state.storedManagers.map(({FamilyName, GivenName, PrimaryEmailAddress, Id, IsTopLevelManager}, idx) => (
                                        JSON.parse(IsTopLevelManager) &&
                                        <li key={idx} data-id={ PrimaryEmailAddress } className="managers-administration__form-added-manager">
                                            { `${GivenName}  ${FamilyName}` } <a className="clear-manager" onClick={this.clearStored.bind(this, Id, PrimaryEmailAddress)}></a>
                                        </li>
                                        ))}
                                            <li className="managers-administration__form-input-container">
                                                <input
                                                    className="managers-administration__form-list-input"
                                                    type="text"
                                                    id="managers-search"
                                                    onChange={this.handleChange}
                                                    value={searchTerm}
                                                    placeholder={strings.START_TYPING_NAME()}
                                                    />
                                            </li>
                                            { searchTerm.length > 0 && this.state.isSearchLoading ? <LoadingSpinner /> : null }
                                        </ul>
                                    </label>
                                </div>
                            </div>
                            <div className="managers-administration__searchList-container">
                                { searchTerm &&
                                    <div className="searchList">
                                        <ScrollArea
                                            speed={0.8}
                                            horizontal={false}
                                            minScrollSize={'500px'}
                                            vertical={true}>
                                            <ul className={"managers-administration__form-list"}>
                                                { this.state.filteredManagers.length > 0 ?
                                                <li className="managers-administration__form-first-item">
                                                    <span className="managers-administration__search-suggestions">{strings.SEARCH_SUGGESTIONS()}</span>
                                                </li> : null }
                                            {
                                                filteredManagers.map((value, key) => (
                                                selectedManagerName.length === 0 ?
                                                <li key={key} onClick={this.handleSelect.bind(this, value)} data-value={value.email} className="managers-administration__form-list-item">
                                                    <div className="managers-administration__form-list-userData">
                                                        { this.highlightSuggestion(searchTerm, value.name)}
                                                    </div>
                                                    <div className="managers-administration__form-list-userData">{ value.email }</div>
                                                </li> :
                                                selectedManagerName.includes(value.name) ? null :
                                                <li key={key} onClick={this.handleSelect.bind(this, value)} data-value={value.email} className="managers-administration__form-list-item">
                                                    <div className="managers-administration__form-list-userData">
                                                        { this.highlightSuggestion(searchTerm, value.name)}
                                                    </div>
                                                    <div className="managers-administration__form-list-userData">{ value.email }</div>
                                                </li>
                                            ))}
                                            { searchTerm.length > 0 && filteredManagers.length === 0 && !this.state.isSearchLoading || allManagersSelected ? <li className="managers-administration__form-list-item">NO RESULT</li> : null }
                                        </ul>
                                        </ScrollArea>
                                    </div>
                                }
                            </div>
                            <ManagersWarningBlock />
                            <div className="managers-administration__edit-btns">
                                <CTA
                                    text={strings.SAVE()}
                                    className="cta"
                                    onClickCallback={this.handleSubmit.bind(this, this.state.selectedManager)}
                                />
                                <CTA
                                    text={strings.CANCEL()}
                                    className="cancel-cta"
                                    onClickCallback={this.handleCancel}
                                />
                            </div>
                        </form> : null }
                        { this.state.toggleEdit && <ManagersWarningBlock /> }
                        <hr/>
                        <br />
                        <div className="managers-administration__noCr-no-issues">
                            <p>{strings.PRIMARY_DATA_HEALTHY()}</p>
                        </div>
                    </section> :

                    issueCount > 0 ?

                    <section className="managers-administration__cr-container">
                        <h2 className="managers-administration__cr-results">{strings.RESULTS()}</h2>
                        <div className="managers-administration__cr-org-lvl">
                            <strong><p className="managers-administration__circular-relationship-levels-detected">{strings.ORGANISATION_LEVELS_DETECTED()}</p></strong>
                            <span className="managers-administration__cr-org-lvl-number">6</span>
                        </div>
                        <hr className="horizontal-line" />
                        <div className="managers-administration__cr-hierarchy">
                            <strong className="managers-administration__circular-relationship-hierarchy-title">
                                <p>{strings.PERSONS_TOP_LVL_HIEREARCHY()}</p>
                            </strong>
                            { this.state.toggleEdit ?
                                <div className="managers-administration__edit-container">
                                <p className="managers-administration__circular-relationship-hierarchy-title">
                                    {   this.state.cancelActive ?
                                        <div>
                                            { submitedManagers.toString().replace(/,/g, ", ") }
                                        </div> :
                                        selectedManagerName.toString().replace(/,/g, ", ") || storedManagers.map(({FamilyName, GivenName}) => {
                                            return (`${GivenName} ${FamilyName}`);
                                        })
                                    }
                                </p>
                                <a className="managers-administration__cr-hierarchy-edit" onClick={this.handleEdit}>{strings.EDIT()}</a>
                            </div> : null }
                        </div>
                        {/* this should be moved to a separate component */}
                        {!this.state.toggleEdit ?
                            <form className="managers-administration__form">
                            <div className="managers-administration__form-input-container">
                                <div className="managers-administration__form-preloader">
                                    <label htmlFor="managers-search">
                                        <ul className="managers-administration__form-ul-list">
                                            { this.state.cancelActive ? this.state.saveManagersOnSubmit.map(({name, email}, key) => {
                                                return <li key={key} className="managers-administration__form-added-manager normal" data-id={email}>{name}</li>
                                            }) :
                                            this.state.selectedManager.map(({name, email}, key) => (
                                            <li key={key} className="managers-administration__form-added-manager normal" data-id={email}>
                                                { name }
                                                <a className="clear-manager" onClick={this.clear}></a>
                                            </li>
                                        ))}
                                        { this.state.storedManagers.map(({FamilyName, GivenName, PrimaryEmailAddress, Id, IsTopLevelManager}, idx) => (
                                        JSON.parse(IsTopLevelManager) &&
                                        <li key={idx} data-id={ PrimaryEmailAddress } className="managers-administration__form-added-manager">
                                            { `${GivenName}  ${FamilyName}` } <a className="clear-manager" onClick={this.clearStored.bind(this, Id, PrimaryEmailAddress)}></a>
                                        </li>
                                        ))}
                                            <li className="managers-administration__form-input-container">
                                                <input
                                                    className="managers-administration__form-list-input"
                                                    type="text"
                                                    id="managers-search"
                                                    onChange={this.handleChange}
                                                    value={searchTerm}
                                                    placeholder={strings.START_TYPING_NAME()}
                                                    />
                                            </li>
                                            { searchTerm.length > 0 && this.state.isSearchLoading ? <LoadingSpinner /> : null }
                                        </ul>
                                    </label>
                                </div>
                            </div>
                            <div className="managers-administration__searchList-container">
                                { searchTerm &&
                                    <div className="searchList">
                                        <ScrollArea
                                            speed={0.8}
                                            horizontal={false}
                                            minScrollSize={'500px'}
                                            vertical={true}>
                                            <ul className={"managers-administration__form-list"}>
                                                { this.state.filteredManagers.length > 0 ?
                                                <li className="managers-administration__form-first-item">
                                                    <span className="managers-administration__search-suggestions">{strings.SEARCH_SUGGESTIONS()}</span>
                                                </li> : null }
                                            {
                                                filteredManagers.map((value, key) => (
                                                selectedManagerName.length === 0 ?
                                                <li key={key} onClick={this.handleSelect.bind(this, value)} data-value={value.email} className="managers-administration__form-list-item">
                                                    <div className="managers-administration__form-list-userData">
                                                        { this.highlightSuggestion(searchTerm, value.name)}
                                                    </div>
                                                    <div className="managers-administration__form-list-userData">{ value.email }</div>
                                                </li> :
                                                selectedManagerName.includes(value.name) ? null :
                                                <li key={key} onClick={this.handleSelect.bind(this, value)} data-value={value.email} className="managers-administration__form-list-item">
                                                    <div className="managers-administration__form-list-userData">
                                                        { this.highlightSuggestion(searchTerm, value.name)}
                                                    </div>
                                                    <div className="managers-administration__form-list-userData">{ value.email }</div>
                                                </li>
                                            ))}
                                            { searchTerm.length > 0 && filteredManagers.length === 0 && !this.state.isSearchLoading || allManagersSelected ? <li className="managers-administration__form-list-item">NO RESULT</li> : null }
                                        </ul>
                                        </ScrollArea>
                                    </div>
                                }
                            </div>
                            <ManagersWarningBlock />
                            <div className="managers-administration__edit-btns">
                                <CTA
                                    text={strings.SAVE()}
                                    className="cta"
                                    onClickCallback={this.handleSubmit.bind(this, this.state.selectedManager)}
                                />
                                <CTA
                                    text={strings.CANCEL()}
                                    className="cancel-cta"
                                    onClickCallback={this.handleCancel}
                                />
                            </div>
                        </form> : null }
                        <hr className="horizontal-line" />
                        <div className={this.state.toggleEdit ? 'managers-administration__details-container' : 'top-space'}>
                            <ManagerAdministrationWarningSummary
                                className="managers-administration__cr-high-level-issue-block"
                                peopleCount={ circularRelationshipsCount }
                                singular={ strings.ONE_CIRCULAR_RELATIONSHIP }
                                plural={ strings.N_CIRCULAR_RELATIONSHIPS }
                                getDocument={ getCircularRelationships }
                                documentName={ strings.CIRCULAR_RELATIONSHIP_FILE_NAME() }
                            >
                                <>
                                    <p><strong>{ `${circularRelationshipItems.join(', ')}.` }</strong></p>
                                    <p>{strings.SYSTEM_UNABLE_TO_CALCULATE()}</p>
                                </>
                            </ManagerAdministrationWarningSummary>
                            <ManagerAdministrationWarningSummary
                                className="managers-administration__cr-warning-block"
                                peopleCount={ peopleWithSelfAsManagerCount }
                                singular={ strings.WARNING_USER_AS_THEIR_OWN_MANAGER }
                                plural={ strings.WARNING_USERS_AS_THEIR_OWN_MANAGER }
                                getDocument={ getNoManagers }
                                documentName={ strings.OWN_MANAGER_FILE_NAME() }
                            >
                                <>
                                    <ul className="managers-administration__cr-warning-block-list">{ peopleWithSelfAsManager.map(listUsers) }</ul>
                                    <p>{strings.PLEASE_CORRECT_VIA_HR_FEED()}</p>
                                </>
                            </ManagerAdministrationWarningSummary>
                            <ManagerAdministrationWarningSummary
                                className="managers-administration__cr-warning-block"
                                peopleCount={ peopleWithoutAManagerCount }
                                singular={ strings.WARNING_USER_WITHOUT_MANAGER }
                                plural={ strings.WARNING_USERS_WITHOUT_MANAGER }
                                getDocument={ getOwnManagers }
                                documentName={ strings.NO_MANAGER_FILE_NAME() }
                            >
                                <>
                                    <ul className="managers-administration__cr-warning-block-list">{ peopleWithoutAManager.map(listUsers) }</ul>
                                    <p>{strings.PLEASE_CORRECT_VIA_HR_FEED()}</p>
                                </>
                            </ManagerAdministrationWarningSummary>
                        </div>
                    </section> : null }
            </div>
        )
    }
}

ManagersAdministration.contextTypes = {
    strings: PropTypes.object,
    services: PropTypes.object.isRequired,
    token: PropTypes.object.isRequired,
};

export default ManagersAdministration;