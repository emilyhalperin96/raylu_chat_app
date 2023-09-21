# INSTRUCTIONS 

Clone Repository

  clone the repository into your local directory:
      # git clone <repository_url>

Front End 

    open a new terminal window
    navigate to chat-app directory 
        # cd chat-app
    install the required dependencies and start the application
        # npm install && npm start

Back End 

    open a new terminal window
    install the required Python packages
        # pipenv install flask flask-sqlalchemy flask-migrate flask-restful flask-cors openai
    activate the virtual environment 
        # pipenv shell 
    obtain an OpenAI API key from https://platform.openai.com/
    create a .env file in the root directory and paste your API key as follows:
        # API_KEY=your_api_key_here
    uncomment lines 7, 14, and 17 in the 'app.py' file.
    install the python-dotenv package
        # pipenv install python-dotenv
    set up the Flask app and port environment variables 
        # export FLASK_APP=app.py
        # export FLASK_RUN_PORT=5000
    run the flask application 
        # flask run 
    
    
    
