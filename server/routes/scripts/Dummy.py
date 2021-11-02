import json
class Dummy:
  def __init__(self, arg):
        self.arg = arg
  def dummy(self):
        #argument = self.arg[0:]
        dumArg =  self.arg
        #length =  len(dumArg) 
        listToStr = ' '.join([str(elem) for elem in dumArg])
        print(json.dumps({"Test":[{" Output  " : str(listToStr) }]}))
       