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

export const getPotentialManagers = (services, token) => {
  const uri = `${services.personServiceBaseUrl}/v1/people`;
  const options = {
      method: 'get',
      Authorization: `Bearer ${ token.access_token }`,
  }

  return fetch(uri, options);
}

export const updateSelectedManagers = (services, token, id) => {
  const uri = `${services.personServiceBaseUrl }/v1/people/${id}`;
  const options = {
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${ token.access_token }`,
    },
    body: qs.stringify({IsTopLevelManager: true}),
  };
  return fetch( uri, options );
};

export const removeSelectedManagers = (services, token, id) => {
  const uri = `${services.personServiceBaseUrl }/v1/people/${id}`;
  const options = {
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${ token.access_token }`,
    },
    body: qs.stringify({IsTopLevelManager: false}),
  };
  return fetch( uri, options );
};

export const getTopLevelManagers = (services, token) => {
  const uri = `${services.personServiceBaseUrl}/v1/people?filter=IsTopLevelManager`;
  const options = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${ token.access_token }`,
    }
  };
  return fetch(uri, options);
}