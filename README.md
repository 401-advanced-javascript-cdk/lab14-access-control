## Lab 14 - Access Control
Implements Access control through user roles and capabilities
### Author: Chris Kozlowski

### Links and Resources
* [Submission PR](https://github.com/401-advanced-javascript-cdk/lab13-bearer-authorization/pull/1)
* [Travis](https://travis-ci.com/401-advanced-javascript-cdk/lab13-bearer-authorization)
* [Heroku Deployment](https://lab13-bearer-auth.herokuapp.com/)

### Modules
#### `routes/routes.js`
Added routes for testing many RESTful verbs and specific user capabilities.
#### `auth/middleware.js`
Added capability check to `_authenticate` method.
#### `auth/users-model.js`
Now holds capabilities for the different roles, and assigns them as users are created, based on their role.  Also checks that a user has a capability before allowing access to a resource.

#### Operation
When a user signs up, they can assign themselves a role from the choices of `user`, `editor`, and `admin`.  If no role is selected, it will default to `user`.  There are several new routes that each require a different capability to access.  If a user with insufficient capabilities attempts to access them, they will receive a 403 Forbidden error, otherwise they will reach the endpoint.

#### Testing
`npm test`