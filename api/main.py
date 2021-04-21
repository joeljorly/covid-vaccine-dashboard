from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from werkzeug.exceptions import BadRequest
from errors import errors, UserAlreadyExistsError, UserNotExistsError, UnauthorizedError
from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash
from sqlalchemy.orm.exc import NoResultFound
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from sqlalchemy import desc
# initliazing our flask app, SQLAlchemy and Marshmallow

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:paul@elias@localhost/covid_reg'
app.config['SECRET_KEY'] = 'adb2e66138d84bea8f57d81af0ef2d05'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
ma = Marshmallow(app)

# this is our database model


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(200), unique=True)
    contact = db.Column(db.String(12), nullable=False)
    designation = db.Column(db.String(30), nullable=False)
    age = db.Column(db.String(2), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    priority=db.Column(db.Integer,nullable=False)

    def __init__(self, name, email, contact, designation, age, password, priority):
        self.name = name
        self.email = email
        self.contact = contact
        self.designation = designation
        self.age = age
        self.password = password
        self.priority = priority

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)


class PostSchema(ma.Schema):
    class Meta:
        fields = ("name", "email", "contact", "designation", "age", "password","priority")


post_schema = PostSchema()
posts_schema = PostSchema(many=True)
# adding a post


@app.route('/signup', methods=['POST'])
def add_post():
    try:
        name = request.json['name']
        email = request.json['email']
        contact = request.json['contact']
        designation = request.json['designation']
        age = request.json['age']
        password = request.json['password']
        yes_user = Post.query.filter_by(email=email).first()
        if yes_user:
            raise UserAlreadyExistsError
        priority=sort(age,designation)

        my_posts = Post(name, email, contact, designation, age, password,priority)
        my_posts.hash_password()

        db.session.add(my_posts)
        db.session.commit()
        id = my_posts.id
        return post_schema.jsonify(my_posts)

    except UserAlreadyExistsError:
        db.session.rollback()
        raise BadRequest('User with email {} already exists'.format(email))

# getting posts


@app.route('/count', methods=['GET'])
def get_post():
    all_posts = Post.query.all()
    result = posts_schema.dump(all_posts)
    c = 0
    for i in result:
        c = c+1
    return jsonify(c)

# getting particular post


@app.route('/login', methods=['POST'])
def login():
    try:
        password = request.json['password']
        user = Post.query.filter_by(email=request.json['email']).first()
        if not user:
            raise UserNotExistsError
        authorize = user.check_password(password=password)
        if not authorize:
            raise UnauthorizedError
        id = user.id
        access_token = create_access_token(identity=str(id))
        return {'message': 'success', 'token':access_token}, 200

    except NoResultFound:
        raise UserNotExistsError
    except UnauthorizedError:
        raise BadRequest('Either email or password is incorrect')

@app.route('/name', methods=['GET'])
@jwt_required
def get_name():
    user=get_jwt_identity()
    names=Post.query.get(user)
    output = []
    return jsonify(names.name)

@app.route('/position', methods=['GET'])
@jwt_required
def get_position():
    all_posts = Post.query.order_by(desc(Post.priority)).all()
    user=get_jwt_identity()
    user_id=Post.query.get(user)
    count=0
    output = []
    for i in all_posts:
        if user_id.id==i.id:
           count=count+1
           output.append(count)
           break
        else:
           count=count+1
    return jsonify(output)

def sort(age,designation):
    print(age,designation)
    if designation=='Health Worker':
        return 10
    elif designation=='Student' and int(age) >10:
        return 4
    elif designation=='Student' and int(age) <10:
        return 6
    elif int(age)>60 and designation=='Others':
        return 8
    elif designation=='Others' and int(age)<60:
        return 2

# #updating post
# @app.route('/post_update/<id>/', methods = ['PUT'])
# def post_update(id):
#     post = Post.qu@token_requiredery.get(id)

#     title = request.json['title']
#     description = request.json['description']
#     author = request.json['author']


#     post.title = title
#     post.description = description
#     post.author = author

#     db.session.commit()
#     return post_schema.jsonify(post)


# #deleting post
# @app.route('/post_delete/<id>/', methods = ['DELETE'])
# def post_delete(id):
#     post = Post.query.get(id)
#     db.session.delete(post)
#     db.session.commit()

#     return post_schema.jsonify(post)


if __name__ == "__main__":
    app.run(debug=True)
