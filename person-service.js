const { userGroups, person, validUserGroupCheck, currentUser, managersGroups } = require( '../mock-data' );

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

module.exports = {
  getUserGroups,
  getPersonById,
  checkUserGroup,
  getCurrentUser,
  getManagers,
  updateSelectedManagers,
  removeSelectedManagers,
};
