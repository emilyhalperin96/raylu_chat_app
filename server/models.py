from config import db
from datetime import datetime 

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'username': self.username
        }
# individual messages within a conversation 
class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'))
    user_chat_history_id = db.Column(db.Integer, db.ForeignKey('user_chat_history.id'))

    user_chat_history = db.relationship('UserChatHistory', back_populates='messages')
    
    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'timestamp': self.timestamp.isoformat(),
            'user_id': self.user_id,
            'conversation_id': self.conversation_id,
             'user_chat_history_id': self.user_chat_history_id
        }
    
# conversation, collection of msg between 2 users 
class Conversation(db.Model):
    __tablename__ = 'conversations'
    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user2_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Add a relationship to access messages in this conversation
    messages = db.relationship('Message', backref='conversation', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'user1_id': self.user1_id,
            'user2_id': self.user2_id
        }


class UserChatHistory(db.Model):
    __tablename__ = 'user_chat_history'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'))
    last_message_timestamp = db.Column(db.DateTime)
    messages = db.relationship('Message', back_populates='user_chat_history')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'conversation_id': self.conversation_id,
            'last_message_timestamp': self.last_message_timestamp.isoformat(),
        }
