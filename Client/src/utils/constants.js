export const HOST = import.meta.env.VITE_SERVER_URL
console.log("HOST:", HOST); 
export const AUTH_ROUTES = `api/auth`;

export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`;


export const CONTACTS_ROUTE = `api/contacts`;
export const SEARCH_CONTACTS_ROUTE = `${CONTACTS_ROUTE}/search`;

export const MESSAGES_ROUTE=`api/messages`
export const GET_ALL_MESSAGES_ROUTE=`${MESSAGES_ROUTE}/get-messages`

