## My 100xDevs Journey :

Going 0-1 and uploading what i learned here. (Cohort 2)

## Things To Remember: (short notes)

### JWT : jsonwebtoken

Token which stores json object(imp) used on web, for authentication purposes.

3 methods: sign, decode, verify

1. jwt.sign(payload, secret, options)
   In options: algorithms,
   expiresIn: A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), eg: ('1h', '3d')

2. jwt.decode(token, secret): only used for decoding the payload value of token (doesn't verify it with secret key, not recommended)

3. jwt.verify(token, secret) : used for verifying the token with secret key you stored... (mostly used in middlewares for auth)
   err resolve: whenever using bearer, seperate the token then verify or it won't work(common mistake)

### Global Catch:

  // It's a one time function...
  // if something failed in webapp, which should not be exposed to the end user...
  // then this function's role will come in place,
  // which will handle errors for the user, and console the error in backend
  app.use(function (err, req, res, next) {
    console.log(err);
    errorCount++;
    res.status(600).json({
      message: "Something is up on our server",
      success: false,
    });
  });

## Mongo

### Things to Remember: 

  #### Create a Schema -> 
  const UserSchema = new mongoose.Schema({
    username: String,
  }); 

  #### Create a table using Schema -> 
  export const User = mongoose.model("User", UserSchema);

  #### How to connect the two tables -> 
  const UserSchema = new mongoose.Schema({
  username: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});
  // Array of Object Ids of Courses which are purchased

## React

### Things to Remember:

1. Reacts divided into 3 parts...

2. Any time a parent component re-renders... its children components will get re-rendered as well! (IMP) // Workaround: useMemo() Hook

3. a. Capitalized Names: React treats anything with a capitalized first letter as a custom component. For example, <CustomButton /> will be treated as a component that you’ve defined.

   b. Lowercase Names: React treats anything with a lowercase first letter as an HTML element. For example, <div> or <button> will be treated as standard HTML elements.


### Postgres connection link: 

How does it look like while accessing db through postgres: 
```bash
psql -U <username> -d <database> -h <host> -p <port>

```

Default One for every user:
```bash
psql -h localhost -p 5432 -U postgres -d postgres 
```

How to connect eg:
```bash
psql -U postgres -d posts
```

\l : list all dbs
\c <dbname> : log onto that db
\dt : List all tables
\d <tablename> : list that table's structure

## SSH into ec2 instance

```bash
  ssh -i <your-pem-key-path.pem> ubuntu@<instance-public-ip>
```