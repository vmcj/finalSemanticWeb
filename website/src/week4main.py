from flask import Flask, render_template, url_for, request, jsonify, send_from_directory
from SPARQLWrapper import SPARQLWrapper, RDF, JSON, N3, XML
import requests
import json

reasoningBool = True
serviceBool = False
usedStudent = "guestS"
usedTeacher = "guestT"

app = Flask(__name__)


#TUTORIAL_REPOSITORY = 'http://localhost:8080/openrdf-sesame/repositories/tutorial'
TUTORIAL_REPOSITORY = 'http://localhost:5820/finalprojectcli4'

@app.route('/scripts/<path:path>')
def send_scriptsdir(path):
    return send_from_directory('templates/scripts/', path)

@app.route('/data/<path:path>')
def send_datadir(path):
    return send_from_directory('templates/data/', path)

#@app.route('/relfinder')
#def rel_user():
	#app.logger.debug('relfinder')
 #   return send_from_directory('templates/relfinder/clone/bin/','RelFinder.swf')
    #return file("templates/relfinder/clone/bin/RelFinder.swf")
	#from subprocess import check_output
	#return check_output(["ls"])

@app.route('/advisestudent',methods=['GET'])
def advise_student():
    app.logger.debug('You arrived at ' + url_for('advise_student'))
    app.logger.debug('I received the following arguments' + str(request.args) )

    # Get the message from the GET request, if nothing is found, set a default message.
    student = request.args.get('student', 'No student sent!')

    return render_template('advisestudent.html', student=student)

@app.route('/teacherpage',methods=['GET'])
def change_teacher():
    app.logger.debug('You arrived at ' + url_for('change_teacher'))
    app.logger.debug('I received the following arguments' + str(request.args) )

    # Get the message from the GET request, if nothing is found, set a default message.
    teacher = request.args.get('teacher', 'No teacher sent!')

    return render_template('teacherpage.html', teacherId=teacher)


@app.route('/admin')
def admin_page():
    app.logger.debug('You arrived at ' + url_for('admin_page'))
    return render_template('admin.html')

@app.route('/student',methods=['GET'])
def student_page():
    app.logger.debug('You arrived at ' + url_for('student_page'))
    app.logger.debug('I received the following arguments' + str(request.args) )

    # Get the message from the GET request, if nothing is found, set a default message.
    student = request.args.get('student', 'No user sent!')
    style = request.args.get('style', 'empty')
    return render_template('student.html', student=student, style=style)


@app.route('/adminUNIXRebuild')
def adminUNIXRebuild_page():
    from subprocess import check_output
    app.logger.debug('You arrived at ' + url_for('adminUNIXRebuild_page'))
    return check_output(["stardog-admin db drop finalprojectcli4 ; stardog-admin db create -n finalprojectcli4 templates/data/*.ttl templates/data/*.rdf"], shell=True)

@app.route('/reasoning', methods=['GET'])
def reasoning():
    global reasoningBool
    app.logger.debug('You arrived at ' + url_for('reasoning'))
    app.logger.debug('I received the following arguments' + str(request.args) )
    #app.logger.debug('Bool stat: ' + request.args.get('change', reasoningBool))
    test = request.args.get('change', reasoningBool)
    app.logger.debug('Bool stat: ' + str(test))
    if test == 'true':
    	reasoningBool = True
    if test == 'false':
    	reasoningBool = False
    #app.logger.debug(str(reasoningBool))
    if reasoningBool:
    	return 'true'
    else:
    	return 'false'

@app.route('/service', methods=['GET'])
def service():
    global serviceBool
    app.logger.debug('You arrived at ' + url_for('service'))
    app.logger.debug('I received the following arguments' + str(request.args) )
    test = request.args.get('change', serviceBool)
    app.logger.debug('Bool stat: ' + str(test))
    if test == 'true':
    	serviceBool = True
    if test == 'false':
    	serviceBool = False
    #app.logger.debug(str(reasoningBool))
    if serviceBool:
    	return 'true'
    else:
    	return 'false'


@app.route('/')
def first_page():
    app.logger.debug('You arrived at ' + url_for('first_page'))
    return render_template('index.html')

@app.route('/show',methods=['GET'])
def show_message():
    app.logger.debug('You arrived at ' + url_for('show_message'))
    app.logger.debug('I received the following arguments' + str(request.args) )

    # Get the message from the GET request, if nothing is found, set a default message.
    message = request.args.get('message', 'No message sent!')

    return render_template('message.html', message=message)

@app.route('/sparql', methods=['GET'])
def sparql():
    global reasoningBool;
    app.logger.debug('You arrived at ' + url_for('sparql'))
    app.logger.debug('I received the following arguments' + str(request.args) )

    endpoint = request.args.get('endpoint', None)
    query = request.args.get('query', None)
    reasoning = request.args.get('reasoning', None)
    return_format = request.args.get('format','JSON')


    if endpoint and query :
        sparql = SPARQLWrapper(endpoint)

        sparql.setQuery(query)
        app.logger.debug(return_format)

        if return_format == 'RDF':
            sparql.setReturnFormat(RDF)
        elif return_format == 'N3':
            sparql.setReturnFormat(N3)
        elif return_format == 'XML':
            sparql.setReturnFormat(XML)
        else :
            sparql.setReturnFormat(JSON)
            sparql.addParameter('Accept','application/sparql-results+json')

        if reasoning == 'true' :
            sparql.addParameter('reasoning','true')
        elif reasoningBool == True :
        	if reasoning != 'false' :
        		sparql.addParameter('reasoning','true')

        app.logger.debug('Query:\n{}'.format(query))

        app.logger.debug('Querying endpoint {}'.format(endpoint))

        try :
            response = sparql.query().convert()

            app.logger.debug('Results were returned, yay!')

            app.logger.debug(response)
            
            if return_format == 'RDF':
                app.logger.debug('Serializing to Turtle format')
                return response.serialize(format='nt')
            if return_format == 'N3':
                #app.logger.debug('Serializing to Turtle format')
                #app.logger.debug(type(response))
                return response
                #.serialize(format='nt')
            if return_format == 'XML':
                #app.logger.debug('Serializing to Turtle format')
                #app.logger.debug(type(response))
                return response.toxml()
                #.serialize(format='nt')
            else :
                app.logger.debug('Directly returning JSON format')
                return jsonify(response)
        except Exception as e:
            app.logger.error('Something went wrong')
            app.logger.error(e)
            return jsonify({'result': 'Error'})


    else :
        return jsonify({'result': 'Error'})

@app.route('/store', methods=['POST'])
def store():
    app.logger.debug('You arrived at ' + url_for('store'))
    app.logger.debug('I received the following arguments' + str(request.form) )

    data = request.form['data'].encode('utf-8')




    transaction_begin_url = TUTORIAL_REPOSITORY + "/transaction/begin"
    app.logger.debug('Doing a POST of your data to {}'.format(transaction_begin_url))

    # Start the transaction, and get a transaction_id
    response = requests.post(transaction_begin_url, headers={'Accept': 'text/plain'})
    transaction_id = response.content
    app.logger.debug(response.status_code)

    # POST the data to the transaction
    post_url = TUTORIAL_REPOSITORY + "/" + transaction_id + "/add"
    app.logger.debug('Assuming your data is Turtle!!')
    response = requests.post(post_url, data=data, headers={'Accept': 'text/plain', 'Content-type': 'text/turtle'})
    app.logger.debug(response.status_code)


    # Close the transaction
    transaction_close_url = TUTORIAL_REPOSITORY + "/transaction/commit/" + transaction_id
    response = requests.post(transaction_close_url)
    app.logger.debug(response.status_code)
    app.logger.debug(response.content)
    app.logger.debug(response.headers)

    return str(response.status_code)


if __name__ == '__main__':
    app.debug = True
    app.run(port=5090)
