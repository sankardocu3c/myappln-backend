const { Connection, Request } = require("tedious");

async function recordretrv(callback1) {
	const config = {
		authentication: {
			options: {
				userName: "sankarserver",
				password: "s@nkar1234",
			},
			type: "default",
		},
		server: "sankar.database.windows.net",
		options: {
			database: "sankar-db",
			encrypt: true,
		},
	};
	//connection to Azure Sql
	const conn = new Connection(config);
	conn.connect();

	const objArr = [];

	conn.on("connect", async function (err) {
		if (err) {
			console.log("Error: ", err);
		} else {
			console.log("connected sucessfully!!!");
			readData((objArr1) => {
				console.log("in cb ref " + objArr1.length);
				callback1(objArr1);
			});
		}
	});

	async function readData(callback) {
		var query = "SELECT * FROM PURCHASE_DATA;";
		var req = new Request(query, (err, cnt, rows) => {
			if (err) {
				throw err;
			}
		});
		req.on("row", function (columns) {
			const data = new Object();
			data.orderid = columns[0].value;
			data.proddetail = columns[1].value;
			data.sku = columns[2].value;
			data.cost = columns[3].value;
			data.city = columns[4].value;
			data.amt = columns[5].value;
			data.quantity = columns[6].value;
			data.custid = columns[7].value;
			objArr.push(data);
		});
		conn.execSql(req);
		req.on("doneInProc", function (rowCount, more, rows) {
			callback(objArr);
		});
	}
}

module.exports = recordretrv;
