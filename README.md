json-sorter
===========

A simple utility to sort a JSON object based on keys.

The demo is live <a href="http://demo.nomanurrehman.com/jsonsorter">here</a>

If you wish to use the sorting in your code, here is the main function that does the trick

<pre>
function sortJson(json){
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
}   
</pre>