export default function() {
  this.urlPrefix = 'http://localhost:4500';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'api';    // make this `api`, for example, if your API is namespaced
  this.timing = 150;
  this.get('/repositories', function (server, request) {
    return {
      data: server.db.repositories.map(function (repo) {
        return {
          _id: repo.id,
          type: 'repository',
          attributes: repo,
          relationships: {
            dependencies: {
              data: server.db.dependencies.map(function (dep) {
                return {
                  id: dep.id,
                  type: 'dependency'
                }
              })
            }
          }
        }
      }),
      type: 'repositories'
    }
  });
  this.get('/repositories/:id', function (server, request) {
    server.create('repository', {id: request.params.id})
    let el = server.db.repositories.toArray().find(e => e.id === request.params.id)
    return {
      data: {
        type: 'repository',
        _id: el.id,
        attributes: el
      }
    }
  })
  this.get('/dependencies')
  this.get('/dependencies/:id', {
    data: {
      _id: '0.0.1',
      version: 'test',
      type: 'dependency'
    }
  })

}
