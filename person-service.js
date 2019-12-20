const fs = require('fs');
const path = require('path');
const { userGroups, person, validUserGroupCheck, currentUser, managersGroups, healthCheck } = require( '../mock-data' );

const getUserGroups = ( req, res ) => {
  setTimeout( () => {
    res.json( userGroups );
  }, 1000 );
};

const getPersonById = ( req, res ) => {
  res.json( person );
};

const checkUserGroup = ( req, res ) => res.json( validUserGroupCheck );

const getCurrentUser = ( req, res ) => {
  res.json( currentUser );
};

const getManagers = (req, res) => {
  const managersToReturn = managersGroups[12345];
  res.json(managersToReturn);
}

const updateSelectedManagers = (req, res) => {
  const { userId } = req.params;
  const manager = managersGroups[12345].find(manager => manager.Id === userId);
  Object.assign(manager, req.body);
  res.json(manager);
};

const removeSelectedManagers = (req, res) => {
  const { userId } = req.params;
  const manager = managersGroups[12345].find(manager => manager.Id === userId);
  manager.IsTopLevelManager = false;
  res.json(manager);
};

const getHealthCheck = (req, res) => {
  const healthChecker = healthCheck[54321];
  res.json(healthChecker);
};

const getHealthCheckCsv = (req, res) => {  
  const csv = fs.readFileSync(path.join(__dirname, '/../assets/manager-administration.csv'));
  setTimeout(() => res.send(csv), 1000);
};

module.exports = {
  getUserGroups,
  getPersonById,
  checkUserGroup,
  getCurrentUser,
  getManagers,
  updateSelectedManagers,
  removeSelectedManagers,
  getHealthCheck,
  getHealthCheckCsv,
};
