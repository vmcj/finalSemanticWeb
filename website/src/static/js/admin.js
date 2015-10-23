$(document).ready(function(e){
	$.get('/reasoning', function(reasoning){
		if(reasoning=='true'){
			$('#systinf').prop('checked',true)
		} else{
			$('#systinf').prop('checked',false)
		}
	})
	$.get('/service', function(service){
		if(service=='true'){
			$('#systserv').prop('checked',true)
		} else{
			$('#systserv').prop('checked',false)
		}
	})
})

/*$('#systinf').on('change', function(e){
	$.get('/reasoning',data={'change': $('#systinf').prop('checked')}, function(json){
		console.log('gewijzigd: reasoning');
	})
})*/

/*$('#systserv').on('change', function(e){
	$.get('/service',data={'change': $('#systserv').prop('checked')}, function(json){
		console.log('gewijzigd: service');
	})
})*/

$('#factForgeButton1').on('click', function(e){
	var query = $('#factforgeQuery').val();
	var endpoint = 'http://factforge.net/sparql.nt';
	var format = 'N3';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format}, function(raw){
		console.log(raw);
		try {
			$('#ffResult').html(raw)
			$('#factForgeButton2').css('visibility','visible')
			$('#factForgeButton2').on('click', function(e){
				$.post('/store',data={'data': raw}, function(data){
					var pre = $('<pre></pre>');
					pre.text(data);
					$('#ffResult').html(pre);
				})
			})
		} catch(err) {
			console.log(err);
			$('#ffResult').html('Something went wrong!');
		}
	})
})


/*$('#downloadAllData').on('click', function(e){
	
	var query = "CONSTRUCT { ?a ?b ?c } WHERE { ?a ?b ?c } LIMIT 10";
	var endpoint = 'http://localhost:5820/finalprojectcli4/query';
	var format = 'RDF';
	var runstring = '/sparql?endpoint='+endpoint+'&format='+format+'&query='+query;
	console.log(runstring);
	//window.open(runstring);
});*/

$(document).ready(function(e){
	
	var query = $('#cTeacher').text();
	var endpoint = 'http://localhost:5820/finalprojectcli4/query';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query}, function(json){
		try {
			var vars = json.head.vars;
			var ul = $('<ul id="teacherList"></ul>'); //toplist
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li>'+value['a']['value'].split('#')[1]+'</li>');
				ul.append(li);
			});
			$('#dTeacher').html(ul);
			
		} catch(err) {
			console.log(err);
			$('#dTeacher').html('Something went wrong!');
		}
	})
	
	var query = $('#cStudent').text();
	var endpoint = 'http://localhost:5820/finalprojectcli4/query';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query}, function(json){
		try {
			var vars = json.head.vars;
			var ul = $('<ul id="studentList"></ul>'); //toplist
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li>'+value['a']['value'].split('#')[1]+'</li>');
				ul.append(li);
			});
			$('#dStudent').html(ul);
			
		} catch(err) {
			console.log(err);
			$('#dStudent').html('Something went wrong!');
		}
	})
	
	var query = $('#cUser').text();
	var endpoint = 'http://localhost:5820/finalprojectcli4/query';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query}, function(json){
		try {
			var vars = json.head.vars;
			var ul = $('<ul id="userList"></ul>'); //toplist
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li>'+value['a']['value'].split('#')[1]+'</li>');
				ul.append(li);
			});
			$('#dUser').html(ul);
			
		} catch(err) {
			console.log(err);
			$('#dUser').html('Something went wrong!');
		}
	})
	
	var query = $('#qTeacherV').text();
	var endpoint = 'http://localhost:5820/finalprojectcli4/query';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query}, function(json){
		console.log(json)
		try {
			var vars = json.head.vars;
			var ul = $('<ul id="topList2"></ul>'); //toplist
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				if($(ul).find('#2'+value['teacher']['value'].split('#')[1]).length){
					console.log('bestaat al.');
				} else {
					ul.append('<li><a href="/teacherpage?teacher='+value['teacher']['value'].split('#')[1]+'">'+value['teacher']['value'].split('#')[1]+'</a><ul id=2'+value['teacher']['value'].split('#')[1]+'></ul></li>');
				}
				var target = $(ul).find('#2'+value['teacher']['value'].split('#')[1]);
				var li = $('<li><a href="/advisestudent?student='+value['student']['value'].split('#')[1]+'">'+value['student']['value'].split('#')[1]+'</a></li>');
				target.append(li);
			});
			$('#rTeacherV').html(ul);
			
		} catch(err) {
			console.log(err);
			$('#rTeacherV').html('Something went wrong!');
		}
	})
	
	var query = $('#qStudentV').text();
	var endpoint = 'http://localhost:5820/finalprojectcli4/query';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query}, function(json){
		console.log(json)
		try {
			var vars = json.head.vars;
			var ul = $('<ul id="topList3"></ul>'); //toplist
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				ul.append('<li><a href="/student?student='+value['student']['value'].split('#')[1]+'">'+value['student']['value'].split('#')[1]+' - ('+value['count']['value']+' adviezen)</a></li>')
			});
			$('#rStudentV').html(ul);
			//$('#topList2').before(preUl);
			
		} catch(err) {
			console.log(err);
			$('#rStudentV').html('Something went wrong!');
		}
	})
});