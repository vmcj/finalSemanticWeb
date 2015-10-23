import sys
from xml.dom.minidom import parse
dom = parse(sys.argv[1])
for node in dom.getElementsByTagName('skos:hasTopConcept'):
	#prepend = "http://bbc.co.uk"
	rawres = node.attributes['rdf:resource'].value
	res = rawres.split('#')[0]
	type = ".rdf"
	print res+type
for node in dom.getElementsByTagName('po:series'):
	#prepend = "http://bbc.co.uk"
	rawres = node.attributes['rdf:resource'].value
	res = rawres.split('#')[0]
	type = ".rdf"
	print res+type
for node in dom.getElementsByTagName('po:genre'):
	#prepend = "http://bbc.co.uk"
	rawres = node.attributes['rdf:resource'].value
	res = rawres.split('#')[0]
	type = ".rdf"
	print res+type
for node in dom.getElementsByTagName('po:clip'):
	#prepend = "http://bbc.co.uk"
	rawres = node.attributes['rdf:resource'].value
	res = rawres.split('#')[0]
	type = ".rdf"
	print res+type
#for node in dom.getElementsByTagName('po:Episode'):
#	#prepend = "http://bbc.co.uk"
#	rawres = node.attributes['rdf:about'].value
#	res = rawres.split('#')[0]
#	type = ".rdf"
#	print res+type
#for node in dom.getElementsByTagName('po:category'):
#	#prepend = "http://bbc.co.uk"
#	rawres = node.attributes['rdf:resource'].value
#	res = rawres.split('#')[0]
#	type = ".rdf"
#	print res+type
#for node in dom.getElementsByTagName('rdf:Description'):
#	#prepend = "http://bbc.co.uk"
#	rawres = node.attributes['rdf:about'].value
#	res = rawres.split('#')[0]
#	type = ".rdf"
#	print res+type