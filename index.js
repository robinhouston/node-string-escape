"use strict";

/*
create table test (name varchar, data varchar);
insert into test (name, data) values ('one', 'data 1'), ('two', 'data 2');
*/

const pg_promise = require("pg-promise")({ pgNative: true }),
      conn = pg_promise("/tmp robin");

function sqlQuoteString(s) {
	if (s == null) return "NULL";
	return "'" + s.replace(/'/g, "''") + "'";
}

function sqlQuoteList(a) {
	return "(" + a.map(sqlQuoteString).join(", ") + ")";
}

conn.any(
    "select * from test where name in ${names^}",
    { names: sqlQuoteList(process.argv.slice(2)) }
)
.then(results => {
    for (const result of results) console.log(result);
})
.then(() => pg_promise.end());
