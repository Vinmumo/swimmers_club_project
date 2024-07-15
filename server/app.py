from flask import Flask, make_response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS, cross_origin
from models import db, Swimmer, Coach, Team, Event, TrainingSession, allocate_team, EventRegistration
from sqlalchemy.exc import IntegrityError
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes by default

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///swimmersClub.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db, render_as_batch=True)

# Function to allocate coach and team IDs
def allocate_coach_and_team():
    # Fetch coach and team with the smallest IDs
    coach = Coach.query.order_by(Coach.id).first()
    team = Team.query.order_by(Team.id).first()
    if coach and team:
        return coach.id, team.id
    else:
        return None, None

@app.route('/')
def home():
    return "<h1>Swim Club Management System</h1>"

@app.route('/swimmers', methods=['GET', 'POST', 'PATCH'])
@cross_origin()  
def swimmers():
    if request.method == 'GET':
        swimmers = Swimmer.query.all()
        return jsonify([swimmer.serialize() for swimmer in swimmers])

    elif request.method == 'POST':
        data = request.get_json()
        coach_id, team_id = allocate_coach_and_team()
        hashed_password = generate_password_hash(data['password'])
        new_swimmer = Swimmer(
            name=data['name'],
            age=data['age'],
            swimming_style=data['swimming_style'],
            best_lap=data['best_lap'],
            experience=data['experience'],
            password=hashed_password,
            coach_id=coach_id,
            team_id=team_id
        )
        db.session.add(new_swimmer)
        db.session.commit()
        return jsonify(new_swimmer.serialize()), 201

    elif request.method == 'PATCH':
        data = request.get_json()
        swimmer = Swimmer.query.get(data['id'])
        if not swimmer:
            return make_response(jsonify({'error': 'Swimmer not found'}), 404)
        
        if 'name' in data:
            swimmer.name = data['name']
        if 'age' in data:
            swimmer.age = data['age']
        if 'swimming_style' in data:
            swimmer.swimming_style = data['swimming_style']
        if 'best_lap' in data:
            swimmer.best_lap = data['best_lap']
        if 'experience' in data:
            swimmer.experience = data['experience']
        if 'coach_id' in data:
            swimmer.coach_id = data['coach_id']
        if 'team_id' in data:
            swimmer.team_id = data['team_id']

        db.session.commit()
        return jsonify(swimmer.serialize()), 200

@app.route('/swimmers/<int:id>', methods=['DELETE'])
@cross_origin()
def delete_swimmer(id):
    swimmer = Swimmer.query.get_or_404(id)
    db.session.delete(swimmer)
    db.session.commit()
    return '', 204

@app.route('/swimmers/login', methods=['POST'])
@cross_origin()
def swimmers_login():
    data = request.json
    fullname = data.get('name')
    password = data.get('password')

    print(f"Received login request for: {fullname}")

    swimmer = Swimmer.query.filter_by(name=fullname).first()
    if swimmer:
        print(f"Found swimmer: {swimmer.name}")
        if check_password_hash(swimmer.password, password):
            return jsonify({'message': 'Login successful'}), 200
        else:
            print("Password incorrect")
            return jsonify({'message': 'Wrong password or username'}), 401
    else:
        print("Swimmer not found")

    return jsonify({'message': 'Wrong password or username'}), 401

@app.route('/coaches', methods=['GET', 'POST', 'PATCH'])
@cross_origin()  
def coaches():
    if request.method == 'GET':
        coaches = Coach.query.all()
        return jsonify([coach.serialize() for coach in coaches])
    elif request.method == 'POST':
        data = request.get_json()
        hashed_password = generate_password_hash(data['password'])
        new_coach = Coach(
            name=data['name'],
            age=data['age'],
            experience=data['experience'],
            expertise=data['expertise'],
            password=hashed_password
        )
        db.session.add(new_coach)
        db.session.commit()
        return jsonify(new_coach.serialize()), 201
    
    elif request.method == 'PATCH':
        data = request.get_json()
        coach = Coach.query.get(data['id'])
        if not coach:
            return make_response(jsonify({'error': 'Coach not found'}), 404)
        
        if 'name' in data:
            coach.name = data['name']
        if 'age' in data:
            coach.age = data['age']
        if 'experience' in data:
            coach.experience = data['experience']
        if 'expertise' in data:
            coach.expertise = data['expertise']
        if 'team_id' in data:
            coach.team_id = data['team_id']

        db.session.commit()
        return jsonify(coach.serialize()), 200

@app.route('/coaches/<int:id>', methods=['DELETE'])
@cross_origin()
def delete_coach(id):
    coach = Coach.query.get_or_404(id)
    db.session.delete(coach)
    db.session.commit()
    return '', 204

@app.route('/coaches/login', methods=['POST'])
@cross_origin()
def login():
    data = request.json
    fullname = data.get('name')
    password = data.get('password')

    print(f"Received login request for: {fullname}")

    coach = Coach.query.filter_by(name=fullname).first()
    if coach:
        print(f"Found coach: {coach.name}")
        if check_password_hash(coach.password, password):
            return jsonify({'message': 'Login successful'}), 200
        else:
            print("Password incorrect")
            return jsonify({'message': 'Wrong password or username'}), 401
    else:
        print("Coach not found")

    return jsonify({'message': 'Wrong password or username'}), 401

@app.route('/teams', methods=['GET', 'POST'])
@cross_origin()  
def teams():
    if request.method == 'GET':
        teams = Team.query.all()
        return jsonify([team.serialize() for team in teams])

    elif request.method == 'POST':
        data = request.get_json()
        new_team = Team(name=data['name'])
        db.session.add(new_team)
        db.session.commit()
        return jsonify(new_team.serialize()), 201

@app.route('/teams/<int:id>', methods=['DELETE'])
@cross_origin()
def delete_team(id):
    team = Team.query.get_or_404(id)
    db.session.delete(team)
    db.session.commit()
    return '', 204

@app.route('/events', methods=['GET', 'POST'])
@cross_origin()  
def events():
    if request.method == 'GET':
        events = Event.query.all()
        return jsonify([event.serialize() for event in events])
    elif request.method == 'POST':
        data = request.get_json()
        try:
            team_id = data.get('team_id', allocate_team())
            new_event = Event(
                name=data['name'],
                description=data['description'],
                team_id=team_id
            )
            db.session.add(new_event)
            db.session.commit()
            return jsonify(new_event.serialize()), 201
        except IntegrityError:
            db.session.rollback()
            return jsonify({"error": "Data integrity error"}), 400

@app.route('/events/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@cross_origin()  
def event_detail(id):
    try:
        event = Event.query.get_or_404(id)
        if request.method == 'GET':
            return jsonify(event.serialize())
        elif request.method == 'PUT':
            data = request.get_json()
            event.name = data.get('name', event.name)
            event.description = data.get('description', event.description)
            event.image_url = data.get('image_url', event.image_url) 
            db.session.commit()
            return jsonify(event.serialize())
        elif request.method == 'DELETE':
            db.session.delete(event)
            db.session.commit()
            return jsonify({"message": "Event deleted"}), 200
    except NoResultFound:
        return jsonify({"error": "Event not found"}), 404
    
@app.route('/events/<int:event_id>/register', methods=['POST'])
@cross_origin()
def register_for_event(event_id):
    data = request.get_json()
    try:
        new_registration = EventRegistration(
            name=data['name'],
            email=data['email'],
            age=data['age'],
            terms_accepted=data['termsAccepted'],  
            event_id=event_id
        )
        db.session.add(new_registration)
        db.session.commit()
        return jsonify(new_registration.serialize()), 201
    except KeyError:
        return jsonify({'error': 'Invalid data format'}), 400
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Data integrity error"}), 400
    

@app.route('/training_sessions', methods=['POST'])
@cross_origin()  
def create_training_session():
    data = request.get_json()
    try:
        # Convert date and time from string to Python objects
        session_date = datetime.strptime(data.get('date'), '%Y-%m-%d').date()
        session_time = datetime.strptime(data.get('time'), '%H:%M:%S').time()

        # Create new TrainingSession instance
        new_session = TrainingSession(
            date=session_date,
            time=session_time,
            description=data.get('description'),
            team_id=data.get('team_id'),
            coach_id=data.get('coach_id')
        )

        # Add and commit new session to the database
        db.session.add(new_session)
        db.session.commit()

        # Return the serialized new session as a JSON response
        return jsonify(new_session.serialize()), 201

    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"error": f"Data integrity error: {e}"}), 400
    except ValueError as e:
        return jsonify({"error": f"Value error: {e}"}), 400
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {e}"}), 500

# Read a single training session by ID
@app.route('/training_sessions/<int:id>', methods=['GET'])
@cross_origin()  
def get_training_session(id):
    session = TrainingSession.query.get_or_404(id)
    return jsonify(session.serialize())

# Read all training sessions
@app.route('/training_sessions', methods=['GET'])
@cross_origin()  
def get_training_sessions():
    sessions = TrainingSession.query.all()
    return jsonify([session.serialize() for session in sessions])

# Update a training session by ID
@app.route('/training_sessions/<int:id>', methods=['PUT'])
@cross_origin()  
def update_training_session(id):
    session = TrainingSession.query.get_or_404(id)
    data = request.get_json()
    try:
        # Update session details with provided data
        if 'date' in data:
            session.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        if 'time' in data:
            session.time = datetime.strptime(data['time'], '%H:%M:%S').time()
        if 'description' in data:
            session.description = data['description']
        if 'team_id' in data:
            session.team_id = data['team_id']
        if 'coach_id' in data:
            session.coach_id = data['coach_id']

        db.session.commit()
        return jsonify(session.serialize())
    except ValueError as e:
        return jsonify({"error": f"Value error: {e}"}), 400

# Delete a training session by ID
@app.route('/training_sessions/<int:id>', methods=['DELETE'])
@cross_origin()  
def delete_training_session(id):
    session = TrainingSession.query.get_or_404(id)
    db.session.delete(session)
    db.session.commit()
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
