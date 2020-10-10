# ldap2azure-frontend
ldap2azure-frontend is, as the name already suggests, a reference or example implementation for a frontend which can be used with my project [ldap2azure](https://github.com/BluemediaGER/ldap2azure).

The frontend allows easy administration and monitoring of the user synchronization of ldap2azure. It also allows you to easily resolve synchronization conflicts and manage API keys and users.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Use in production
Build the Vue.js project for production:
```
npm run build
```
Move the newly created "dist" folder into the same directory as the JAR file of ldap2azure. Then rename the folder to "web-frontend".  
If the web-feature is activated in the configuration file of ldap2azure, the frontend should be loaded automatically on startup.  
For more information see the documentation of [ldap2azure](https://github.com/BluemediaGER/ldap2azure).

## Built With
- [Vue.js](https://vuejs.org/) - Modern Front-End-Framework for JavaScript
- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js

## Contributors
- [Oliver Traber](https://github.com/BluemediaGER)  

## License
This project is licensed under the GNU General Public License v3.0 - see the [LICENSE.md](LICENSE.md) file for details