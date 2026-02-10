const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'telanganayathri',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const addMovieToListRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddMovieToList', inputVars);
}
addMovieToListRef.operationName = 'AddMovieToList';
exports.addMovieToListRef = addMovieToListRef;

exports.addMovieToList = function addMovieToList(dcOrVars, vars) {
  return executeMutation(addMovieToListRef(dcOrVars, vars));
};

const getPublicMovieListsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPublicMovieLists');
}
getPublicMovieListsRef.operationName = 'GetPublicMovieLists';
exports.getPublicMovieListsRef = getPublicMovieListsRef;

exports.getPublicMovieLists = function getPublicMovieLists(dc) {
  return executeQuery(getPublicMovieListsRef(dc));
};

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const getMoviesByGenreRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMoviesByGenre', inputVars);
}
getMoviesByGenreRef.operationName = 'GetMoviesByGenre';
exports.getMoviesByGenreRef = getMoviesByGenreRef;

exports.getMoviesByGenre = function getMoviesByGenre(dcOrVars, vars) {
  return executeQuery(getMoviesByGenreRef(dcOrVars, vars));
};
