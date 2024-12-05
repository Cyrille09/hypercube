# Flask: The web framework to build and run the web application.
# request: To handle incoming HTTP requests and extract data from them.
# jsonify: To convert Python data structures (like dictionaries or lists) into JSON responses.
# CORS: To allow cross-origin resource sharing, enabling requests from other domains.
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__) # creates a Flask application instance.

#enables the app to handle cross-origin requests, 
# which are often needed when building a frontend app communicating with this backend.
CORS(app) 


tasks = [] # A list to store task objects (each task is a dictionary).
task_id_counter = 1 # A counter to assign unique IDs to tasks.


# Retrieve all tasks stored in the tasks list.
@app.route('/tasks', methods=['GET'])
def get_tasks():
    # jsonify(tasks) converts the tasks list into a JSON response.
    # Returns the response with a status code of 200 OK.
    return jsonify(tasks), 200 


# Add a new task to the tasks list.
@app.route('/tasks', methods=['POST'])
def add_task():
    global task_id_counter
    data = request.get_json() # request.get_json() extracts JSON data from the request body.

    # If the data is invalid or the title field is missing, return an error response with 400 Bad Request.
    if not data or not data.get('title'): 
        return jsonify({'error': 'Task title is required'}), 400

    task = {
        'id': task_id_counter, # A unique id from task_id_counter.
        'title': data['title'], # The title provided in the request.
        'completed': False # A default completed status of False.
    }
    tasks.append(task) # Append the task to the tasks list.
    task_id_counter += 1 # Increment the task_id_counter.
    return jsonify(task), 201 # Return the newly created task with 201 Created.


# Toggle the completed status of a specific task by its id.
@app.route('/tasks/status/<int:task_id>', methods=['PUT'])
def mark_task_complete(task_id):

    # Loop through the tasks list to find a task with the matching id.
    for task in tasks:
        if task['id'] == task_id:
            # If found, toggle the completed status (True to False or vice versa).
            task['completed'] = not task['completed']
            return jsonify(task), 200 # Return the updated task with 200 OK.
        
    # If the task is not found, return a 404 Not Found error.
    return jsonify({'error': 'Task not found'}), 404 


# Delete a specific task by its id.
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks

    # Use a list comprehension to filter out the task with the specified id.
    # Update the tasks list to exclude the deleted task.
    tasks = [task for task in tasks if task['id'] != task_id]

    # Return a success message with 200 OK.
    return jsonify({'message': 'Task deleted successfully!'}), 200


#  Edit a task's properties (e.g., title or completed).
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def edit_task(task_id):
    data = request.get_json()
    if not data:
        # Validate that data exists; return 400 Bad Request if not.
        return jsonify({'error': 'Invalid request data'}), 400

    # Loop through the tasks list to find a task with the specified id.
    for task in tasks:
        if task['id'] == task_id:
            if 'title' in data:
                task['title'] = data['title'] # Update title if it’s in the request data.
            if 'completed' in data:
                # Update completed if it’s in the request data.
                task['completed'] = data['completed']
            return jsonify(task), 200 # Return the updated task with 200 OK.
    # If the task is not found, return a 404 Not Found error.
    return jsonify({'error': 'Task not found'}), 404


# block ensures the script runs only when executed
if __name__ == '__main__':

    # app.run(debug=True) starts the Flask app in debug mode, 
    # providing detailed error messages and auto-reloading for code changes.
    app.run(debug=True)
