from flask import request, jsonify
from flask_restful import Resource
import openai
from datetime import datetime

# Local imports
from config import app, db, api
from models import User, Conversation, Message, UserChatHistory

# Initialize the OpenAI API key
openai.api_key = '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'

@app.route('/')
def root():
    return ''

@app.route('/signin', methods=['POST'])
def signup():
    data = request.get_json()
    new_user = User(
        name=data.get('name'),
        username=data.get('username')
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict())

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_input = request.json.get('user_input')
    print(f"Received user input: {user_input}")
    if not user_input:
        return jsonify({"error": "Invalid request"}), 400

    response = get_response_from_chatbot(user_input)
    return jsonify({"response": response})

def get_response_from_chatbot(user_input):
    response = openai.Completion.create(
        engine='text-davinci-003',
        prompt=user_input,
        max_tokens=4000,
        temperature=0.5,
    ).choices[0].text
    return response

# route to handle user chat interactions
@app.route('/conversation', methods=['POST'])
def handle_conversataion():
    data = request.get_json()
    user_id = data.get('user_id')
    conversation_id = data.get('conversation_id')
    message_text = data.get('message_text')
    print(user_id)
    print(conversation_id)
    print(message_text)

    if not user_id or not conversation_id or not message_text:
        return jsonify({"error": "Invalid request"}), 400
    
    # Check if the conversation exists
    conversation = Conversation.query.get(conversation_id)
    if not conversation:
        return jsonify({"error": "Conversation not found"}), 404
    
    # Check if the user is part of the conversation
    if user_id != conversation.user1_id and user_id != conversation.user2_id:
        return jsonify({"error": "User is not part of the conversation"}), 403
    
    # Create a new message and add it to the conversation
    new_message = Message(
        text=message_text,
        user_id=user_id,
        conversation_id=conversation_id
    )
    db.session.add(new_message)
    db.session.commit()

    # Update user's chat history with the timestamp of the last message
    user_chat_history = UserChatHistory.query.filter_by(
        user_id=user_id, conversation_id=conversation_id
    ).first()
    if user_chat_history:
        user_chat_history.last_message_timestamp = datetime.utcnow()
        db.session.commit()




    return jsonify({"message": "Message sent successfully"})

# Retrieve all messages in a conversation
@app.route('/conversation/<int:conversation_id>/messages', methods=['GET'])
def get_messages_in_conversation(conversation_id):
    # Retrieve the conversation and associated messages
    conversation = Conversation.query.get(conversation_id)
    print(conversation)
    if not conversation:
        return jsonify({"error": "Conversation not found"}), 404

    messages = conversation.messages.all()

    # Convert messages to a list of dictionaries
    messages_data = [message.to_dict() for message in messages]

    return jsonify(messages_data)

@app.route('/user/<int:user_id>/chat_history', methods=['GET'])
def get_user_chat_history(user_id):
    user_chat_history = UserChatHistory.query.filter_by(user_id=user_id).all()
    chat_history_data = [history.to_dict() for history in user_chat_history]
    return jsonify(chat_history_data)



if __name__ == '__main__':
    app.run(port=5000, debug=True)