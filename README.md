urlmaster
=========

Overview
--------
urlmaster is a library to wotk with arbitrary URLs. It can:

* Generate all types of URLs
* Resolve URLs
* Test URLs


Installation
------------
Installation is fairly straightforward, just install the npm module:

    npm install urlmaster


Usage
-----
First step, as with any node package, is to require it:

````JavaScript
var um = require('urlmaster');
````
### Generate Single URL
To generate a URL, you call um.generate():

````JavaScript
var url = um.generate(opts,config); // returns a URL string, e.g. "http://github.com/deitch/urlmaster"
````

The options 'opts' determines what components to include in the URL. All options are binary true/false, and the default for every option is false. The names of the options are not the commonly used names, although those are given below, but the official URL components given in http://tools.ietf.org/html/rfc3986

* scheme: whether or not not include a scheme (also known as a protocol) in the generated URL
* auth: whether or not to include an authority (also know as host) in the generated URL
* path: whether or not to include a path component in the generated URL
* relativePath: whether the path should be a relative path (true) or absolute path (false, the default). Ignored if path is false.
* dotsPath: whether or not the path should include multiple varieties of dots in the path, e.g. /./a/b/.././e/f/../ Ignore if path is false.
* query: whether or not to include a query string, e.g. ?foo=bar
* frag: whether or not to include a fragment (also known as hash) in the generated URL, e.g. #section2

The optional 'config' sets what the URL components should be. For example, if you set {scheme:true}, then urlmaster's default scheme is 'http'. If you prefer it use 'https', set it in the config. If you set an element in the config, but then do not set its option to be true, it will be ignored. 'opts' determines what is included; 'config' determines what the actual string is, if it is included by 'opts'. The following are valid config; all are of type String.

* scheme: scheme to use. Can end in a ':' character per the RFC, or um.generate() will add it for you. Default: 'http'
* auth: auth to use. Can start with '//' per the RFC or um.generate() will add it for you. Default: 'www.atomicinc.com'
* path: path component to use. Can start with '/' (absolute) or without (relative); um.generate() will do the right thing and remove/add it based on the 'relativePath' option. Default: '/a/b'
* query: query component to use. Can start with '?' per RFC, or um.generate() will add it for you. Default: '?foo=bar'
* frag: fragment component to use. Can start with '#' per RFC, or um.generate() will add it for you. Default: '#abc'

### Generate All URLs
If you want to generate all possible combinations of URLs (with/without scheme, with/without host, with/without path, with/without dots, etc.), urlmaster will do it for you. It will create all possible variants of 'opts' for um.generate(), remove duplicates, and return every unique URL.

````JavaScript
var urls = um.generateAll(config,stringOnly); // returns array
````

The option 'config' is identical to 'config' for um.generate() above.

The function returns an array of objects. Each object is the options 'opts' that generated the particular, with the property 'url' added that contains the URL string.

If you don't want all of the opts options back, just an array of strings, set the parameter 'stringOnly' to true, and it will return an array of strings, just the URLs.

### Resolve
Resolve is the basic functionality provided by browsers and node's URL library. However, this code will resolve any URL according to the RFC, including arrays and arrays of arrays.

````JavaScript
var resolved = um.resolve(base,reference);
````

um.resolve() is smart enough to handle multiple cases:

* if base and reference are both Strings, then return a resolved String
* if base is a String and reference is an array of Strings, then return an array of resolved Strings: every reference according to the base
* if base is an array of Strings and reference is a String, then return an array of resolved Strings: the single reference according to each base
* if the base is an array of Strings and reference is an array of Strings, then return an array of arrays of Strings: each array in the outside array is all of the references resolved according to its base.

To understand the last case, let us assume:

````JavaScript
base = ['http://www.google.com/','http://www.yahoo.com','http://www.msn.com'];
ref = ['/a','/b','/c'];
urls = um.resolve(base,ref);
````

Then the resulting array urls will contain:

````JavaScript
[
['http://www.google.com/a','http://www.google.com/b','http://www.google.com/c'],
['http://www.yahoo.com/a','http://www.yahoo.com/b','http://www.yahoo.com/c'],
['http://www.msn.com/a','http://www.msn.com/b','http://www.msn.com/c']
]
````

### Resolve With Tracking
What happens if you need not only to resolve, but also need to track how you got there? This is most often used in testing. It isn't enough to known that resolving '/a' relative to a base of 'http://www.google.com' gives 'http://www.google.com/a', but you need the results to show the inputs as well. 

A variant on resolve() will give it to you:

````JavaScript
base = ['http://www.google.com/','http://www.yahoo.com','http://www.msn.com'];
ref = ['/a','/b','/c'];
urls = um.resolveTrack(base,ref); 
````

The result, in this case, will always be an array of arrays. Each array is a tuple of [base, reference, resolved]:

````JavaScript
[
['http://www.google.com','/a','http://www.google.com/a'],
['http://www.google.com','/b','http://www.google.com/b'],
// etc.
]
````

resolveTrack is smart enough to handle simple strings as well:

````JavaScript
urls = um.resolveTrack('http://www.google.com','/a');
// returns ['http://www.google.com','/a','http://www.google.com/a']
````

### Generate a Test Set
And if you want a test set of all variants of two different URLs and their expected resolution results?

````JavaScript
expected = um.resolveAll();
````

The result 'expected' will be an array of URLs, identical to those provided by um.resolveTrack(base,ref), where base and ref are provided by two different runs of um.generateAll(). The following are equivalent:

````JavaScript
expected = um.resolveAll(); 

// is identical to 

expected = um.resolveTrack(
 um.generateAll({scheme:"http",auth:'www.why.com',path:'/a/b',query:'?foo=bar',frag:'#abc'}),
 um.generateAll({scheme:"https",auth:'www.not.com',path:'/q/r',query:'?when=now',frag:'#xyz'})
);

````

To generate a test set from the command-line (Unix/Linux/BSD/Mac only), after npm install:

    node_modules/.bin/urlmasterset > some_output_file.json
