(function () {
	if (!options.maximum_entries)
		options.maximum_entries = 5;

	data.requestNumb = "";
	data.incidentNumb = "";
	data.requests = [];
	data.incidents = [];

	var tables = ["incident", "sc_request"];

	tables.forEach(numberOfRecords);
	tables.forEach(detailsFromRecords);

	function numberOfRecords(item) {
		var gr = new GlideAggregate(item);
		gr.addAggregate('COUNT');
		if (item == 'sc_request') {
			gr.addEncodedQuery('requested_for=javascript:gs.getUserID()');
		} else {
			gr.addEncodedQuery('caller_id=javascript:gs.getUserID()');
		}
		gr.addQuery('active', 'true');
		gr.query();
		while (gr.next()) {
			switch (item) {
				case 'incident':
					data.incidentNumb = gr.getAggregate('COUNT');
					break;
				case 'sc_request':
					data.requestNumb = gr.getAggregate('COUNT');
					break;
			}

		}
	}

	function detailsFromRecords(item) {
		var gr = new GlideRecord(item);
		if (item == 'sc_request') {
			gr.addEncodedQuery('requested_for=javascript:gs.getUserID()');
		} else {
			gr.addEncodedQuery('caller_id=javascript:gs.getUserID()');
		}
		gr.addQuery('active', 'true');
		gr.query();
		var incIdx = 0;
		var reqIdx = 0;
		while (gr.next()) {
			var inc = {};
			var req = {};
			switch (item) {
				case 'incident':
					if (incIdx == options.maximum_entries)
						break;
					inc.number = gr.getDisplayValue("number");
					inc.short_description = gr.getDisplayValue("short_description");
					inc.state = gr.getDisplayValue("state");
					inc.sys_id = gr.getUniqueValue();
					data.incidents.push(inc);
					incIdx++;
					break;
				case 'sc_request':
					if (reqIdx == options.maximum_entries)
						break;
					req.number = gr.getDisplayValue("number");
					req.short_description = gr.getDisplayValue("short_description");
					req.state = gr.getDisplayValue("state");
					req.sys_id = gr.getUniqueValue();
					data.requests.push(req);
					reqIdx++;
					break;
			}
		}
	}

})();