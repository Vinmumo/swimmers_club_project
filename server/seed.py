from datetime import date, time
from app import app, db  # Adjust 'app' according to your Flask application structure
from models import Swimmer, Coach, Team, Event, TrainingSession
from random import choice
from werkzeug.security import generate_password_hash


app.app_context().push()
db.create_all()

def seed_data():
    # Seed Teams
    team1 = Team(name='Marines')
    team2 = Team(name='Alpha')
    team3 = Team(name='Bravo')
    team4 = Team(name='Charlie')
    team5 = Team(name='Delta')
    team6 = Team(name='Ravens')
    db.session.add_all([team1, team2, team3, team4, team5, team6])
    db.session.commit()

    # Seed Coaches with hashed passwords
    coach1 = Coach(name='Brian Koach', age=30, experience=5, expertise='Freestyle', password=generate_password_hash("password123"), team_id=team1.id)
    coach2 = Coach(name='Levis Tru', age=35, experience=8, expertise='Breaststroke', password=generate_password_hash("password123"), team_id=team2.id)
    coach3 = Coach(name='Mac Alister', age=40, experience=10, expertise='Backstroke', password=generate_password_hash("password123"), team_id=team3.id)
    coach4 = Coach(name='Jurgen Klopp', age=45, experience=12, expertise='Butterfly', password=generate_password_hash("password123"), team_id=team4.id)
    coach5 = Coach(name='Pep Guardiola', age=50, experience=15, expertise='Butterfly', password=generate_password_hash("password123"), team_id=team5.id)
    db.session.add_all([coach1, coach2, coach3, coach4, coach5])
    db.session.commit()

    # Seed Swimmers
    swimmer1 = Swimmer(name='John Doe', age=20, swimming_style='Freestyle', best_lap=50.2, experience=3.5,password=generate_password_hash("password123"), coach_id=coach1.id, team_id=team1.id)
    swimmer2 = Swimmer(name='Mary John', age=22, swimming_style='Breaststroke', best_lap=55.0, experience=4.0,password=generate_password_hash("password123"), coach_id=coach2.id, team_id=team2.id)
    swimmer3 = Swimmer(name='Ray Ray', age=24, swimming_style='Backstroke', best_lap=57.5, experience=5.0,password=generate_password_hash("password123"), coach_id=coach3.id, team_id=team3.id)
    swimmer4 = Swimmer(name='Collins Butch', age=26, swimming_style='Butterfly', best_lap=60.0, experience=6.0, password=generate_password_hash("password123"),coach_id=coach4.id, team_id=team4.id)
    swimmer5 = Swimmer(name='Pro Lific', age=28, swimming_style='Butterfly', best_lap=62.5, experience=7.0,password=generate_password_hash("password123"), coach_id=coach5.id, team_id=team5.id)
    swimmer6 = Swimmer(name='Eager Dave', age=28, swimming_style='Butterfly', best_lap=62.5, experience=7.0,password=generate_password_hash("password123"), coach_id=coach5.id, team_id=team5.id)
    db.session.add_all([swimmer1, swimmer2, swimmer3, swimmer4, swimmer5])
    db.session.commit()

    # Seed Training Sessions
    session1 = TrainingSession(date=date.today(), time=time(hour=10, minute=0), description='Morning Practice', team_id=team1.id, coach_id=coach1.id)
    session2 = TrainingSession(date=date.today(), time=time(hour=15, minute=0), description='Afternoon Practice', team_id=team2.id, coach_id=coach2.id)
    db.session.add_all([session1, session2])
    db.session.commit()

def seed_events():
    image_urls = [
    'https://c4.wallpaperflare.com/wallpaper/579/635/598/michael-phelps-swimmer-olympian-wallpaper-preview.jpg',
    'https://c0.wallpaperflare.com/preview/906/720/890/action-athlete-blue-diver.jpg',
    'https://c4.wallpaperflare.com/wallpaper/462/830/548/digital-digital-art-artwork-fantasy-art-photoshop-hd-wallpaper-preview.jpg',
    'https://wallpapercave.com/wp/wp2046152.jpg',
    'https://c1.wallpaperflare.com/preview/450/278/529/activity-beauty-blue-bright.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg_roCLqe01Ljy2i9vH5gY1Iz03FKcW_SBiSPctdKbEd02Kd-cjyw1xR9YkeI-U-XZ_8o&usqp=CAU',
    'https://c4.wallpaperflare.com/wallpaper/960/554/457/microsoft-windows-windows-10-swimming-wallpaper-preview.jpg',
]

    teams = Team.query.all()
    events_data = [
        {
            'name': 'Swimming Competition',
            'description': 'Annual swimming competition for all age groups.',
            'image_url': choice(image_urls),
            'team_id': choice(teams).id,
        },
        {
            'name': 'Swimming Gala',
            'description': 'Gala event showcasing various swimming styles.',
            'image_url': choice(image_urls),
            'team_id': choice(teams).id,
        },
        {
            'name': 'Coastal Championship',
            'description': 'Coastal competition for all swimming styles.',
            'image_url': choice(image_urls),
            'team_id': choice(teams).id,
        },
         {
            'name': 'Swimathon',
            'description': 'Freestyle Competition',
            'image_url': choice(image_urls),
            'team_id': choice(teams).id,
        },
         {
            'name': 'Dive Galore',
            'description': 'Diving competition',
            'image_url': choice(image_urls),
            'team_id': choice(teams).id,
        },
         {
            'name': 'Swimming Championship',
            'description': 'National championship event for competitive swimmers.',
            'image_url': choice(image_urls),
            'team_id': choice(teams).id,
        },
        
    ]

    for event_data in events_data:
        event = Event(**event_data)
        db.session.add(event)

    try:
        db.session.commit()
        print("Events seeded successfully.")
    except Exception as e:
        print(f"Error committing events: {str(e)}")
        db.session.rollback()

if __name__ == '__main__':
    seed_data()
    seed_events()
