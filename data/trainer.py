# trainer.py

import csv

with open('output.csv') as infile:
    csvDict = csv.DictReader(infile)
    count = 0
    incorrects = []
    for entry in csvDict:
        count = count + 1
        response = input(f"{entry['mot']} ")

        # end program
        if response == 'x' or response == "X":
            print(f"{len(incorrects)}/{count}")
            exit(0)

        # 
        if entry['genre'] == '':
            continue
 
        # 
        if response != entry['genre']:
            incorrects.append(entry['mot'])
            print("wrong\n")
