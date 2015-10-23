for headline in $(ls *.rdf)
do
	grep $headline ./log.txt
	if [ $? -eq 0 ]
	then
		echo "Name Found - 1"
   	else
   		perl -pi -e 's/\"\/programmes/\"http:\/\/bbc.co.uk\/programmes/g' $headline
   		perl -pi -e 's/\"\/cbeebies/\"http:\/\/bbc.co.uk\/cbeebies/g' $headline
   		perl -pi -e 's/\"\/cbbc/\"http:\/\/bbc.co.uk\/cbbc/g' $headline
   		perl -pi -e 's/\"\/bbcone/\"http:\/\/bbc.co.uk\/bbcone/g' $headline
   		
   		echo $headline >> ./log.txt
		for line in $(python ../scripts/bbcParser.py $headline)
		do
			echo $line
			newfilename=$(echo $line | sed -e 's/:/dubbel/g' | sed -e 's/\//slash/g' | sed -e 's/\./punt/g')".rdf"
		#	cat $line
			grep $newfilename ./log.txt
			if [ $? -eq 0 ]
			then
				echo "Name Found - 2"
   			else
				curl -L $line > $newfilename
				#Deze lijn moet uit indien je verder wil crawlen
				perl -pi -e 's/\"\/programmes/\"http:\/\/bbc.co.uk\/programmes/g' $newfilename
   				perl -pi -e 's/\"\/cbeebies/\"http:\/\/bbc.co.uk\/cbeebies/g' $newfilename
   				perl -pi -e 's/\"\/cbbc/\"http:\/\/bbc.co.uk\/cbbc/g' $newfilename
   				perl -pi -e 's/\"\/bbcone/\"http:\/\/bbc.co.uk\/bbcone/g' $newfilename
   		
   		
   				#perl -pi -e 's/\"\/cbeebies/\"http:\/\/bbc.co.uk\/cbeebies/g' $newfilename
   				#perl -pi -e 's/\"\/programmes/\"http:\/\/bbc.co.uk\/programmes/g' $newfilename
		#
				echo "Name not Found - 2"
			fi
		done
		echo "Name not Found - 1"
	fi
done