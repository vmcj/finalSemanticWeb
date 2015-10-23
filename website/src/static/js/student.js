$(document).ready(function(e){

	var endpoint = 'http://localhost:5820/finalprojectcli4/query';
	var getMedia = $('#queryDiv').text()
	//console.log(getMedia)
	$.get('/sparql',data={'endpoint': endpoint, 'query': getMedia}, function(json){
		//console.log(json)
		try {
			var vars = json.head.vars;
			var ul = $('<ul id="mediaList"></ul>'); //toplist
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li class="mediaArgument">'+value['c']['value']+'</li>');
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
	});
	
		
/*	$('#searchBar').on('input', function(e){
		var endpoint = 'http://localhost:5820/finalprojectcli4/query';
		var queryWord = $('#searchBar').val()
		var queryText = 'SELECT DISTINCT ?a ?rel WHERE { { ?rel dc:title ?a } UNION { ?rel dcterms:title ?a } UNION { ?rel rdfs:label ?a } { ?rel ?rol ?ral } UNION { ?ral ?rel ?rol } UNION { ?rol ?ral ?rel } FILTER(REGEX(str(?rol), "'+queryWord+'", "i")) } LIMIT 10'

		var queryImg = 'SELECT DISTINCT ?a ?rel WHERE { ?rel foaf:depiction ?a . { ?rel ?rol ?ral } UNION { ?ral ?rel ?rol } UNION { ?rol ?ral ?rel } FILTER(REGEX(str(?rol), "'+queryWord+'", "i")) } LIMIT 5'
		//console.log(queryImg)
		$.get('/sparql',data={'endpoint': endpoint, 'query': queryText}, function(json){
			//console.log(json)
			try {
				var vars = json.head.vars;
				var div = $('<div id="mediaResultList"></div>'); //toplist
		
				$.each(json.results.bindings, function(index,value){
					var anch = $('<br><a class="mediaResultArgument"><span style="display: none">'+value['rel']['value']+'</span>'+value['a']['value']+'</a>');
					div.append(anch);
				});
				$('#resultBar').html(div);
				$('.mediaResultArgument').on('click',function(e){
					var varia = $(this).children('span').text();
					document.getElementById('targetFrame').src=varia;
				})
			} catch(err) {
				console.log(err);
				$('#resultBar').text('Something went wrong!');
			}
		});
		$.get('/sparql',data={'endpoint': endpoint, 'query': queryImg}, function(json){
			//console.log(json)
			try {
				var vars = json.head.vars;
				var rl = $('<div id="mediaResultListImg"></div>'); //toplist
				//ul.addClass('list-group');
		
				$.each(json.results.bindings, function(index,value){
					var img = $('<br><a class="mediaResultArgument"><span style="display: none">'+value['rel']['value']+'</span><img height="60px" src="'+value['a']['value']+'"></a>');
					rl.append(img);
				});
				$('#resultBarImg').html(rl);
				$('.mediaResultArgument').on('click',function(e){
					var varia = $(this).children('span').text();
					document.getElementById('targetFrame').src=varia;
				})
			} catch(err) {
				console.log(err);
				$('#resultBarImg').text('Something went wrong!');
			}
		});
	})
});
$('#like').on('click',function(e){
	var concept = document.getElementById('targetFrame').src;
	var prefix = '@prefix own:  <http://www.few.vu.nl/~mvr320/ontologies/week2#> .\n'
	var studentString = "own:"+$('#sId').text()+" own:likes <"+concept+"> .\n"
	var rdf_data = prefix + studentString
	console.log(rdf_data)
	
	$.post('/store',data={'data': rdf_data}, function(data){
		console.log(data)
		var pre = $('<pre></pre>');
		if(data=="200"){
			pre.text("Bedankt")
		}
		else{
			pre.text("Contacteer je docent: Failed with: "+data);
		}
		console.log(pre)
		$('#response').html(pre);
	})
})
$('#dislike').on('click',function(e){
	var concept = document.getElementById('targetFrame').src;
	var prefix = '@prefix own:  <http://www.few.vu.nl/~mvr320/ontologies/week2#> .\n'
	var studentString = "own:"+$('#sId').text()+" own:dislikes <"+concept+"> .\n"
	var rdf_data = prefix + studentString
	console.log(rdf_data)
	
	$.post('/store',data={'data': rdf_data}, function(data){
		console.log(data)
		var pre = $('<pre></pre>');
		if(data=="200"){
			pre.text("Bedankt")
		}
		else{
			pre.text("Contacteer je docent: Failed with: "+data);
		}
		console.log(pre)
		$('#response').html(pre);
	})
})*/