from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.exc import IntegrityError
from datetime import datetime

db = SQLAlchemy()

class Swimmer(db.Model, SerializerMixin):
    __tablename__ = 'swimmers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    swimming_style = db.Column(db.String, nullable=False)
    best_lap = db.Column(db.Float(4), nullable=False)
    experience = db.Column(db.Float(2), nullable=False)
    password = db.Column(db.String, nullable=False)

    coach_id = db.Column(db.Integer, db.ForeignKey('coaches.id'))
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))

    coach = db.relationship("Coach", back_populates="swimmers")
    team = db.relationship('Team', back_populates='swimmers')

    serialize_rules = ('-coach.swimmers', '-team.swimmers',)    

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'swimming_style': self.swimming_style,
            'best_lap': self.best_lap,
            'experience': self.experience,
            'coach_id': self.coach_id,
            'team_id': self.team_id,
        }

class Coach(db.Model, SerializerMixin):
    __tablename__ = 'coaches'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    experience = db.Column(db.Float(2), nullable=False)
    expertise = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'), unique=True)
    training_session = db.relationship('TrainingSession', uselist=False, back_populates='coach')

    team = db.relationship('Team', back_populates='coach')
    swimmers = db.relationship("Swimmer", back_populates="coach")

    serialize_rules = ('-team.coaches', '-swimmers.coaches',) 

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'experience': self.experience,
            'expertise': self.expertise,
            'password': self.password,
            'team_id': self.team_id,
        }

class Team(db.Model, SerializerMixin):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    coach = db.relationship('Coach', back_populates='team', uselist=False)
    swimmers = db.relationship('Swimmer', back_populates='team', cascade='all, delete-orphan')
    training_session = db.relationship('TrainingSession', back_populates='team', uselist=False)
    event = db.relationship('Event', back_populates='team', uselist=False)

    serialize_rules = ('-training_session.teams', '-coach.teams', '-swimmers.teams', '-event.teams',) 

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
        }

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String(100), nullable=True)
    image_url = db.Column(db.String(200))  

    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'), nullable=False)

    team = db.relationship('Team', back_populates='event')

    serialize_rules = ('-team.events',)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'team_id': self.team_id,
            'image_url': self.image_url  
        }
class TrainingSession(db.Model, SerializerMixin):
    __tablename__ = 'training_sessions'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=True)
    time = db.Column(db.Time, nullable=True)
    description = db.Column(db.String(100), nullable=True)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    coach_id = db.Column(db.Integer, db.ForeignKey('coaches.id'), unique=True)

    coach = db.relationship('Coach', back_populates='training_session')
    team = db.relationship('Team', back_populates='training_session', uselist=False)

    serialize_rules = ('-team.training_sessions', '-coach.training_sessions',)

    def serialize(self):
        return {
            'id': self.id,
            'date': self.date.isoformat() if self.date else None,
            'time': self.time.isoformat() if self.time else None,
            'description': self.description,
            'team_id': self.team_id,
            'coach_id': self.coach_id,
        }

class EventRegistration(db.Model):
    __tablename__ = 'event_registrations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
   
    swimming_style = db.Column(db.String(100), nullable=True)
    terms_accepted = db.Column(db.Boolean, nullable=False)
   

    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    event = db.relationship('Event', backref=db.backref('registrations', lazy=True))

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'age': self.age,
            'swimming_style': self.swimming_style,
            
            # 'event_name': self.event_name,
            'terms_accepted': self.terms_accepted,
            # 'registration_date': self.registration_date.isoformat(),
            'event_id': self.event_id,

        }

# Utility functions for auto-allocating team_id and coach_id
def allocate_team():
    team = Team.query.first()
    if team is None:
        team = Team(name="Default Team")
        db.session.add(team)
        db.session.commit()
    return team.id

def allocate_coach():
    coach = Coach.query.first()
    if coach is None:
        team_id = allocate_team()
        coach = Coach(name="Default Coach", age=0, experience=0, expertise="Default", team_id=team_id)
        db.session.add(coach)
        db.session.commit()
    return coach.id
