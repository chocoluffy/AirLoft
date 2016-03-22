## Summery

- How to insert an common model instance into mongodb? I mean, since we can't generate the "_id" by ourselves, then how comes we insert such object into `mongo`? **Answer:** we need to know the difference between `db.missions.save` and `db.missions.insert`, using `save`, we can simple provide an model instance according to the model schma, while using using `insert`, we have to write the object exacty the same as the final document! 

- "GET" method implementation? **Answer:** using mongodb query like `findById` and others to get the document from db, and sometimes we need `id` to retrieve info from subdocument. Besides, `geoNear` is handy in mongodb to get displaying documents by distance.

- Some important places for error checking: 
  - If argument is in the `req.body` or `req.query` or `req.params`. **if not, return a message in `res` saying founding no argument in coming request.**
  - Then given an ID(probably), we may want to search that document in database using `getById()`, and the callback function contains an `error` object, which indicates whether or not searching database is succeeded or not. **If not, return a message saying object not found in database.**
  - When we tried to update of create a new document, we may usually use `save` and `create`, the callback function contains an error object either, **it indicates whether or not such instance can be created or updated correctly, if the error message appears, it usually dues to the fact that some fields violates the validation rules specified in database schema.**