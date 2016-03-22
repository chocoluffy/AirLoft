## Summery

- How to insert an common model instance into mongodb? I mean, since we can't generate the "_id" by ourselves, then how comes we insert such object into `mongo`? **Answer:** we need to know the difference between `db.missions.save` and `db.missions.insert`, using `save`, we can simple provide an model instance according to the model schma, while using using `insert`, we have to write the object exacty the same as the final document! 

- "GET" method implementation? **Answer:** using mongodb query like `findById` and others to get the document from db, and sometimes we need `id` to retrieve info from subdocument. Besides, `geoNear` is handy in mongodb to get displaying documents by distance.