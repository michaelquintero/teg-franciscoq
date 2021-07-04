// middleware for doing role-based permissions
  module.exports = permit; 
    
  function permit (rolesPermitidos) {
    // return a middleware
    return (request, response, next) => {
      const { user } = request;
     
      if (user && rolesPermitidos.includes(user.role)) {
        next(); // role is allowed, so continue on the next middleware
      } else {
        return response.status(403).json({message: "Forbidden"}); // user is forbidden
      }
    }
  }
