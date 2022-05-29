# RESTful API on Koa JS, Node.js framework

**ROplant System where a user can;**
- sign up { bodyparam: email[str], name[str], password[str] } { post: /shop/signup }
- sign in { bodyparam: name[str], password[str] } { post: /shop/signin }
- update its location and email { bodyparam: email[str], city[str], address[str], longitude[float], latitude[float] } { post: /shop/update/profile }
- add pricing for its shop { bodyparam: litre[float], amount[int], description[str] } { post: /price/create }
- update pricing for its shop { bodyparam:  litre[float], amount[int], description[str] } { post: /price/update }
- delete pricing for its shop { bodyparam: id[str] } { post: /price/delete }
- view all shops  { get: /shop/all }
- view details of particular shop { queryparam: id[str] } { get: /shop/id }

_To run the project;_ 
- clone the repo
- run npm install in the root directory of the cloned directory(where package.json is)
- fill config.env file appropriately 
- fill config.json file appropriately
- then in the root directory of the clone directory(where app.js is) run 'npm run dev'
