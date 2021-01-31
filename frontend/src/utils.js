/**
 *  utility functions module for routing functionality
 */

/**
 * Method to get and analyze a Request URL and
 * find the url based on current path (document.location).
 * format the url as an array of string.
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

export const rerender = async(component) => {
  document.getElementById("main-container").innerHTML = await component.render();
  await component.after_render();
};