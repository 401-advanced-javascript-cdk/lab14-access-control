'use strict';

const User = require('./users-model.js');

module.exports = capability => {
  return (req, res, next) => {
    
    try {
      let [authType, authString] = req.headers.authorization.split(' ');
      
      switch( authType.toLowerCase() ) {
        case 'basic': 
          return _authBasic(authString);
        case 'bearer':
          return _authBearer(authString);
        default: 
          return _authError();
      }
    }
    catch(e) {
      res.status(403).send('Forbidden');
    }
    
    function _authBasic(str) {
      // str: am9objpqb2hubnk=
      let base64Buffer = Buffer.from(str, 'base64'); // <Buffer 01 02 ...>
      let bufferString = base64Buffer.toString();    // john:mysecret
      let [username, password] = bufferString.split(':'); // john='john'; mysecret='mysecret']
      let auth = {username,password}; // { username:'john', password:'mysecret' }
      
      return User.authenticateBasic(auth)
        .then(user => _authenticate(user) )
        .catch(next);
    }

    function _authBearer(token) {
      try {
        return User.authenticateToken(token)
          .then(user => _authenticate(user))
          .catch(console.error)
      }
      catch(e) {
        res.sendStatus(403);
      }
    }

    function _authenticate(user) {
      const check = !capability || user.checkCapability(capability);
      if(user && check) {
        req.user = user;
        req.token = user.generateToken();
        next();
      }
      else {
        _authError();
      }
    }
    
    function _authError() {
      next('Invalid User ID/Password');
    }
    
  }
  }