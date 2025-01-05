/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'Tenant Monthly Bill Generation' }
})

Route.post('/register', 'UsersController.register')
Route.post('/login', 'UsersController.login')

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'UsersController.getMultiple')
  }).prefix('user')

  Route.group(() => {
    Route.post('/', 'CustomersController.create')
    Route.get('/', 'CustomersController.getMultiple')
    Route.patch('/:id', 'CustomersController.update').where('id', Route.matchers.number())
    Route.delete('/:id', 'CustomersController.delete').where('id', Route.matchers.number())
  }).prefix('customer')

  Route.group(() => {
    Route.post('/', 'SitesController.create')
    Route.get('/', 'SitesController.getMultiple')
    Route.patch('/:id', 'SitesController.update').where('id', Route.matchers.number())
    Route.delete('/:id', 'SitesController.delete').where('id', Route.matchers.number())
  }).prefix('site')

  Route.group(() => {
    Route.post('/', 'TenantsController.create')
  }).prefix('tenant')
})
  .prefix('api/v1')
  .middleware('auth')
