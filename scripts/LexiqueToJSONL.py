# process.py

import csv

infile = open('Lexique383.csv', 'r', encoding='utf-8-sig')
outfile = open('fr.jsonl', 'w')
csvDict = csv.DictReader(infile)

for line in csvDict:
    if line['4_cgram'] == 'NOM' and (line['6_nombre'] == 's' or line['6_nombre'] == ''):
        outfile.write("{\"word\":\"")
        outfile.write(f"{line['1_ortho']}\", ")
        outfile.write("\"classes\":")
        if line['5_genre'] == "m":
            outfile.write("[\"m\"]")
        elif line['5_genre'] == "f":
            outfile.write("[\"f\"]")
        elif line['5_genre'] == "":
            outfile.write("[\"m\",\"f\"]")
        outfile.write(", ")
        outfile.write("\"freq\":\"")
        outfile.write(f"{line['10_freqlivres']}\"") 
        outfile.write("}\n")

outfile.close()
infile.close()
