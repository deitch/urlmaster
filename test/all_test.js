/*jslint node:true */
/*global describe,it,before */
var um = require('../lib'), should = require('should');
//t('http://www.google.com','/a','b');
//t('http://www.google.com/foo/bar','a','b');


describe('urlmaster',function() {
	describe('.resolve',function() {
		describe('(base,href)',function() {
			describe('base string, href string',function() {
				describe('invalid base',function() {
					it('should return null',function() {
						should.not.exist(um.resolve('abc',"/def"));
					});
				});
				describe('null base',function() {
					it('should return null',function() {
						should.not.exist(um.resolve(null,"/def"));
					});
				});
				describe('valid base',function() {
					describe('absolute path ref',function() {
						it('should return base host + ref path',function() {
							um.resolve('http://www.google.com/foo/bar','/a').should.equal('http://www.google.com/a');
						});
					});
					describe('relative path ref',function() {
						it('should return base host plus path with ref path',function() {
							um.resolve('http://www.google.com/foo/bar','a').should.equal('http://www.google.com/foo/a');
						});
					});
					describe('complete URL ref',function() {
						it('should return ref',function() {
							um.resolve('http://www.google.com/foo/bar','http://www.yahoo.com/a/b/c').should.equal('http://www.yahoo.com/a/b/c');
						});
					});
				});
			});
			describe('base string, href array',function() {
				describe('invalid base',function() {
					it('should return array of nulls',function() {
						um.resolve('abc',['/a','b']).should.eql([null,null]);
					});
				});
				describe('null base',function() {
					it('should return array of nulls',function() {
						um.resolve(null,['/a','b']).should.eql([null,null]);
					});
				});
				describe('valid base',function() {
					describe('absolute path ref',function() {
						it('should return base host + ref path',function() {
							um.resolve('http://www.google.com/foo/bar',['/a','/b']).should.eql(['http://www.google.com/a','http://www.google.com/b']);
						});
					});
					describe('relative path ref',function() {
						it('should return base host plus path with ref path',function() {
							um.resolve('http://www.google.com/foo/bar',['a','b']).should.eql(['http://www.google.com/foo/a','http://www.google.com/foo/b']);
						});
					});
					describe('complete URL ref',function() {
						it('should return ref',function() {
							um.resolve('http://www.google.com/foo/bar',['http://www.yahoo.com/a/b/c','http://www.msn.com/q']).should.eql(['http://www.yahoo.com/a/b/c','http://www.msn.com/q']);
						});
					});
				});
			});
			describe('base array, href string',function() {
				describe('invalid bases',function() {
					it('should return array of nulls',function() {
						um.resolve(['def','abc'],'/a').should.eql([null,null]);
					});
				});
				describe('null bases',function() {
					it('should return array of nulls',function() {
						um.resolve([null,null],'/a').should.eql([null,null]);
					});
				});
				describe('mixed invalid and null bases',function() {
					it('should return array of nulls',function() {
						um.resolve(['abc',null],'/a').should.eql([null,null]);
					});
				});
				describe('valid bases',function() {
					describe('absolute path ref',function() {
						it('should return base host + ref path',function() {
							um.resolve(['http://www.google.com/foo/bar','http://www.yahoo.com/ace'],'/a').should.eql(['http://www.google.com/a','http://www.yahoo.com/a']);
						});
					});
					describe('relative path ref',function() {
						it('should return base host plus path with ref path',function() {
							um.resolve(['http://www.google.com/foo/bar','http://www.yahoo.com/ace'],'a').should.eql(['http://www.google.com/foo/a','http://www.yahoo.com/a']);
						});
					});
					describe('complete URL ref',function() {
						it('should return ref',function() {
							um.resolve(['http://www.google.com/foo/bar','http://www.yahoo.com/ace'],'http://www.yahoo.com/a/b/c').should.eql(['http://www.yahoo.com/a/b/c','http://www.yahoo.com/a/b/c']);
						});
					});
				});
			});
			describe('base array, href array',function() {
				describe('invalid bases',function() {
					it('should return array of nulls',function() {
						um.resolve(['def','abc'],['/a','foo']).should.eql([[null,null],[null,null]]);
					});
				});
				describe('null bases',function() {
					it('should return array of nulls',function() {
						um.resolve([null,null],['/a','foo']).should.eql([[null,null],[null,null]]);
					});
				});
				describe('mixed invalid and null bases',function() {
					it('should return array of nulls',function() {
						um.resolve(['abc',null],['/a','foo']).should.eql([[null,null],[null,null]]);
					});
				});
				describe('valid bases',function() {
					describe('absolute and relative path refs',function() {
						it('should return base host + ref path',function() {
							um.resolve(['http://www.google.com/foo/bar','http://www.yahoo.com/ace/fly'],['/a','b']).should.eql([['http://www.google.com/a','http://www.google.com/foo/b'],['http://www.yahoo.com/a','http://www.yahoo.com/ace/b']]);
						});
					});
					describe('complete URL refs',function() {
						it('should return ref',function() {
							um.resolve(['http://www.google.com/foo/bar','http://www.yahoo.com/ace'],['http://www.yahoo.com/a/b/c','http://www.msn.com/d/e/f']).should.eql([['http://www.yahoo.com/a/b/c','http://www.msn.com/d/e/f'],['http://www.yahoo.com/a/b/c','http://www.msn.com/d/e/f']]);
						});
					});
				});
			});
		});
		describe('(locn,base,href)',function() {
			describe('locn string, base string, href string',function() {
				describe('invalid locn',function() {
					it('should return null',function() {
						should.not.exist(um.resolve('abc',"http://www.google.com","/def"));
					});
				});
				describe('null locn',function() {
					it('should return null',function() {
						should.not.exist(um.resolve(null,"http://www.google.com","/def"));
					});
				});
				describe('valid locn',function() {
					describe('relative base',function() {
						describe('absolute path ref',function() {
							it('should return locn host + ref path',function() {
								um.resolve('http://www.google.com/foo/bar','b','/a').should.equal('http://www.google.com/a');
							});
						});
						describe('relative path ref',function() {
							it('should return locn host plus path with ref path',function() {
								um.resolve('http://www.google.com/foo/bar','b','a').should.equal('http://www.google.com/foo/a');
							});
						});
						describe('complete URL ref',function() {
							it('should return ref',function() {
								um.resolve('http://www.google.com/foo/bar','b','http://www.yahoo.com/a/b/c').should.equal('http://www.yahoo.com/a/b/c');
							});
						});
					});
					describe('absolute base',function() {
						describe('absolute path ref',function() {
							it('should return locn host + ref path',function() {
								um.resolve('http://www.google.com/foo/bar','/b','/a').should.equal('http://www.google.com/a');
							});
						});
						describe('relative path ref',function() {
							it('should return locn host plus base path with ref path',function() {
								um.resolve('http://www.google.com/foo/bar','/b/c','a').should.equal('http://www.google.com/b/a');
							});
						});
						describe('complete URL ref',function() {
							it('should return ref',function() {
								um.resolve('http://www.google.com/foo/bar','/b','http://www.yahoo.com/a/b/c').should.equal('http://www.yahoo.com/a/b/c');
							});
						});
					});
					describe('authority base',function() {
						describe('absolute path ref',function() {
							it('should return locn host + ref path',function() {
								um.resolve('http://www.google.com/foo/bar','//www.foo.com','/a').should.equal('http://www.foo.com/a');
							});
						});
						describe('relative path ref',function() {
							it('should return locn host plus base path with ref path',function() {
								um.resolve('http://www.google.com/foo/bar','//www.foo.com/b/c','a').should.equal('http://www.foo.com/b/a');
							});
						});
						describe('complete URL ref',function() {
							it('should return ref',function() {
								um.resolve('http://www.google.com/foo/bar','//www.foo.com/b','http://www.yahoo.com/a/b/c').should.equal('http://www.yahoo.com/a/b/c');
							});
						});
					});
				});
			});
			describe('locn string, base string, href array',function() {
				describe('invalid locn',function() {
					describe('valid base',function() {
						it('should return array of nulls',function() {
							um.resolve('abc','http://www.google.com/abc',['/a','b']).should.eql([null,null]);
						});
					});
					describe('invalid base',function() {
						it('should return array of nulls',function() {
							um.resolve('abc','/abc',['/a','b']).should.eql([null,null]);
						});
					});
				});
				describe('null locn',function() {
					describe('valid base',function() {
						it('should return array of nulls',function() {
							um.resolve(null,'http://www.google.com/abc',['/a','b']).should.eql([null,null]);
						});
					});
					describe('invalid base',function() {
						it('should return array of nulls',function() {
							um.resolve(null,'/abc',['/a','b']).should.eql([null,null]);
						});
					});
				});
				describe('valid locn',function() {
					describe('absolute base',function() {
						describe('relative and absolute refs',function() {
							it('should return appropriate URLs',function() {
								um.resolve('http://www.google.com/a/b','/c/d',['e','/f']).should.eql(['http://www.google.com/c/e','http://www.google.com/f']);
							});
						});
					});
					describe('relative base',function() {
						it('should return appropriate URLs',function() {
							um.resolve('http://www.google.com/a/b','c/d',['e','/f']).should.eql(['http://www.google.com/a/c/e','http://www.google.com/f']);
						});
					});
					describe('null base',function() {
						it('should return appropriate URLs',function() {
							um.resolve('http://www.google.com/a/b',null,['e','/f']).should.eql(['http://www.google.com/a/e','http://www.google.com/f']);
						});
					});
					describe('blank base',function() {
						it('should return appropriate URLs',function() {
							um.resolve('http://www.google.com/a/b','',['e','/f']).should.eql(['http://www.google.com/a/e','http://www.google.com/f']);
						});
					});
				});
			});
			describe('locn string, base array, href string',function() {
				describe('invalid locn',function() {
					describe('valid base, invalid base',function() {
						it('should return array of nulls',function() {
							um.resolve('abc',['http://www.google.com/abc','abc'],'/a').should.eql([null,null]);
						});
					});
				});
				describe('null locn',function() {
					describe('valid base, invalid base',function() {
						it('should return array of nulls',function() {
							um.resolve(null,['http://www.google.com/abc','abc'],'/a').should.eql([null,null]);
						});
					});
				});
				describe('valid locn',function() {
					describe('absolute base, relative base',function() {
						describe('relative ref',function() {
							it('should return appropriate URLs',function() {
								um.resolve('http://www.google.com/a/b',['/c/d','q/r'],'e').should.eql(['http://www.google.com/c/e','http://www.google.com/a/q/e']);
							});
						});
						describe('absolute ref',function() {
							it('should return appropriate URLs',function() {
								um.resolve('http://www.google.com/a/b',['/c/d','q/r'],'/e').should.eql(['http://www.google.com/e','http://www.google.com/e']);
							});
						});
					});
					describe('null base, blank base',function() {
						describe('relative ref',function() {
							it('should return appropriate URLs',function() {
								um.resolve('http://www.google.com/a/b',[null,''],'e').should.eql(['http://www.google.com/a/e','http://www.google.com/a/e']);
							});
						});
						describe('absolute ref',function() {
							it('should return appropriate URLs',function() {
								um.resolve('http://www.google.com/a/b',[null,''],'/e').should.eql(['http://www.google.com/e','http://www.google.com/e']);
							});
						});
					});
				});
			});
			describe('locn array, base string, href string',function() {
				
			});
			describe('locn string, base array, href array',function() {
				describe('invalid locn',function() {
					it('should return an array of nulls',function() {
						um.resolve('abc',['def','abc'],['/a','foo']).should.eql([[null,null],[null,null]]);
					});
				});
				describe('null locn',function() {
					it('should return an array of nulls',function() {
						um.resolve(null,['def','abc'],['/a','foo']).should.eql([[null,null],[null,null]]);
					});
				});
				describe('blank locn',function() {
					it('should return an array of nulls',function() {
						um.resolve('',['def','abc'],['/a','foo']).should.eql([[null,null],[null,null]]);
					});
				});
				describe('valid locn',function() {
					describe('relative, absolute bases with relative, absolute refs',function() {
						it('should resolve appropriately',function() {
							um.resolve('http://www.google.com/a/b/c',['d','/e'],['/q','r']).should.eql([['http://www.google.com/q','http://www.google.com/a/b/r'],['http://www.google.com/q','http://www.google.com/r']]);
						});
					});
					describe('null, empty bases with relative, absolute refs',function() {
						it('should return array of nulls',function() {
							um.resolve('http://www.google.com/a/b/c',[null,''],['/q','r']).should.eql([['http://www.google.com/q','http://www.google.com/a/b/r'],['http://www.google.com/q','http://www.google.com/a/b/r']]);
						});
					});
					describe('complete URL bases with absolute, relative refs',function() {
						it('should return ref',function() {
							um.resolve('http://www.google.com/a/b/c',['http://www.yahoo.com/foo/bar','http://www.msn.com/ace/fly'],['/q','r']).should.eql([['http://www.yahoo.com/q','http://www.yahoo.com/foo/r'],['http://www.msn.com/q','http://www.msn.com/ace/r']]);
						});
					});
				});
			});
			describe('locn array, base string, href array',function() {
				
			});
			describe('locn array, base array, href string',function() {
				
			});
			describe('locn array, base array, href array',function() {
				
			});
		});
	});
	describe('empty path',function() {
		describe('remove slash',function() {
			describe('with no slash',function() {
				describe('no hash, no query',function() {
					it('should leave as is',function() {
						um.clearPathEmpty("http://www.google.com").should.equal("http://www.google.com");
					});
				});
				describe('hash, no query',function() {
					it('should leave as is',function() {
						um.clearPathEmpty("http://www.google.com#123").should.equal("http://www.google.com#123");
					});
				});
				describe('query, no hash',function() {
					it('should leave as is',function() {
						um.clearPathEmpty("http://www.google.com?a=b").should.equal("http://www.google.com?a=b");
					});
				});
				describe('query and hash',function() {
					it('should leave as is',function() {
						um.clearPathEmpty("http://www.google.com?a=b#123").should.equal("http://www.google.com?a=b#123");
					});
				});
			});
			describe('with basic path',function() {
				describe('no hash, no query',function() {
					it('should remove slash',function() {
						um.clearPathEmpty("http://www.google.com/").should.equal("http://www.google.com");
					});
				});
				describe('hash, no query',function() {
					it('should remove slash',function() {
						um.clearPathEmpty("http://www.google.com/#123").should.equal("http://www.google.com#123");
					});
				});
				describe('query, no hash',function() {
					it('should remove slash',function() {
						um.clearPathEmpty("http://www.google.com/?a=b").should.equal("http://www.google.com?a=b");
					});
				});
				describe('query and hash',function() {
					it('should remove slash',function() {
						um.clearPathEmpty("http://www.google.com/?a=b#123").should.equal("http://www.google.com?a=b#123");
					});
				});
			});
			describe('with full path',function() {
				describe('no hash, no query',function() {
					it('should leave as is',function() {
						um.clearPathEmpty("http://www.google.com/a/b").should.equal("http://www.google.com/a/b");
					});
				});
				describe('hash, no query',function() {
					it('should leave as is',function() {
						um.clearPathEmpty("http://www.google.com/a/b#123").should.equal("http://www.google.com/a/b#123");
					});
				});
				describe('query, no hash',function() {
					it('should leave as is',function() {
						um.clearPathEmpty("http://www.google.com/a/b?a=b").should.equal("http://www.google.com/a/b?a=b");
					});
				});
				describe('query and hash',function() {
					it('should leave as is',function() {
						um.clearPathEmpty("http://www.google.com/a/b?a=b#123").should.equal("http://www.google.com/a/b?a=b#123");
					});
				});
			});
		});
		describe('add slash',function() {
			describe('with no slash',function() {
				describe('no hash, no query',function() {
					it('should add slash',function() {
						um.addPathEmpty("http://www.google.com").should.equal("http://www.google.com/");
					});
				});
				describe('hash, no query',function() {
					it('should add slash',function() {
						um.addPathEmpty("http://www.google.com#123").should.equal("http://www.google.com/#123");
					});
				});
				describe('query, no hash',function() {
					it('should add slasg',function() {
						um.addPathEmpty("http://www.google.com?a=b").should.equal("http://www.google.com/?a=b");
					});
				});
				describe('query and hash',function() {
					it('should add slash',function() {
						um.addPathEmpty("http://www.google.com?a=b#123").should.equal("http://www.google.com/?a=b#123");
					});
				});
			});
			describe('with basic path',function() {
				describe('no hash, no query',function() {
					it('should leave as is',function() {
						um.addPathEmpty("http://www.google.com/").should.equal("http://www.google.com/");
					});
				});
				describe('hash, no query',function() {
					it('should leave as is',function() {
						um.addPathEmpty("http://www.google.com/#123").should.equal("http://www.google.com/#123");
					});
				});
				describe('query, no hash',function() {
					it('should leave as is',function() {
						um.addPathEmpty("http://www.google.com/?a=b").should.equal("http://www.google.com/?a=b");
					});
				});
				describe('query and hash',function() {
					it('should leave as is',function() {
						um.addPathEmpty("http://www.google.com/?a=b#123").should.equal("http://www.google.com/?a=b#123");
					});
				});
			});
			describe('with full path',function() {
				describe('no hash, no query',function() {
					it('should leave as is',function() {
						um.addPathEmpty("http://www.google.com/a/b").should.equal("http://www.google.com/a/b");
					});
				});
				describe('hash, no query',function() {
					it('should leave as is',function() {
						um.addPathEmpty("http://www.google.com/a/b#123").should.equal("http://www.google.com/a/b#123");
					});
				});
				describe('query, no hash',function() {
					it('should leave as is',function() {
						um.addPathEmpty("http://www.google.com/a/b?a=b").should.equal("http://www.google.com/a/b?a=b");
					});
				});
				describe('query and hash',function() {
					it('should leave as is',function() {
						um.addPathEmpty("http://www.google.com/a/b?a=b#123").should.equal("http://www.google.com/a/b?a=b#123");
					});
				});
			});
		});
	});
	describe('file:/// windows drive letter',function() {
		describe('base no drive',function() {
			describe('ref no drive',function() {
				it('should use the ref path',function() {
					um.resolve('file:///foo/bar','/a').should.equal('file:///a');
				});
			});
			describe('ref has drive',function() {
				it('should use the ref drive and path',function() {
					um.resolve('file:///foo/bar','/C:/a').should.equal('file:///C:/a');
				});
			});
		});
		describe('base has drive',function() {
			describe('ref no drive',function() {
				it('should use the base drive and ref path',function() {
					um.resolve('file:///C:/foo/bar','/a').should.equal('file:///C:/a');
				});
			});
			describe('ref has drive',function() {
				it('should use the ref drive and path',function() {
					um.resolve('file:///C:/foo/bar','/C:/a').should.equal('file:///C:/a');
				});
			});
		});
	});
});