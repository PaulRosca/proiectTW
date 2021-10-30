export const getActivePage = (location) => {
    let isActive = {
      home: false,
      tags: false,
      ask: false,
      profile: false
    };
    const path = getFirstStringFromPath(location.pathname);
    isActive[path] = true;
    return isActive;
  };
  
  const getFirstStringFromPath = (path) => {
    let firstPath = path.substring(1); //remove first /
    if (firstPath === ``) return `home`;
    if (firstPath.indexOf(`/`) === -1) return firstPath;
    return firstPath.slice(0, firstPath.indexOf(`/`)); //in case of profile/:id remove the /:id
  };
  