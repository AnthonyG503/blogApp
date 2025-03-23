# blogApp
blog app for class
BLOG app:

# database:
1. create a localhost connection in mysql, name it "blog_db"
2. Name is already present in the "application.properties" of the spring boot project/backend.
3. Start spring boot application, app should run in "http://localhost:8080"

# CRUD features:

# Using Postmant:

POST: "http://localhost:8080/blog/create"
PUT: "http://localhost:8080/blog/update/{id}"
DELETE: "http://localhost:8080/blog/delete/{id}"
GET: "http://localhost:8080/blog/all"

# Using Angular appilcation:

Start the Angular project using "ng serve"
1. Go to "http://localhost:4200"
2. Use the form to create (post) a new blog or expand the list to show (get) previous 
data to edit (update) or delete it.
