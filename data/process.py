# process.py

import csv

infile = open('Lexique383.csv', 'r', encoding='utf-8-sig')
outfile = open('output.csv', 'w')
csvDict = csv.DictReader(infile)

outfile.write("mot,genre,freq\n")
for line in csvDict:
    if line['4_cgram'] == 'NOM' and (line['6_nombre'] == 's' or line['6_nombre'] == ''):
        outfile.write(f"{line['1_ortho']},{line['5_genre']},{line['10_freqlivres']}\n")

outfile.close()
infile.close()
