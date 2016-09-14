"""
Makes a file out of toponyms (STTLs in hierarchy file) not found in Cornu, by checking the toponyms against the list of common names.
The Common toponyms are in an input file.
"""
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
import io
import csv, json
import sys, re

#reload(sys)  
#sys.setdefaultencoding('utf8')


sttls =[]
found = "false"
with open('../Data/Shamela_0023696_Triples_H', 'r') as triFile:
  triReader = csv.reader(triFile, delimiter=',', quotechar='|')
  for row in triReader:
      found = "false"
      sttl = row[-1][4:].strip()
      with open('../Data/SttlReg_CoordsCSV_fuzzyWuzzy_normalized') as commonSttls:    
        commReader = csv.reader(commonSttls, delimiter=',', quotechar='|')
        for d in commReader:
          if sttl == d[0]:
            found = "true"
            break;
        if found == "false":    
          sttls.append(row) 
#print("sttls ",sttls)
with open('../Data/notCommon_checkAgainstCommons.txt', 'w', encoding='utf-8') as f:
  fWriter = csv.writer(f, delimiter=',')
  for sttl in sttls:
    fWriter.writerow(sttl)
print("done!") 