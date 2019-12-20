import fetch from 'isomorphic-fetch';
const qs = require('qs');

export const getCurrentUser = ( services, token ) => {
  const uri = `${ services.personServiceBaseUrl }/people/me`;
  const options = {
    method: 'get',
    headers: { Authorization: `Bearer ${ token.access_token }` }
  };
  return fetch(uri, options);
};

export const getPotentialManagers = (services, token, searchTerm) => {
  const $filter = encodeURIComponent(`ACL eq 'Admin.Groups.CanBeManager' and SearchText eq '${searchTerm}' and IsTopLevelManager eq false`);
  const uri = `${ services.personServiceBaseUrl }/people?$filter=${$filter}`;
  const options = {
      method: 'get',
      headers: { Authorization: `Bearer ${ token.access_token }` },
  }
  return fetch(uri, options);
}

export const updateSelectedManagers = (services, token, id) => {
  const uri = `${ services.personServiceBaseUrl }/people/${id}`;
  const options = {
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${ token.access_token }`,
    },
    body: qs.stringify({ IsTopLevelManager: true }),
  };
  return fetch( uri, options );
};

export const removeSelectedManagers = (services, token, id) => {
  const uri = `${ services.personServiceBaseUrl }/people/${id}`;
  const options = {
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${ token.access_token }`,
    },
    body: qs.stringify({ IsTopLevelManager: false }),
  };
  return fetch( uri, options );
};

export const getTopLevelManagers = (services, token) => {
  const $filter = encodeURIComponent('IsTopLevelManager eq true');
  const uri = `${ services.personServiceBaseUrl }/people?$filter=${$filter}`;
  const options = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${ token.access_token }`,
    }
  };
  return fetch(uri, options);
};

export const getHealthCheck = (services, token) => {
  const uri = `${ services.personServiceBaseUrl }/people/health-check-data`;
  const options = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${ token.access_token }`
    }
  };
  return fetch(uri, options);
};

export const getCircularRelationships = (services, token) => {
  const uri = `${ services.personServiceBaseUrl }/people/health-check-data/circular-relationships`;
  const options = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${ token.access_token }`
    }
  };
  return fetch(uri, options);
};

export const getNoManagers = (services, token) => {
  const uri = `${ services.personServiceBaseUrl }/people/health-check-data/no-manager`;
  const options = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${ token.access_token }`
    }
  };
  return fetch(uri, options);
};

export const getOwnManagers = (services, token) => {
  const uri = `${ services.personServiceBaseUrl }/people/health-check-data/own-manager`;
  const options = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${ token.access_token }`
    }
  };
  return fetch(uri, options);
};
