$(document).ready(function(e){
	var endpoint = 'http://localhost:5820/finalprojectcli4/query';
	var getStudent = 'PREFIX own: <http://www.few.vu.nl/~mvr320/ontologies/week2#> SELECT ?a WHERE { ?a rdf:type own:Students }'
	var getMedia = 'PREFIX own: <http://www.few.vu.nl/~mvr320/ontologies/week2#> SELECT ?a ?l WHERE { ?a rdf:type own:Media . { OPTIONAL{ ?a dc:title ?title} } UNION { OPTIONAL{ ?a dcterms:title ?title} } }'
	$.get('/sparql',data={'endpoint': endpoint, 'query': getStudent}, function(json){
		console.log(json)
		try {
			var vars = json.head.vars;
			var ul = $('<ul id="studentList"></ul>'); //toplist
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li class="studentArgument">'+value['a']['value'].split('#')[1]+'</li>');
				ul.append(li);
			});
			$('#sList').html(ul);
			$('.studentArgument').on('click', function(e){
				$('#s').html(this.innerText);
			})
		} catch(err) {
			console.log(err);
			$('#sList').html('Something went wrong!');
		}
	})
	$.get('/sparql',data={'endpoint': endpoint, 'query': getMedia}, function(json){
		console.log(json)
		try {
			var vars = json.head.vars;
			var ul = $('<ul id="mediaList"></ul>'); //toplist
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li class="mediaArgument">'+value['a']['value']+'</li>');
				ul.append(li);
			});
			$('#mList').html(ul);
			$('.mediaArgument').on('click', function(e){
				$('#o').html(this.innerText);
			})
		} catch(err) {
			console.log(err);
			$('#mList').html('Something went wrong!');
		}
	})
});
	
$('#adviseButton').on('click', function(e){
	var prefix = '@prefix own:  <http://www.few.vu.nl/~mvr320/ontologies/week2#> .\n'
	var rdfstring = 'own:'+$('#s').html()+' own:advised_to <'+$('#o').html()+'> .'
	var rdf_data = prefix + rdfstring
	
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