$(document).ready(function(){
   $("#sort").bind('click', function(event){
      $('#error').html('');
      if( $('#input').val() !== ''){
         try{
            var jsonObject = $.parseJSON($('#input').val());
            jsonObject = sortJson(jsonObject);
            jsonObject = $.parseJSON(jsonObject);
            $('#output').val( JSON.stringify(jsonObject, null, 3) );
         }
         catch(exception){
            $('#error').html('<div class="alert alert-danger"><strong>Ooopppsss! There seems to be a problem with your pasted JSON. Please make sure it is a valid JSON object string.</strong></div>');
         }
                  
      }
      else{
         $('#error').html('<div class="alert alert-danger"><strong>Please paste in a JSON object to sort</strong></div>');
      }  
	});
});

function sortJson(json) {
   var sortedJson;
   sortedJson = '';
  	if (json instanceof Array) {
      sortedJson += '[';
    	sortedJson += json.map(function(item) {
         return sortJson(item);
      }).join(',');
      sortedJson += ']';
   } else if (json === null) {
      sortedJson += 'null';
   } else {
      switch (typeof json) {
         case 'undefined':
            sortedJson += 'null';
            break;
         case 'string':
            sortedJson += '"' + json + '"';
            break;
         case 'number':
         case 'boolean':
            sortedJson += json;
            break;
         case 'object':
            sortedJson += '{';
            sortedJson += Object.keys(json).sort().map(function(key) {
               return '"' + key + '":' + sortJson(json[key]);
        	   }).join(',');
        	   sortedJson += '}';
            break;
      }
   }
   return sortedJson;
};