/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/**
 * Method to get and analyze a Request URL.
 * finds url based on current path (document.location).
 * format the url string an array of string.
 * @returns the resource, resource id, and action in specified array position.
 * ['', "resource", "id", "action"]
 * */
export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split('/');
  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};
