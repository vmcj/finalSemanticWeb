$(document).ready(function(e){
	var query = "PREFIX own: <http://www.few.vu.nl/~mvr320/ontologies/week2#> ASK { own:"+$('#idT').text()+" rdf:type own:Teachers }"
	var endpoint = 'http://localhost:5820/finalprojectcli4/query';
	var format='XML'
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format}, function(xml){
		try {
			test=$(xml).children()[0].innerText;
			var addUser = "";
			var permission = "<div style='border: 1px dashed blue'>verboden</div>";
			if( test=='true'){
				addUser = "<div style='border: 1px solid'><h2>Add Student</h2><input type='text' id='newStudent'><br /><button id='safeButton'>Save</button><div id='response'></div></div>"
				permission = "<div style='border: 1px dashed blue'>Geslaagd!<br></br>Hier kunt u studenten toevoegen:</div>"
			}
			total = permission+addUser
			$('#secured').html(total)
			$('#safeButton').on('click', function(e){
				var prefix = '@prefix own:  <http://www.few.vu.nl/~mvr320/ontologies/week2#> .\n'
				var studentString = "own:"+$('#newStudent').val()+" rdf:type owl:NamedIndividual , owl:Thing .\n"
				var rdfstring = 'own:'+$('#idT').text()+' own:teacher_of own:'+$('#newStudent').val()+' .'
				var rdf_data = prefix + studentString + rdfstring
	
			$.post('/store',data={'data': rdf_data}, function(data){
					var pre = $('<pre></pre>');
					if(data=="200"){
						pre.text("correct")
					}
					else{
						pre.text("Failed with: "+data);
					}
					$('#response').html(pre);
				})
			});
		} catch(err) {
			console.log(err);
			$('#secured').html('Something went wrong!');
		}
	})
	
})